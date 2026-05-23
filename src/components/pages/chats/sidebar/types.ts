import type { BlockOwnProps } from '../../../../types/block'

export interface ChatSidebarItem {
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
}
