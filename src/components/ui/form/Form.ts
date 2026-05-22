import Block from '../../../block/block'
import type { BlockOwnProps } from '../../../types/block'
import FormService from '../../../services/FormService'
import template from './form.hbs?raw'

const formService = new FormService()

export type FormSubmitData = Record<string, string | boolean>

export interface FormFieldConfig {
  id: string
  name: string
  label: string
  type?: string
  fieldType?: string
  rows?: number
  value?: string
  inputClass?: string
}

export interface FormActionConfig {
  type?: string
  text?: string
  buttonClass?: string
}

export interface FormProps extends BlockOwnProps {
  name: string
  formClass?: string
  actionsClass?: string
  fields: FormFieldConfig[]
  actions?: FormActionConfig[]
  disabled?: boolean
  onSubmit?: (data: FormSubmitData) => void
}

export default class Form extends Block<FormProps> {
  static componentName = 'Form'

  protected template = template

  private submitHandler: ((event: Event) => void) | null = null

  protected componentDidMount(): void {
    const form = this.refs.form

    if (!(form instanceof HTMLFormElement) || !this.props.onSubmit) {
      return
    }

    this.submitHandler = (event: Event) => {
      event.preventDefault()
      this.props.onSubmit?.(formService.collect(form))
    }

    form.addEventListener('submit', this.submitHandler)
  }

  protected componentWillUnmount(): void {
    const form = this.refs.form

    if (form instanceof HTMLFormElement && this.submitHandler) {
      form.removeEventListener('submit', this.submitHandler)
    }

    this.submitHandler = null
  }
}
