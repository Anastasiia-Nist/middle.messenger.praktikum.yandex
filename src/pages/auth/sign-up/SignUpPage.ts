import Block from '../../../system/Block'
import template from './template.hbs?raw'
import type { SignUpPageProps } from './types'

export default class SignUpPage extends Block<SignUpPageProps> {
  protected template = template
}
