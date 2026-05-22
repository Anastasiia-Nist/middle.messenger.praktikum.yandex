import Block from '../../../block/block'
import type { BlockOwnProps } from '../../../types/block'
import template from './template.hbs?raw'

export interface Error404PageProps extends BlockOwnProps {
  title: string
  description: string
  link: {
    href: string
    text: string
  }
}

export default class Error404Page extends Block<Error404PageProps> {
  protected template = template
}
