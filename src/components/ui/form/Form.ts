import { validateField as getFieldValidationError } from '../../../helpers/validation'
import FormService from '../../../services/FormService'
import Block from '../../../system/Block'
import { FIELD_BLUR_EVENT } from '../events'
import Input from '../input/Input'
import template from './form.hbs?raw'
import type { FormProps } from './types'

const formService = new FormService()

export default class Form extends Block<FormProps> {
  static componentName = 'Form'

  isValid = true

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

    const error = getFieldValidationError(name, control.value)
    inputChild.setError(error)

    return !error
  }

  validate(): boolean {
    const results = this.getInputs().map((child) => this.validateField(child.getFieldName()))
    this.isValid = results.every(Boolean)

    return this.isValid
  }

  private updateIsValid(): void {
    this.isValid = this.getInputs().every((child) => {
      const control = child.getControl()

      if (!control || control.disabled) {
        return true
      }

      return getFieldValidationError(child.getFieldName(), control.value) === null
    })
  }

  protected events = {
    [FIELD_BLUR_EVENT]: (event: Event) => {
      const { name } = (event as CustomEvent<{ name: string }>).detail
      this.validateField(name)
      this.updateIsValid()
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

      this.props.onSubmit(formService.collect(form))
    },
  }
}
