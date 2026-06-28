import Block from '../../system/Block'
import template from './template.hbs?raw'
import type { ChatsPageProps } from './types'

export default class ChatsPage extends Block<ChatsPageProps> {
  protected template = template

  public destroy(): void {
    this.props.onUnmount?.()
    super.destroy()
  }
}
