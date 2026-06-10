import type { BlockOwnProps } from '../../../../types/block'

export interface ChatSidebarItem {
  id: number
  name: string
  time: string
  preview: string
  unreadCount?: number
  isActive?: boolean
}

export interface ChatSidebarProps extends BlockOwnProps {
  profileLink: string
  profileText: string
  searchPlaceholder: string
  chats: ChatSidebarItem[]
  onChatSelect?: (chatId: number) => void
}
