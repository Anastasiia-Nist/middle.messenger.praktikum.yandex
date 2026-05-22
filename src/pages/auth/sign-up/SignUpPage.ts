import Block from '../../../block/block'
import type { FormProps } from '../../../components/ui/form/Form'
import type { BlockOwnProps } from '../../../types/block'
import template from './template.hbs?raw'

export interface SignUpPageProps extends BlockOwnProps {
  title?: string
  form: FormProps
  redirectLink: {
    href: string
    text: string
  }
}

export default class SignUpPage extends Block<SignUpPageProps> {
  protected template = template
}
