import type { BlockOwnProps } from '../../../types/block'

export interface LinkProps extends BlockOwnProps {
  href: string
  text?: string
  linkClass?: string
  ariaLabel?: string
  variant?: 'back'
}
