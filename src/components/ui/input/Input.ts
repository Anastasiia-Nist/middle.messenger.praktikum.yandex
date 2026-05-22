import Block from '../../../block/block'
import type { BlockOwnProps } from '../../../types/block'
import template from './input.hbs?raw'

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

export default class Input extends Block<InputProps> {
  static componentName = 'Input'

  protected template = template
}
