import Block from '../../../system/Block'
import template from './input.hbs?raw'
import type { InputProps } from './types'

export default class Input extends Block<InputProps> {
  static componentName = 'Input'

  protected template = template

  protected events = {
    input: (event: Event) => {
      console.log('event input value', (event.target as HTMLInputElement).value)
    },
  }
}
