import Block from '../../system/Block'
import template from './template.hbs?raw'
import type { ChatsPageProps } from './types'

export default class ChatsPage extends Block<ChatsPageProps> {
  protected template = template

  protected componentDidMount(): void {
    this.scrollMessagesToBottom()
  }

  public destroy(): void {
    this.props.onUnmount?.()
    super.destroy()
  }

  private scrollMessagesToBottom(): void {
    const container = this.element()?.querySelector('#chat-messages')

    if (!(container instanceof HTMLElement)) {
      return
    }

    requestAnimationFrame(() => {
      container.scrollTop = container.scrollHeight
    })
  }
}
