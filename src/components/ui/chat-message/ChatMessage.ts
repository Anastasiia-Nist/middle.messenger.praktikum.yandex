import Block from '../../../block/block'
import type { BlockOwnProps } from '../../../types/block'
import template from './chat-message.hbs?raw'

export interface ChatMessageProps extends BlockOwnProps {
  text: string
  time: string
  isOwn?: boolean
}

export default class ChatMessage extends Block<ChatMessageProps> {
  static componentName = 'ChatMessage'

  protected template = template
}
