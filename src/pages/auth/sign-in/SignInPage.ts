import Block from '../../../system/Block'
import template from './template.hbs?raw'
import type { SignInPageProps } from './types'

export default class SignInPage extends Block<SignInPageProps> {
  protected template = template
}
