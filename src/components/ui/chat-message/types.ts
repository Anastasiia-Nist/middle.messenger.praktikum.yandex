import type { BlockOwnProps } from '../../../types/block'

export interface ChatMessageProps extends BlockOwnProps {
  text: string
  time: string
  isOwn?: boolean
}
