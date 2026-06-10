import type { ChatMenuAction } from '../../components/pages/chats/header/types'
import {
  chatsModalConfig,
  getModalKeyByMenuAction,
  type ChatModalKey,
} from '../../components/pages/chats/modals/modalsConfig'
import Block from '../../system/Block'
import template from './template.hbs?raw'
import type { ChatsModalsState, ChatsPageProps } from './types'

export default class ChatsPage extends Block<ChatsPageProps> {
  protected template = template

  public getModals(): ChatsModalsState {
    return this.props.modals
  }

  constructor(props: ChatsPageProps) {
    super({
      ...props,
      onMenuAction: (action: ChatMenuAction) => {
        this.handleMenuAction(action)
        props.onMenuAction?.(action)
      },
      onCloseCreateChat: () => {
        this.closeModal('createChat')
      },
      onCloseAddUser: () => {
        this.closeModal('addUser')
      },
      onCloseRemoveUser: () => {
        this.closeModal('removeUser')
      },
      onSearch: (login: string) => {
        void props.onSearchUser?.(login)
      },
      onCreateChat: async (data: { title: string }) => {
        await props.onCreateChat?.(data)
      },
      onAddUser: (userId: number) => {
        void props.onAddUser?.(userId)
      },
      onRemoveUser: (userId: number) => {
        void props.onRemoveUser?.(userId)
      },
    })
  }

  public setProps(props: Partial<ChatsPageProps>): void {
    const nextProps = { ...props }

    if (nextProps.onMenuAction) {
      const onMenuAction = nextProps.onMenuAction

      nextProps.onMenuAction = (action: ChatMenuAction) => {
        this.handleMenuAction(action)
        onMenuAction(action)
      }
    }

    if (nextProps.onSearchUser) {
      const onSearchUser = nextProps.onSearchUser

      nextProps.onSearch = (login: string) => {
        void onSearchUser(login)
      }
    }

    if (nextProps.onCreateChat) {
      const onCreateChat = nextProps.onCreateChat

      nextProps.onCreateChat = async (data: { title: string }) => {
        await onCreateChat(data)
      }
    }

    if (nextProps.onAddUser) {
      const onAddUser = nextProps.onAddUser

      nextProps.onAddUser = (userId: number) => {
        void onAddUser(userId)
      }
    }

    if (nextProps.onRemoveUser) {
      const onRemoveUser = nextProps.onRemoveUser

      nextProps.onRemoveUser = (userId: number) => {
        void onRemoveUser(userId)
      }
    }

    super.setProps(nextProps)
  }

  private handleMenuAction(action: ChatMenuAction): void {
    const modalKey = getModalKeyByMenuAction(action)

    if (!modalKey) {
      return
    }

    const config = chatsModalConfig[modalKey]

    if (config.requiresActiveChat && this.props.activeChatId === null) {
      return
    }

    this.openModal(modalKey)
  }

  private openModal(modalKey: ChatModalKey): void {
    const config = chatsModalConfig[modalKey]

    this.setProps({
      modals: {
        ...this.props.modals,
        [modalKey]: config.getOpenState(this.props.modals),
      },
    })
  }

  private closeModal(modalKey: ChatModalKey): void {
    const config = chatsModalConfig[modalKey]

    this.setProps({
      modals: {
        ...this.props.modals,
        [modalKey]: config.getClosedState(),
      },
    })
  }
}
