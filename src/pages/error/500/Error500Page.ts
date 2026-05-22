import Block from '../../../block/block'
import type { BlockOwnProps } from '../../../types/block'
import template from './template.hbs?raw'

export interface Error500PageProps extends BlockOwnProps {
  title: string
  description: string
  link: {
    href: string
    text: string
  }
}

export default class Error500Page extends Block<Error500PageProps> {
  protected template = template
}
