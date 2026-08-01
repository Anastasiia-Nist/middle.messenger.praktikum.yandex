import { chatAPI } from '../api'
import { buildChatWsUrl, REQUEST_TIMEOUT_MS, WS_MESSAGES_PAGE_SIZE } from '../constants/api'
import WebSocketTransport from '../system/api/WebSocketTransport'
import type { ChatDayGroup } from '../types/chats-page'
import type { WsMessage, WsOldMessage } from '../types/message'
import { groupMessagesByDay } from '../helpers/chat/groupMessagesByDay'
import { sanitizeInput } from '../utils/sanitizeInput'
import { withApiError } from '../utils/withApiError'

function sanitizeWsMessage(message: WsMessage): WsMessage {
  return {
    ...message,
    content: sanitizeInput(message.content),
  }
}

type MessageServiceCallbacks = {
  currentUserId: number | null
  onMessagesUpdate: (messagesByDay: ChatDayGroup[]) => void
  onHistoryLoaded?: () => void
}

type PendingGetOld = {
  resolve: (messages: WsOldMessage[]) => void
  reject: (reason?: unknown) => void
  timer: ReturnType<typeof setTimeout>
}

class MessageService {
  private transport = new WebSocketTransport()

  private chatId: number | null = null

  private connectingChatId: number | null = null

  private abortController: AbortController | null = null

  private messages: WsMessage[] = []

  private callbacks: MessageServiceCallbacks | null = null

  private pendingGetOld: PendingGetOld | null = null

  async connect(chatId: number, callbacks: MessageServiceCallbacks): Promise<void> {
    if (callbacks.currentUserId === null) {
      this.logError('Для подключения WebSocket требуется id пользователя')

      return
    }

    if (this.chatId === chatId && (this.transport.isOpen() || this.transport.isConnecting())) {
      this.callbacks = callbacks
      this.notifyMessagesUpdate()

      return
    }

    if (this.connectingChatId === chatId) {
      this.callbacks = callbacks

      return
    }

    this.disconnect(false)
    this.abortController = new AbortController()
    const { signal } = this.abortController
    this.chatId = chatId
    this.connectingChatId = chatId
    this.callbacks = callbacks
    this.messages = []

    try {
      const token = await withApiError(() => chatAPI.getChatToken(chatId))

      if (signal.aborted || this.chatId !== chatId) {
        return
      }

      this.transport.on('open', this.handleOpen)
      this.transport.on('message', this.handleSocketMessage)
      this.transport.on('close', this.handleClose)
      this.transport.on('error', this.handleError)

      this.transport.connect(buildChatWsUrl(callbacks.currentUserId, chatId, token))
    } catch (error) {
      if (!signal.aborted) {
        this.connectingChatId = null
        this.logError(error)
      }
    }
  }

  disconnect(resetState = true): void {
    this.abortController?.abort()
    this.abortController = null
    this.transport.off('open', this.handleOpen)
    this.transport.off('message', this.handleSocketMessage)
    this.transport.off('close', this.handleClose)
    this.transport.off('error', this.handleError)
    this.transport.close()
    this.failPendingGetOld(new Error('WebSocket отключён'))
    this.connectingChatId = null

    if (!resetState) {
      return
    }

    this.chatId = null
    this.callbacks = null
    this.messages = []
  }

  sendText(text: string): void {
    try {
      this.transport.send({
        type: 'message',
        content: text,
      })
    } catch (error) {
      this.logError(error)
    }
  }

  getMessages(): WsMessage[] {
    return [...this.messages]
  }

  private handleOpen = (): void => {
    this.connectingChatId = null
    void this.loadHistory()
  }

  private handleClose = (): void => {
    this.handleTransportFailure('WebSocket закрыт')
  }

  private handleError = (): void => {
    this.handleTransportFailure('Ошибка подключения WebSocket')
  }

  private handleTransportFailure(reason: string): void {
    this.connectingChatId = null
    const hadPending = this.pendingGetOld !== null
    this.failPendingGetOld(new Error(reason))

    if (!hadPending) {
      this.logError(reason)
    }
  }

  private handleSocketMessage = (event?: Event | MessageEvent): void => {
    if (!(event instanceof MessageEvent) || typeof event.data !== 'string') {
      return
    }

    let payload: unknown

    try {
      payload = JSON.parse(event.data)
    } catch {
      return
    }

    if (Array.isArray(payload)) {
      this.settlePendingGetOld(payload as WsOldMessage[])

      return
    }

    if (!payload || typeof payload !== 'object') {
      return
    }

    const data = payload as Record<string, unknown>

    if (data.type === 'pong' || data.type === 'user connected') {
      return
    }

    if (data.type === 'message' && (typeof data.id === 'string' || typeof data.id === 'number')) {
      this.appendMessage({
        ...(data as WsMessage),
        id: String(data.id),
      })
    }
  }

  private async loadHistory(): Promise<void> {
    if (this.chatId === null || !this.abortController) {
      return
    }

    const { signal } = this.abortController
    const chatId = this.chatId

    try {
      const unreadCount = await withApiError(() => chatAPI.getNewMessagesCount(chatId))

      if (signal.aborted) {
        return
      }

      const collected: WsMessage[] = []
      let offset = '0'
      let loadedCount = 0

      while (true) {
        if (signal.aborted) {
          return
        }

        const batch = await this.requestGetOld(offset)

        if (signal.aborted) {
          return
        }

        if (!batch.length) {
          break
        }

        collected.push(...batch)
        loadedCount += batch.length

        const exhaustedUnread = unreadCount > 0 && loadedCount >= unreadCount
        const lastPage = batch.length < WS_MESSAGES_PAGE_SIZE

        if (exhaustedUnread || lastPage) {
          break
        }

        const nextOffset = batch[batch.length - 1]?.id

        if (!nextOffset || nextOffset === offset) {
          break
        }

        offset = nextOffset
      }

      if (signal.aborted) {
        return
      }

      this.messages = this.mergeMessages(collected)
      this.notifyMessagesUpdate()
      this.callbacks?.onHistoryLoaded?.()
    } catch (error) {
      if (!signal.aborted) {
        this.logError(error)
      }
    }
  }

  private requestGetOld(content: string): Promise<WsOldMessage[]> {
    if (!this.transport.isOpen()) {
      return Promise.reject(new Error('WebSocket не открыт'))
    }

    return new Promise((resolve, reject) => {
      this.failPendingGetOld(new Error('Предыдущий запрос get old отменён'))

      const timer = setTimeout(() => {
        this.failPendingGetOld(new Error('Таймаут запроса get old'))
      }, REQUEST_TIMEOUT_MS)

      this.pendingGetOld = { resolve, reject, timer }

      try {
        this.transport.send({
          type: 'get old',
          content,
        })
      } catch (error) {
        this.failPendingGetOld(error instanceof Error ? error : new Error(String(error)))
      }
    })
  }

  private settlePendingGetOld(messages: WsOldMessage[]): void {
    const pending = this.pendingGetOld

    if (!pending) {
      return
    }

    clearTimeout(pending.timer)
    this.pendingGetOld = null
    pending.resolve(messages)
  }

  private failPendingGetOld(error: Error): void {
    const pending = this.pendingGetOld

    if (!pending) {
      return
    }

    clearTimeout(pending.timer)
    this.pendingGetOld = null
    pending.reject(error)
  }

  private logError(error: unknown): void {
    console.error(error)
  }

  private appendMessage(message: WsMessage): void {
    this.messages = this.mergeMessages([...this.messages, message])
    this.notifyMessagesUpdate()
  }

  private mergeMessages(messages: WsMessage[]): WsMessage[] {
    const uniqueMessages = new Map<string, WsMessage>()

    messages.forEach((message) => {
      uniqueMessages.set(message.id, sanitizeWsMessage(message))
    })

    return Array.from(uniqueMessages.values()).sort(
      (left, right) => new Date(left.time).getTime() - new Date(right.time).getTime(),
    )
  }

  private notifyMessagesUpdate(): void {
    if (!this.callbacks) {
      return
    }

    this.callbacks.onMessagesUpdate(
      groupMessagesByDay(this.messages, this.callbacks.currentUserId),
    )
  }
}

export const messageService = new MessageService()

export default MessageService
