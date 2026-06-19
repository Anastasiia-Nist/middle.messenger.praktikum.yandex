import { ACTIONS, BUTTON_CLICK_EVENT } from '../../../constants'
import Block from '../../../system/Block'
import { isCustomEventWithStringDetail } from '../../../utils/events'
import template from './modal.hbs?raw'
import type { ModalProps } from './types'

export default class Modal<P extends ModalProps = ModalProps> extends Block<P> {
  static componentName = 'Modal'

  protected template = template

  constructor(props: P) {
    super({
      ...props,
      closeAction: props.closeAction ?? ACTIONS.MODAL_CLOSE,
    } as P)
  }

  protected events = {
    [BUTTON_CLICK_EVENT]: (event: Event) => {
      if (!isCustomEventWithStringDetail(event, 'action')) {
        return
      }

      const { action } = event.detail

      if (this.isCloseAction(action)) {
        this.close()

        return
      }

      this.handleAction(action)
    },

    click: (event: Event) => {
      const target = event.target as Element

      if (target === this.refs.overlay) {
        this.close()
      }
    },

    keydown: (event: Event) => {
      if (event instanceof KeyboardEvent && event.key === 'Escape') {
        this.close()
      }
    },
  }

  protected isCloseAction(action: string): boolean {
    return action === ACTIONS.MODAL_CLOSE || action === (this.props.cancelAction ?? ACTIONS.MODAL_CANCEL)
  }

  protected handleAction(action: string): void {
    void action
  }

  protected close(): void {
    this.props.onClose?.()
  }
}
