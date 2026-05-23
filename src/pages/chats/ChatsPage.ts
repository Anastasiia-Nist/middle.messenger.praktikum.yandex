import Block from '../../system/Block'
import FormService from '../../services/FormService'
import template from './template.hbs?raw'
import type { ChatsPageProps } from './types'

const formService = new FormService()

export default class ChatsPage extends Block<ChatsPageProps> {
  protected template = template

  protected events = {
    submit: (event: Event) => {
      const form = this.refs.messageForm

      if (!(form instanceof HTMLFormElement) || event.target !== form || !this.props.onSubmit) {
        return
      }

      event.preventDefault()
      this.props.onSubmit(formService.collect(form))
    },
  }
}
