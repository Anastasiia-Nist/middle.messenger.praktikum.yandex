import type { BlockOwnProps } from '../../../types/block'

export interface InputProps extends BlockOwnProps {
  id: string
  name: string
  label: string
  type?: string
  fieldType?: string
  rows?: number
  value?: string
  disabled?: boolean
  inputClass?: string
}
