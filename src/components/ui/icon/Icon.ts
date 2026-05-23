import Block from '../../../system/Block'
import template from './icon.hbs?raw'
import type { IconProps } from './types'

export default class Icon extends Block<IconProps> {
  static componentName = 'Icon'

  protected template = template
}
