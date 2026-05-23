import Block from '../../../system/Block'
import template from './avatar.hbs?raw'
import type { AvatarProps } from './types'

export default class Avatar extends Block<AvatarProps> {
  static componentName = 'Avatar'

  protected template = template
}
