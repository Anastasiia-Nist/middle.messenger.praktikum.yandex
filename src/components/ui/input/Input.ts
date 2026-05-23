import Block from '../../../system/Block'
import { FIELD_BLUR_EVENT } from '../events'
import template from './input.hbs?raw'
import type { InputProps } from './types'

export default class Input extends Block<InputProps> {
  static componentName = 'Input'

  protected template = template

  protected eventsCapture = ['blur']

  getFieldName(): string {
    return this.props.name
  }

  getControl(): HTMLInputElement | HTMLTextAreaElement | null {
    const control = this.refs[this.props.name]

    if (control instanceof HTMLInputElement || control instanceof HTMLTextAreaElement) {
      return control
    }

    return null
  }

  setError(error: string | null): void {
    const errorElement = this.refs.error

    if (errorElement) {
      errorElement.textContent = error ?? ''
    }

    this.element()?.classList.toggle('form-field_invalid', Boolean(error))
  }

  protected events = {
    blur: () => {
      if (this.props.validateOnBlur === false) {
        return
      }

      this.element()?.dispatchEvent(
        new CustomEvent(FIELD_BLUR_EVENT, {
          bubbles: true,
          detail: { name: this.props.name },
        }),
      )
    },
  }
}
