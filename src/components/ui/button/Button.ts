import { BUTTON_CLICK_EVENT } from '../../../constants'
import Block from '../../../system/Block'
import template from './button.hbs?raw'
import type { ButtonProps } from './types'

export default class Button extends Block<ButtonProps> {
  static componentName = 'Button'

  protected template = template

  protected events = {
    click: () => {
      this.element()?.dispatchEvent(
        new CustomEvent(BUTTON_CLICK_EVENT, {
          bubbles: true,
          detail: { action: this.props.action },
        })
      )
    },
  }
}
