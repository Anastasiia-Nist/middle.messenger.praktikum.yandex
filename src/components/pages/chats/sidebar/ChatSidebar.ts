import Block from '../../../../system/Block'
import template from './chat-sidebar.hbs?raw'
import type { ChatSidebarProps } from './types'

export default class ChatSidebar extends Block<ChatSidebarProps> {
  static componentName = 'ChatSidebar'

  protected template = template

  protected events = {
    click: (event: Event) => {
      const item = (event.target as Element).closest<HTMLElement>('[data-chat-id]')

      if (!item) {
        return
      }

      const chatId = Number(item.dataset.chatId)

      if (!Number.isNaN(chatId)) {
        this.props.onChatSelect?.(chatId)
      }
    },
  }
}
