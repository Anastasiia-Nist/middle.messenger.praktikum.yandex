import type { ChatsPageProps } from '../pages/chats/types'
import { chatsPageData } from '../pages/chats/data'

export default class ChatService {
  getChatsPageData(): ChatsPageProps {
    return {
      ...chatsPageData,
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
}
