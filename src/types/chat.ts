export type ChatLastMessageUser = {
  first_name: string
  second_name: string
  avatar: string
  email: string
  login: string
  phone: string
}

export type ChatLastMessage = {
  user: ChatLastMessageUser
  time: string
  content: string
}

export type Chat = {
  id: number
  title: string
  avatar: string
  unread_count: number
  created_by: number
  last_message: ChatLastMessage | null
}

export type CreateChatRequest = {
  title: string
}

export type CreateChatResponse = {
  id: number
}

export type UsersRequest = {
  users: number[]
  chatId: number
}

export type GetChatsParams = {
  offset?: number
  limit?: number
  title?: string
}

export type ChatUser = {
  id: number
  first_name: string
  second_name: string
  display_name: string
  login: string
  avatar: string
  role: string
}
