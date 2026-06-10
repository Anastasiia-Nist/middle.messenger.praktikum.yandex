import { API_BASE } from '../constants/api'
import { BaseApi } from '../system/api/BaseApi'
import HTTPTransport from '../system/api/HTTPTransport'
import type {
  Chat,
  ChatUser,
  CreateChatRequest,
  CreateChatResponse,
  GetChatsParams,
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

  getChatUsers(id: number): Promise<ChatUser[]> {
    return http.get(`/${id}/users`)
  }
}

export const chatAPI = new ChatAPI()
