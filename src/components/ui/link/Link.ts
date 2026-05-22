import Block from '../../../block/block'
import type { BlockOwnProps } from '../../../types/block'
import template from './link.hbs?raw'

export interface LinkProps extends BlockOwnProps {
  href: string
  text?: string
  linkClass?: string
  ariaLabel?: string
  variant?: 'back'
}

export default class Link extends Block<LinkProps> {
  static componentName = 'Link'

  protected template = template
}
