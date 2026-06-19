import type { BlockOwnProps } from '../../../types/block'

export interface InputProps extends BlockOwnProps {
  id: string
  name: string
  label: string
  type?: string
  value?: string
  placeholder?: string
  disabled?: boolean
  inputClass?: string
  error?: string
  autocomplete?: string
}
