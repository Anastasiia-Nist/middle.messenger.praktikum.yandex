import Block from '../../../block/block'
import type { BlockOwnProps } from '../../../types/block'
import template from './icon.hbs?raw'

export interface IconProps extends BlockOwnProps {
  href?: string
  label?: string
  iconClass?: string
}

export default class Icon extends Block<IconProps> {
  static componentName = 'Icon'

  protected template = template
}
