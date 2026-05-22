import Block from '../../../block/block'
import type { BlockOwnProps } from '../../../types/block'
import template from './avatar.hbs?raw'

export interface AvatarProps extends BlockOwnProps {
  type?: string
  avatarClass?: string
  overlayText?: string
}

export default class Avatar extends Block<AvatarProps> {
  static componentName = 'Avatar'

  protected template = template
}
