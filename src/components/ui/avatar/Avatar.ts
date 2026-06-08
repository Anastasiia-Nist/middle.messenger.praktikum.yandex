import { BUTTON_CLICK_EVENT } from '../../../constants'
import Block from '../../../system/Block'
import template from './avatar.hbs?raw'
import type { AvatarProps } from './types'

export default class Avatar extends Block<AvatarProps> {
  static componentName = 'Avatar'

  protected template = template

  protected events = {
    click: () => {
      if (!this.props.action) {
        return
      }

      this.element()?.dispatchEvent(
        new CustomEvent(BUTTON_CLICK_EVENT, {
          bubbles: true,
          detail: { action: this.props.action },
        }),
      )
    },
  }
}
