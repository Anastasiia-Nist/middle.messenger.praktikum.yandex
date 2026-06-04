import type { BlockOwnProps } from '../../../types/block'

export interface AvatarProps extends BlockOwnProps {
  type?: string
  avatarClass?: string
  overlayText?: string
}
