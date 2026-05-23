import Block from '../../../../system/Block'
import template from './chat-sidebar.hbs?raw'
import type { ChatSidebarProps } from './types'

export default class ChatSidebar extends Block<ChatSidebarProps> {
  static componentName = 'ChatSidebar'

  protected template = template
}
