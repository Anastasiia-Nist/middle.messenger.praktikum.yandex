import type { ChatMenuAction } from '../../../../constants'
import type { DropdownItem } from '../../../ui/dropdown/types'
import type { BlockOwnProps } from '../../../../types/block'

export type { ChatMenuAction }

export interface ChatContentHeaderProps extends BlockOwnProps {
  activeChatName: string
  activeChatId: number | null
  menuItems: DropdownItem[]
  onMenuAction?: (action: ChatMenuAction) => void
}
