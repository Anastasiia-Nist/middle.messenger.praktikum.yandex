import type { FormData } from '../../components/ui/form/types'
import ChatsPage from '../../pages/chats/ChatsPage'
import ChatService from '../../services/ChatService'
import RouteController from '../RouteController'

export default class ChatsController extends RouteController<ChatsPage> {
  private readonly chatService = new ChatService()

  private readonly pageData = this.chatService.getChatsPageData()

  render(): HTMLElement {
    const element = this.renderPage(
      new ChatsPage({
        ...this.pageData,
        onSubmit: (data: FormData) => console.log(data),
      }),
      'ChatsPage',
    )

    void this.loadChats()

    return element
  }

  private async loadChats(): Promise<void> {
    try {
      const chats = await this.chatService.fetchChats()

      this.page?.setProps({
        sidebar: {
          ...this.pageData.sidebar,
          chats,
        },
        activeChatName: chats[0]?.name ?? 'Выберите чат',
      })
    } catch (error) {
      console.error(error)
    }
  }
}
