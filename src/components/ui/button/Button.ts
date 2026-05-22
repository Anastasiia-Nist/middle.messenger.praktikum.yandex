import Block from '../../../block/block'
import type { BlockOwnProps } from '../../../types/block'
import template from './button.hbs?raw'

export interface ButtonProps extends BlockOwnProps {
  type?: string
  text?: string
  buttonClass?: string
}

export default class Button extends Block<ButtonProps> {
  static componentName = 'Button'

  protected template = template
}
