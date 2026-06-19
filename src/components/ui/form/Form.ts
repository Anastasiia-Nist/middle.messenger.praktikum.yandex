import { validateFieldValue } from '../../../helpers/validation'
import FormService from '../../../services/FormService'
import Block from '../../../system/Block'
import { FIELD_BLUR_EVENT } from '../../../constants'
import { isCustomEventWithStringDetail } from '../../../utils/events'
import Input from '../input/Input'
import template from './form.hbs?raw'
import type { FormData, FormProps } from './types'

const formService = new FormService()

export default class Form<TData extends FormData = FormData> extends Block<FormProps<TData>> {
  static componentName = 'Form'

  protected template = template

  private getInputs(): Input[] {
    return this.children.filter((child): child is Input => child instanceof Input)
  }

  validateField(name: string): boolean {
    const inputChild = this.getInputs().find((child) => child.getFieldName() === name)

    if (!inputChild) {
      return true
    }

    const control = inputChild.getControl()

    if (!control || control.disabled) {
      return true
    }

    const error = validateFieldValue(name, control.value)
    inputChild.setError(error)

    return !error
  }

  validate(): boolean {
    return this.getInputs()
      .map((child) => this.validateField(child.getFieldName()))
      .every(Boolean)
  }

  protected events = {
    [FIELD_BLUR_EVENT]: (event: Event) => {
      if (!isCustomEventWithStringDetail(event, 'name')) {
        return
      }

      this.validateField(event.detail.name)
    },

    submit: (event: Event) => {
      const form = this.refs.form

      if (!(form instanceof HTMLFormElement) || !this.props.onSubmit) {
        return
      }

      event.preventDefault()

      if (!this.validate()) {
        return
      }

      this.props.onSubmit(formService.collect<TData>(form))
    },
  }
}
