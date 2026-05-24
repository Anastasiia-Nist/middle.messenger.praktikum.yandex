import type { BlockOwnProps } from '../../../types/block'

export interface ButtonProps extends BlockOwnProps {
  type?: string
  text?: string
  buttonClass?: string
  action?: string
}
