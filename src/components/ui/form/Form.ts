import Block from '../../../system/Block'
import FormService from '../../../services/FormService'
import template from './form.hbs?raw'
import type { FormProps } from './types'

const formService = new FormService()

export default class Form extends Block<FormProps> {
  static componentName = 'Form'

  protected template = template

  protected events = {
    submit: (event: Event) => {
      const form = this.refs.form

      if (!(form instanceof HTMLFormElement) || !this.props.onSubmit) {
        return
      }

      event.preventDefault()
      this.props.onSubmit(formService.collect(form))
    },
  }
}
