import type { BlockOwnProps } from '../../../types/block'

export type DropdownItem = {
  id: string
  label: string
  disabled?: boolean
}

export interface DropdownProps extends BlockOwnProps {
  items: DropdownItem[]
  isMenuOpen?: boolean
  triggerButtonClass?: string
  toggleAction?: string
  onItemClick?: (itemId: string) => void
}
