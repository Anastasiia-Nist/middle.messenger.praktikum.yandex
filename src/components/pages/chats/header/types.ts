import type { DropdownItem } from '../../../ui/dropdown/types'
import type { BlockOwnProps } from '../../../../types/block'

export type ChatMenuAction = 'create-chat' | 'add-user' | 'remove-user'

export interface ChatContentHeaderProps extends BlockOwnProps {
  activeChatName: string
  activeChatId: number | null
  menuItems: DropdownItem[]
  onMenuAction?: (action: ChatMenuAction) => void
}
