import type { FormSubmitData } from '../../components/ui/form/types'
import ChatsPage from '../../pages/chats/ChatsPage'
import ChatService from '../../services/ChatService'
import RouteController from '../RouteController'

export default class ChatsController extends RouteController<ChatsPage> {
  private readonly chatService = new ChatService()

  render(): HTMLElement {
    return this.renderPage(
      new ChatsPage({
        ...this.chatService.getChatsPageData(),
        onSubmit: (data: FormSubmitData) => console.log(data),
      }),
      'ChatsPage'
    )
  }
}
