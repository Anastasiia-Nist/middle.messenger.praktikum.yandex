import { chatAPI } from '../api'
import type { ChatSidebarItem } from '../components/pages/chats/sidebar/types'
import { defaultModalsState } from '../pages/chats/modalData'
import { buildMenuItems } from '../pages/chats/menuItems'
import type { ChatsPageProps } from '../pages/chats/types'
import { chatsPageData } from '../pages/chats/data'
import type { Chat, ChatUser } from '../types/chat'
import { parseApiError } from '../utils/api'

function formatChatTime(time: string): string {
  const date = new Date(time)

  if (Number.isNaN(date.getTime())) {
    return time
  }

  const now = new Date()
  const isToday = date.toDateString() === now.toDateString()

  if (isToday) {
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
  }

  const yesterday = new Date(now)

  yesterday.setDate(now.getDate() - 1)

  if (date.toDateString() === yesterday.toDateString()) {
    return 'Вчера'
  }

  return date.toLocaleDateString('ru-RU', { weekday: 'short' })
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

export default class ChatService {
  getChatsPageData(): ChatsPageProps {
    return {
      ...chatsPageData,
      activeChatId: null,
      menuItems: buildMenuItems(null),
      modals: defaultModalsState,
      sidebar: {
        ...chatsPageData.sidebar,
        chats: [...chatsPageData.sidebar.chats],
      },
      messagesByDay: [...chatsPageData.messagesByDay],
      messageForm: {
        ...chatsPageData.messageForm,
        fields: [...chatsPageData.messageForm.fields],
        leadingActions: [...chatsPageData.messageForm.leadingActions],
        actions: [...chatsPageData.messageForm.actions],
      },
    }
  }

  async fetchChats(activeChatId: number | null = null): Promise<ChatSidebarItem[]> {
    try {
      const chats = await chatAPI.getChats()

      return chats.map((chat) => mapChatToSidebarItem(chat, activeChatId))
    } catch (error) {
      throw new Error(parseApiError(error))
    }
  }

  async createChat(title: string): Promise<number> {
    try {
      const response = await chatAPI.createChat({ title })

      return response.id
    } catch (error) {
      throw new Error(parseApiError(error))
    }
  }

  async addUsers(chatId: number, userIds: number[]): Promise<void> {
    try {
      await chatAPI.addUsers({ chatId, users: userIds })
    } catch (error) {
      throw new Error(parseApiError(error))
    }
  }

  async removeUsers(chatId: number, userIds: number[]): Promise<void> {
    try {
      await chatAPI.removeUsers({ chatId, users: userIds })
    } catch (error) {
      throw new Error(parseApiError(error))
    }
  }

  async fetchChatUsers(chatId: number): Promise<ChatUser[]> {
    try {
      return await chatAPI.getChatUsers(chatId)
    } catch (error) {
      throw new Error(parseApiError(error))
    }
  }
}
