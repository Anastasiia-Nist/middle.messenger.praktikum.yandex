import Block from '../../../system/Block'
import template from './button.hbs?raw'
import type { ButtonProps } from './types'

export default class Button extends Block<ButtonProps> {
  static componentName = 'Button'

  protected template = template

  protected events = {
    click: () => {
      console.log('event button click', this)
    },
  }
}
