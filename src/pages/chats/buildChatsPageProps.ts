import { buildMenuItems } from '../../components/pages/chats/header/menuItems'
import { defaultModalsState } from '../../components/pages/chats/modals/modalData'
import type { ChatsPageProps } from '../../types/chats-page'
import { chatsPageData } from './data'

export function buildChatsPageProps(): ChatsPageProps {
  return {
    ...chatsPageData,
    activeChatId: null,
    menuItems: buildMenuItems(null),
    modals: defaultModalsState,
    sidebar: {
      ...chatsPageData.sidebar,
      chats: [...chatsPageData.sidebar.chats],
    },
    messagesByDay: [...chatsPageData.messagesByDay],
    messageForm: {
      ...chatsPageData.messageForm,
      fields: [...chatsPageData.messageForm.fields],
      leadingActions: [...chatsPageData.messageForm.leadingActions],
      actions: [...chatsPageData.messageForm.actions],
    },
  }
}
