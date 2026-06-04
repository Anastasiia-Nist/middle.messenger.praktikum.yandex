import Block from '../../../system/Block'
import template from './title.hbs?raw'
import type { TitleProps } from './types'

export default class Title extends Block<TitleProps> {
  static componentName = 'Title'

  protected template = template
}
