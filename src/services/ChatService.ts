import { chatAPI } from '../api'
import { LOCALE, YESTERDAY_LABEL } from '../constants'
import type { ChatSidebarItem } from '../types/chats-page'
import type { Chat, ChatUser } from '../types/chat'
import { withApiError } from '../utils/withApiError'

function formatChatTime(time: string): string {
  const date = new Date(time)

  if (Number.isNaN(date.getTime())) {
    return time
  }

  const now = new Date()
  const isToday = date.toDateString() === now.toDateString()

  if (isToday) {
    return date.toLocaleTimeString(LOCALE, { hour: '2-digit', minute: '2-digit' })
  }

  const yesterday = new Date(now)

  yesterday.setDate(now.getDate() - 1)

  if (date.toDateString() === yesterday.toDateString()) {
    return YESTERDAY_LABEL
  }

  return date.toLocaleDateString(LOCALE, { weekday: 'short' })
}

function mapChatToSidebarItem(chat: Chat, activeChatId: number | null): ChatSidebarItem {
  return {
    id: chat.id,
    name: chat.title,
    time: chat.last_message ? formatChatTime(chat.last_message.time) : '',
    preview: chat.last_message?.content ?? '',
    unreadCount: chat.unread_count || undefined,
    isActive: chat.id === activeChatId,
  }
}

class ChatService {
  async fetchChats(activeChatId: number | null = null): Promise<ChatSidebarItem[]> {
    const chats = await withApiError(() => chatAPI.getChats())

    return chats.map((chat) => mapChatToSidebarItem(chat, activeChatId))
  }

  async createChat(title: string): Promise<number> {
    const response = await withApiError(() => chatAPI.createChat({ title }))

    return response.id
  }

  async addUsers(chatId: number, userIds: number[]): Promise<void> {
    await withApiError(() => chatAPI.addUsers({ chatId, users: userIds }))
  }

  async removeUsers(chatId: number, userIds: number[]): Promise<void> {
    await withApiError(() => chatAPI.removeUsers({ chatId, users: userIds }))
  }

  async fetchChatUsers(chatId: number): Promise<ChatUser[]> {
    return withApiError(() => chatAPI.getChatUsers(chatId))
  }
}

export const chatService = new ChatService()

export default ChatService
