import type { ChatModalKey } from '../../components/pages/chats/modals/modalsConfig'
import {
  chatsModalConfig,
  getModalKeyByMenuAction,
} from '../../components/pages/chats/modals/modalsConfig'
import { defaultModalsState } from '../../components/pages/chats/modals/modalData'
import { buildMenuItems } from '../../components/pages/chats/header/menuItems'
import type { FormData } from '../../components/ui/form/types'
import {
  ACTIONS,
  CHAT_MODAL_ERRORS,
  CHAT_PLACEHOLDER,
  type ChatMenuAction,
} from '../../constants'
import { buildChatsPageProps } from '../../pages/chats/buildChatsPageProps'
import ChatsPage from '../../pages/chats/ChatsPage'
import type { ChatsModalsState } from '../../types/chats-page'
import { chatService } from '../../services/ChatService'
import { userService } from '../../services/UserService'
import RouteController from '../RouteController'

export default class ChatsController extends RouteController<ChatsPage> {
  private readonly pageData = buildChatsPageProps()

  private activeChatId: number | null = null

  private modalsState: ChatsModalsState = defaultModalsState

  render(): HTMLElement {
    const element = this.renderPage(
      new ChatsPage({
        ...this.pageData,
        modals: this.modalsState,
        onSubmit: (data: FormData) => this.handleSendMessage(data),
        onChatSelect: (chatId: number) => {
          this.handleChatSelect(chatId)
        },
        onMenuAction: (action: ChatMenuAction) => {
          void this.handleMenuAction(action)
        },
        onCloseModal: (modal: ChatModalKey) => {
          this.closeModal(modal)
        },
        onCreateChat: async (data: { title: string }) => {
          await this.handleCreateChat(data.title)
        },
        onSearchUser: async (login: string) => {
          await this.handleSearchUser(login)
        },
        onAddUser: async (userId: number) => {
          await this.handleAddUser(userId)
        },
        onRemoveUser: async (userId: number) => {
          await this.handleRemoveUser(userId)
        },
        onDeleteChat: async () => {
          await this.handleDeleteChat()
        },
      }),
      'ChatsPage',
    )

    void this.loadChats()

    return element
  }

  private handleSendMessage(data: FormData): void {
    // TODO: подключить отправку сообщений
    void data
  }

  private setModals(modals: ChatsModalsState): void {
    this.modalsState = modals
    this.page?.setProps({ modals })
  }

  private openModal(modalKey: ChatModalKey): void {
    const config = chatsModalConfig[modalKey]

    this.setModals({
      ...this.modalsState,
      [modalKey]: config.getOpenState(this.modalsState),
    })
  }

  private closeModal(modalKey: ChatModalKey): void {
    const config = chatsModalConfig[modalKey]

    this.setModals({
      ...this.modalsState,
      [modalKey]: config.getClosedState(),
    })
  }

  private updateChatsView(chats: Awaited<ReturnType<typeof chatService.fetchChats>>): void {
    const resolvedActiveChat = chats.find((chat) => chat.id === this.activeChatId)

    this.page?.setProps({
      sidebar: {
        ...this.pageData.sidebar,
        chats,
      },
      activeChatId: this.activeChatId,
      activeChatName: resolvedActiveChat?.name ?? CHAT_PLACEHOLDER,
      menuItems: buildMenuItems(this.activeChatId),
    })
  }

  private async loadChats(selectChatId?: number): Promise<void> {
    try {
      if (selectChatId !== undefined) {
        this.activeChatId = selectChatId
      }

      let chats = await chatService.fetchChats(this.activeChatId)
      const activeChat = chats.find((chat) => chat.id === this.activeChatId)

      if (this.activeChatId !== null && !activeChat) {
        this.activeChatId = chats[0]?.id ?? null
        chats = await chatService.fetchChats(this.activeChatId)
      }

      this.updateChatsView(chats)
    } catch (error) {
      console.error(error)
    }
  }

  private handleChatSelect(chatId: number): void {
    this.activeChatId = chatId

    void this.refreshChatsView()
  }

  private async refreshChatsView(): Promise<void> {
    try {
      const chats = await chatService.fetchChats(this.activeChatId)

      this.updateChatsView(chats)
    } catch (error) {
      console.error(error)
    }
  }

  private async handleMenuAction(action: ChatMenuAction): Promise<void> {
    const modalKey = getModalKeyByMenuAction(action)

    if (!modalKey) {
      return
    }

    const config = chatsModalConfig[modalKey]

    if (config.requiresActiveChat && this.activeChatId === null) {
      return
    }

    if (action === ACTIONS.CHAT_MENU.REMOVE_USER) {
      await this.loadRemoveUserModal()

      return
    }

    this.openModal(modalKey)
  }

  private async handleCreateChat(title: string): Promise<void> {
    const trimmedTitle = title.trim()

    if (!trimmedTitle) {
      this.setModalError('createChat', CHAT_MODAL_ERRORS.CREATE_TITLE_REQUIRED)

      return
    }

    try {
      const chatId = await chatService.createChat(trimmedTitle)

      this.setModals({
        ...this.modalsState,
        createChat: { isOpen: false, error: undefined },
      })

      await this.loadChats(chatId)
    } catch (error) {
      this.setModalError(
        'createChat',
        error instanceof Error ? error.message : CHAT_MODAL_ERRORS.CREATE_FAILED,
      )
    }
  }

  private async handleSearchUser(login: string): Promise<void> {
    const trimmedLogin = login.trim()

    if (!trimmedLogin) {
      this.setModalError('addUser', CHAT_MODAL_ERRORS.SEARCH_LOGIN_REQUIRED)

      return
    }

    try {
      const searchResults = await userService.searchByLogin(trimmedLogin)

      this.setModals({
        ...this.modalsState,
        addUser: {
          ...this.modalsState.addUser,
          isOpen: true,
          searchResults,
          error: searchResults.length ? undefined : CHAT_MODAL_ERRORS.SEARCH_NOT_FOUND,
        },
      })
    } catch (error) {
      this.setModalError(
        'addUser',
        error instanceof Error ? error.message : CHAT_MODAL_ERRORS.SEARCH_FAILED,
      )
    }
  }

  private async handleAddUser(userId: number): Promise<void> {
    if (this.activeChatId === null) {
      return
    }

    try {
      await chatService.addUsers(this.activeChatId, [userId])

      this.setModals({
        ...this.modalsState,
        addUser: { isOpen: false, searchResults: [], error: undefined },
      })
    } catch (error) {
      this.setModalError(
        'addUser',
        error instanceof Error ? error.message : CHAT_MODAL_ERRORS.ADD_USER_FAILED,
      )
    }
  }

  private async handleRemoveUser(userId: number): Promise<void> {
    if (this.activeChatId === null) {
      return
    }

    try {
      await chatService.removeUsers(this.activeChatId, [userId])
      await this.loadRemoveUserModal()
    } catch (error) {
      this.setModalError(
        'removeUser',
        error instanceof Error ? error.message : CHAT_MODAL_ERRORS.REMOVE_USER_FAILED,
      )
    }
  }

  private async handleDeleteChat(): Promise<void> {
    if (this.activeChatId === null) {
      return
    }

    try {
      await chatService.deleteChat(this.activeChatId)

      this.setModals({
        ...this.modalsState,
        deleteChat: { isOpen: false, error: undefined },
      })

      await this.loadChats()
    } catch (error) {
      this.setModalError(
        'deleteChat',
        error instanceof Error ? error.message : CHAT_MODAL_ERRORS.DELETE_CHAT_FAILED,
      )
    }
  }

  private async loadRemoveUserModal(): Promise<void> {
    if (this.activeChatId === null) {
      return
    }

    try {
      const users = await chatService.fetchChatUsers(this.activeChatId)

      this.setModals({
        ...this.modalsState,
        removeUser: {
          isOpen: true,
          users,
          error: undefined,
        },
      })
    } catch (error) {
      this.setModalError(
        'removeUser',
        error instanceof Error ? error.message : CHAT_MODAL_ERRORS.LOAD_USERS_FAILED,
      )
    }
  }

  private setModalError(modal: keyof ChatsModalsState, error: string): void {
    this.setModals({
      ...this.modalsState,
      [modal]: {
        ...this.modalsState[modal],
        isOpen: true,
        error,
      },
    })
  }
}
