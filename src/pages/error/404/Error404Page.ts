import Block from '../../../system/Block'
import template from './template.hbs?raw'
import type { Error404PageProps } from './types'

export default class Error404Page extends Block<Error404PageProps> {
  protected template = template
}
