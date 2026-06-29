import { chatAPI } from '../api'
import { mapChatToSidebarItem } from '../helpers/chat/mapChatToSidebarItem'
import type { ChatSidebarItem } from '../types/chats-page'
import type { ChatUser } from '../types/chat'
import { sanitizeInput } from '../utils/sanitizeInput'
import { withApiError } from '../utils/withApiError'

function sanitizeChatUser(user: ChatUser): ChatUser {
  return {
    ...user,
    first_name: sanitizeInput(user.first_name),
    second_name: sanitizeInput(user.second_name),
    display_name: sanitizeInput(user.display_name),
    login: sanitizeInput(user.login),
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
    const users = await withApiError(() => chatAPI.getChatUsers(chatId))

    return users.map(sanitizeChatUser)
  }

  async deleteChat(chatId: number): Promise<void> {
    await withApiError(() => chatAPI.deleteChat({ chatId }))
  }
}

export const chatService = new ChatService()

export default ChatService
