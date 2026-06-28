export type WsOutgoing =
  | { type: 'ping' }
  | { type: 'message'; content: string }
  | { type: 'get old'; content: string }

export type WsMessageType = 'message' | 'file' | 'sticker'

export type WsFileInfo = {
  id: number
  user_id: number
  path: string
  filename: string
  content_type: string
  content_size: number
  upload_date: string
}

export type WsMessage = {
  id: string
  time: string
  user_id: string
  content: string
  type: WsMessageType
  chat_id?: string
  file?: WsFileInfo
}

export type WsOldMessage = WsMessage

export type WsUserConnected = {
  type: 'user connected'
  content: string
}

export type WsPong = {
  type: 'pong'
}

export type WsIncoming =
  | WsMessage
  | WsUserConnected
  | WsPong
  | WsOldMessage[]
