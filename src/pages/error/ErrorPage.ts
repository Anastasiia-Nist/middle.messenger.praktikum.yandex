import Block from '../../system/Block'
import template from './template.hbs?raw'
import type { ErrorPageProps } from './types'

export default class ErrorPage extends Block<ErrorPageProps> {
  protected template = template
}
