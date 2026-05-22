import Block from '../../../block/block'
import type { BlockOwnProps } from '../../../types/block'
import template from './title.hbs?raw'

export interface TitleProps extends BlockOwnProps {
  text: string
  titleClass?: string
}

export default class Title extends Block<TitleProps> {
  static componentName = 'Title'

  protected template = template
}
