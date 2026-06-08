import { chatAPI } from '../api'
import type { ChatSidebarItem } from '../components/pages/chats/sidebar/types'
import type { ChatsPageProps } from '../pages/chats/types'
import { chatsPageData } from '../pages/chats/data'
import type { Chat } from '../types/chat'
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

function mapChatToSidebarItem(chat: Chat, index: number): ChatSidebarItem {
  return {
    id: chat.id,
    name: chat.title,
    time: chat.last_message ? formatChatTime(chat.last_message.time) : '',
    preview: chat.last_message?.content ?? '',
    unreadCount: chat.unread_count || undefined,
    isActive: index === 0,
  }
}

export default class ChatService {
  getChatsPageData(): ChatsPageProps {
    return {
      ...chatsPageData,
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

  async fetchChats(): Promise<ChatSidebarItem[]> {
    try {
      const chats = await chatAPI.getChats()

      return chats.map(mapChatToSidebarItem)
    } catch (error) {
      throw new Error(parseApiError(error))
    }
  }
}
