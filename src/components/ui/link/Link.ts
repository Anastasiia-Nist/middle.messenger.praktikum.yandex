import Block from '../../../system/Block'
import template from './link.hbs?raw'
import type { LinkProps } from './types'

export default class Link extends Block<LinkProps> {
  static componentName = 'Link'

  protected template = template

  protected events = {
    click: () => {
      console.log('event link click', this)
    },
  }
}
