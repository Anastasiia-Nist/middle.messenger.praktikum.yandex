import type { ChatMenuAction } from '../../components/pages/chats/header/types'
import type { ChatSidebarProps } from '../../components/pages/chats/sidebar/types'
import type { FormData, FormProps } from '../../components/ui/form/types'
import type { BlockOwnProps } from '../../types/block'
import type { ChatUser } from '../../types/chat'
import type { User } from '../../types/user'

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
  onCloseCreateChat?: () => void
  onCloseAddUser?: () => void
  onCloseRemoveUser?: () => void
  onSearch?: (login: string) => void
}
