import Block from '../../../../system/Block'
import template from './chat-content-header.hbs?raw'
import type { ChatContentHeaderProps } from './types'

export default class ChatContentHeader extends Block<ChatContentHeaderProps> {
  static componentName = 'ChatContentHeader'

  protected template = template
}
