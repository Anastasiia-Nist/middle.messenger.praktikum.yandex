import Block from '../../../../block/block'
import type { BlockOwnProps } from '../../../../types/block'
import template from './chat-sidebar.hbs?raw'

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

export default class ChatSidebar extends Block<ChatSidebarProps> {
  static componentName = 'ChatSidebar'

  protected template = template
}
