import { API_BASE } from '../constants/api'
import { BaseApi } from '../system/api/BaseApi'
import HTTPTransport from '../system/api/HTTPTransport'
import type {
  Chat,
  ChatTokenResponse,
  ChatUser,
  CreateChatRequest,
  CreateChatResponse,
  DeleteChatRequest,
  GetChatsParams,
  UnreadCountResponse,
  UsersRequest,
} from '../types/chat'

const http = new HTTPTransport(`${API_BASE}/chats`)

export class ChatAPI extends BaseApi {
  getChats(params?: GetChatsParams): Promise<Chat[]> {
    return http.get('/', { data: params })
  }

  createChat(data: CreateChatRequest): Promise<CreateChatResponse> {
    return http.post('/', { data })
  }

  addUsers(data: UsersRequest): Promise<void> {
    return http.put('/users', { data })
  }

  removeUsers(data: UsersRequest): Promise<void> {
    return http.delete('/users', { data })
  }

  deleteChat(data: DeleteChatRequest): Promise<void> {
    return http.delete('/', { data })
  }

  getChatUsers(id: number): Promise<ChatUser[]> {
    return http.get(`/${id}/users`)
  }

  async getChatToken(chatId: number): Promise<string> {
    const response: unknown = await http.post(`/token/${chatId}`)

    if (Array.isArray(response)) {
      const tokenItem = response[0] as ChatTokenResponse | undefined

      if (tokenItem?.token) {
        return tokenItem.token
      }
    }

    if (response && typeof response === 'object' && 'token' in response) {
      return String((response as ChatTokenResponse).token)
    }

    throw new Error('Chat token not found')
  }

  async getNewMessagesCount(chatId: number): Promise<number> {
    const response: unknown = await http.get(`/new/${chatId}`)

    if (response && typeof response === 'object' && 'unread_count' in response) {
      return Number((response as UnreadCountResponse).unread_count)
    }

    if (typeof response === 'number') {
      return response
    }

    return 0
  }
}

export const chatAPI = new ChatAPI()
