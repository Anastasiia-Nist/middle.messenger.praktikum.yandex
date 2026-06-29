import { chatAPI } from '../api'
import { buildChatWsUrl, WS_MESSAGES_PAGE_SIZE } from '../constants/api'
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

class MessageService {
  private transport = new WebSocketTransport()

  private chatId: number | null = null

  private connectingChatId: number | null = null

  private messages: WsMessage[] = []

  private callbacks: MessageServiceCallbacks | null = null

  private getOldResolver: ((messages: WsOldMessage[]) => void) | null = null

  async connect(chatId: number, callbacks: MessageServiceCallbacks): Promise<void> {
    if (callbacks.currentUserId === null) {
      console.error('User id is required for WebSocket connection')

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
    this.chatId = chatId
    this.connectingChatId = chatId
    this.callbacks = callbacks
    this.messages = []

    try {
      const token = await withApiError(() => chatAPI.getChatToken(chatId))

      if (this.chatId !== chatId) {
        return
      }

      this.transport.on('open', this.handleOpen)
      this.transport.on('message', this.handleSocketMessage)
      this.transport.on('close', this.handleClose)
      this.transport.on('error', this.handleError)

      this.transport.connect(buildChatWsUrl(callbacks.currentUserId, chatId, token))
    } catch (error) {
      console.error(error)
      this.connectingChatId = null
    }
  }

  disconnect(resetState = true): void {
    this.transport.off('open', this.handleOpen)
    this.transport.off('message', this.handleSocketMessage)
    this.transport.off('close', this.handleClose)
    this.transport.off('error', this.handleError)
    this.transport.close()
    this.getOldResolver = null
    this.connectingChatId = null

    if (!resetState) {
      return
    }

    this.chatId = null
    this.callbacks = null
    this.messages = []
  }

  sendText(text: string): void {
    if (!this.transport.isOpen()) {
      console.error('Cannot send message: WebSocket is not open')

      return
    }

    this.transport.send({
      type: 'message',
      content: text,
    })
  }

  getMessages(): WsMessage[] {
    return [...this.messages]
  }

  private handleOpen = (): void => {
    this.connectingChatId = null
    void this.loadHistory()
  }

  private handleClose = (): void => {
    this.getOldResolver = null
  }

  private handleError = (): void => {
    this.connectingChatId = null
    console.error('WebSocket connection error')
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
      this.getOldResolver?.(payload as WsOldMessage[])
      this.getOldResolver = null

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
    if (this.chatId === null) {
      return
    }

    try {
      const unreadCount = await withApiError(() => chatAPI.getNewMessagesCount(this.chatId as number))
      const collected: WsMessage[] = []
      let offset = '0'
      let loadedCount = 0

      while (true) {
        const batch = await this.requestGetOld(offset)

        if (!batch.length) {
          break
        }

        collected.push(...batch)
        loadedCount += batch.length

        const hasMoreByUnread = unreadCount > 0 && loadedCount < unreadCount
        const hasMoreByPageSize = batch.length === WS_MESSAGES_PAGE_SIZE

        if (!hasMoreByUnread && !hasMoreByPageSize) {
          break
        }

        if (unreadCount > 0 && loadedCount >= unreadCount) {
          break
        }

        const lastMessage = batch[batch.length - 1]

        if (!lastMessage?.id) {
          break
        }

        offset = lastMessage.id
      }

      this.messages = this.mergeMessages(collected)
      this.notifyMessagesUpdate()
      this.callbacks?.onHistoryLoaded?.()
    } catch (error) {
      console.error(error)
    }
  }

  private requestGetOld(content: string): Promise<WsOldMessage[]> {
    return new Promise((resolve) => {
      this.getOldResolver = resolve
      this.transport.send({
        type: 'get old',
        content,
      })
    })
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
