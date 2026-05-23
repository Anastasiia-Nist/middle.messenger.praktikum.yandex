import Block from '../../../system/Block'
import template from './chat-message.hbs?raw'
import type { ChatMessageProps } from './types'

export default class ChatMessage extends Block<ChatMessageProps> {
  static componentName = 'ChatMessage'

  protected template = template
}
