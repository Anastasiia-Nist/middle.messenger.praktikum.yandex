import Block from '../../block/block'
import type { ChatSidebarProps } from '../../components/pages/chats/sidebar/ChatSidebar'
import type { FormSubmitData } from '../../components/ui/form/Form'
import FormService from '../../services/FormService'
import type { BlockOwnProps } from '../../types/block'
import template from './template.hbs?raw'

const formService = new FormService()

export interface ChatMessageItem {
  text: string
  time: string
  isOwn?: boolean
}

export interface ChatDayGroup {
  date: string
  messages: ChatMessageItem[]
}

export interface ChatsPageProps extends BlockOwnProps {
  sidebar: ChatSidebarProps
  activeChatName: string
  messagesByDay: ChatDayGroup[]
  onMessageSubmit?: (data: FormSubmitData) => void
}

export default class ChatsPage extends Block<ChatsPageProps> {
  protected template = template

  private submitHandler: ((event: Event) => void) | null = null

  protected componentDidMount(): void {
    const form = this.refs.messageForm

    if (!(form instanceof HTMLFormElement) || !this.props.onMessageSubmit) {
      return
    }

    this.submitHandler = (event: Event) => {
      event.preventDefault()
      this.props.onMessageSubmit?.(formService.collect(form))
    }

    form.addEventListener('submit', this.submitHandler)
  }

  protected componentWillUnmount(): void {
    const form = this.refs.messageForm

    if (form instanceof HTMLFormElement && this.submitHandler) {
      form.removeEventListener('submit', this.submitHandler)
    }

    this.submitHandler = null
  }
}
