import type { ChatMenuAction } from '../constants'
import type { FormData, FormProps } from '../components/ui/form/types'
import type { BlockOwnProps } from './block'
import type { ChatUser } from './chat'
import type { User } from './user'

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

export interface ChatMessageItem {
  text: string
  time: string
  isOwn?: boolean
}

export interface ChatDayGroup {
  date: string
  messages: ChatMessageItem[]
}

export interface ChatsModalsState {
  createChat: {
    isOpen: boolean
    error?: string
  }
  addUser: {
    isOpen: boolean
    error?: string
    searchResults: User[]
  }
  removeUser: {
    isOpen: boolean
    error?: string
    users: ChatUser[]
  }
}

export interface ChatsPageProps extends BlockOwnProps {
  sidebar: ChatSidebarProps
  activeChatId: number | null
  activeChatName: string
  menuItems: Array<{ id: ChatMenuAction; label: string; disabled?: boolean }>
  modals: ChatsModalsState
  messagesByDay: ChatDayGroup[]
  messageForm: Pick<FormProps, 'name' | 'formClass' | 'fields' | 'leadingActions' | 'actions'>
  onSubmit?: (data: FormData) => void
  onChatSelect?: (chatId: number) => void
  onMenuAction?: (action: ChatMenuAction) => void
  onCloseModal?: (modal: keyof ChatsModalsState) => void
  onCreateChat?: (data: { title: string }) => void | Promise<void>
  onSearchUser?: (login: string) => void | Promise<void>
  onAddUser?: (userId: number) => void | Promise<void>
  onRemoveUser?: (userId: number) => void | Promise<void>
}
