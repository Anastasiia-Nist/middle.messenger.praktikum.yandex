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
