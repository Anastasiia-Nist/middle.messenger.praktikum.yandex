import type { BlockOwnProps } from '../../../types/block'

export type FormData = Record<string, string | boolean>

export interface FormFieldConfig {
  id: string
  name: string
  label: string
  type?: string
  value?: string
  placeholder?: string
  inputClass?: string
  autocomplete?: string
}

export interface FormActionConfig {
  type?: string
  text?: string
  buttonClass?: string
  action?: string
  disabled?: boolean
  title?: string
}

export interface FormProps<TData extends FormData = FormData> extends BlockOwnProps {
  name: string
  formClass?: string
  fields: FormFieldConfig[]
  leadingActions?: FormActionConfig[]
  actions?: FormActionConfig[]
  disabled?: boolean
  onSubmit?: (data: TData) => void
}
