import type { BlockOwnProps } from '../../../types/block'

export type FormSubmitData = Record<string, string | boolean>

export interface FormFieldConfig {
  id: string
  name: string
  label: string
  type?: string
  fieldType?: string
  rows?: number
  value?: string
  placeholder?: string
  inputClass?: string
  validateOnBlur?: boolean
  autocomplete?: string
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
  leadingActions?: FormActionConfig[]
  actions?: FormActionConfig[]
  disabled?: boolean
  onSubmit?: (data: FormSubmitData) => void
}
