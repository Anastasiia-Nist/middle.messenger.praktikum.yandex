import type { ChatSidebarProps } from '../../components/pages/chats/sidebar/types'
import type { FormProps, FormSubmitData } from '../../components/ui/form/types'
import type { BlockOwnProps } from '../../types/block'

export interface ChatMessageItem {
  text: string
  time: string
  isOwn?: boolean
}

export interface ChatDayGroup {
  date: string
  messages: ChatMessageItem[]
}

export interface ChatsPageProps extends BlockOwnProps {
  sidebar: ChatSidebarProps
  activeChatName: string
  messagesByDay: ChatDayGroup[]
  messageForm: Pick<FormProps, 'name' | 'formClass' | 'fields' | 'leadingActions' | 'actions'>
  onSubmit?: (data: FormSubmitData) => void
}
