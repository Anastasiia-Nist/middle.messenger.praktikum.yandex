import { ACTIONS, BUTTON_CLICK_EVENT } from '../../../constants'
import Block from '../../../system/Block'
import template from './avatar.hbs?raw'
import type { AvatarProps } from './types'

const DEFAULT_ACCEPT = 'image/jpeg,image/jpg,image/png,image/gif,image/webp'

export default class Avatar extends Block<AvatarProps> {
  static componentName = 'Avatar'

  protected template = template

  private fileInput: HTMLInputElement | null = null

  protected events = {
    click: () => {
      if (!this.props.action) {
        return
      }

      if (this.props.action === ACTIONS.SETTINGS.CHANGE_AVATAR && this.props.onFileSelect) {
        this.openFilePicker()

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

  private openFilePicker(): void {
    if (!this.fileInput) {
      this.fileInput = document.createElement('input')
      this.fileInput.type = 'file'
      this.fileInput.accept = this.props.accept ?? DEFAULT_ACCEPT
      this.fileInput.style.display = 'none'
      this.fileInput.addEventListener('change', () => {
        const file = this.fileInput?.files?.[0]

        if (file) {
          void this.props.onFileSelect?.(file)
        }

        if (this.fileInput) {
          this.fileInput.value = ''
        }
      })
      document.body.appendChild(this.fileInput)
    }

    this.fileInput.click()
  }
}
