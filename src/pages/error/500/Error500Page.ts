import Block from '../../../system/Block'
import template from './template.hbs?raw'
import type { Error500PageProps } from './types'

export default class Error500Page extends Block<Error500PageProps> {
  protected template = template
}
