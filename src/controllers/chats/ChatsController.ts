import type { ChatMenuAction } from '../../components/pages/chats/header/types'
import type { ChatSidebarItem } from '../../components/pages/chats/sidebar/types'
import type { FormData } from '../../components/ui/form/types'
import { buildMenuItems } from '../../pages/chats/menuItems'
import { defaultModalsState } from '../../pages/chats/modalData'
import ChatsPage from '../../pages/chats/ChatsPage'
import type { ChatsModalsState } from '../../pages/chats/types'
import ChatService from '../../services/ChatService'
import { userService } from '../../services/UserService'
import RouteController from '../RouteController'

export default class ChatsController extends RouteController<ChatsPage> {
  private readonly chatService = new ChatService()

  private readonly pageData = this.chatService.getChatsPageData()

  private activeChatId: number | null = null

  private chats: ChatSidebarItem[] = []

  private modalsState: ChatsModalsState = defaultModalsState

  render(): HTMLElement {
    const element = this.renderPage(
      new ChatsPage({
        ...this.pageData,
        modals: this.modalsState,
        onSubmit: (data: FormData) => console.log(data),
        onChatSelect: (chatId: number) => {
          void this.handleChatSelect(chatId)
        },
        onMenuAction: (action: ChatMenuAction) => {
          void this.handleMenuAction(action)
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
      }),
      'ChatsPage',
    )

    void this.loadChats()

    return element
  }

  private getModalsState(): ChatsModalsState {
    return this.page?.getModals() ?? this.modalsState
  }

  private setModals(modals: ChatsModalsState): void {
    this.modalsState = modals
    this.page?.setProps({ modals })
  }

  private async loadChats(selectChatId?: number): Promise<void> {
    try {
      if (selectChatId !== undefined) {
        this.activeChatId = selectChatId
      }

      const chats = await this.chatService.fetchChats(this.activeChatId)
      const activeChat = chats.find((chat) => chat.id === this.activeChatId)

      if (this.activeChatId !== null && !activeChat) {
        this.activeChatId = chats[0]?.id ?? null
      }

      const resolvedActiveChat = chats.find((chat) => chat.id === this.activeChatId)

      this.chats = chats

      this.page?.setProps({
        sidebar: {
          ...this.pageData.sidebar,
          chats,
        },
        activeChatId: this.activeChatId,
        activeChatName: resolvedActiveChat?.name ?? 'Выберите чат',
        menuItems: buildMenuItems(this.activeChatId),
      })
    } catch (error) {
      console.error(error)
    }
  }

  private async handleChatSelect(chatId: number): Promise<void> {
    this.activeChatId = chatId

    const chats = this.chats.map((chat) => ({
      ...chat,
      isActive: chat.id === chatId,
    }))

    const activeChat = chats.find((chat) => chat.id === chatId)

    this.chats = chats

    this.page?.setProps({
      sidebar: {
        ...this.pageData.sidebar,
        chats,
      },
      activeChatId: chatId,
      activeChatName: activeChat?.name ?? 'Выберите чат',
      menuItems: buildMenuItems(chatId),
    })
  }

  private async handleMenuAction(action: ChatMenuAction): Promise<void> {
    if (action === 'remove-user' && this.activeChatId !== null) {
      await this.loadRemoveUserModal()
    }
  }

  private async handleCreateChat(title: string): Promise<void> {
    const trimmedTitle = title.trim()

    if (!trimmedTitle) {
      this.setModalError('createChat', 'Введите название чата')

      return
    }

    try {
      const chatId = await this.chatService.createChat(trimmedTitle)

      this.setModals({
        ...this.getModalsState(),
        createChat: { isOpen: false, error: undefined },
      })

      await this.loadChats(chatId)
    } catch (error) {
      this.setModalError('createChat', error instanceof Error ? error.message : 'Не удалось создать чат')
    }
  }

  private async handleSearchUser(login: string): Promise<void> {
    const trimmedLogin = login.trim()

    if (!trimmedLogin) {
      this.setModalError('addUser', 'Введите логин')

      return
    }

    try {
      const searchResults = await userService.searchByLogin(trimmedLogin)

      this.setModals({
        ...this.getModalsState(),
        addUser: {
          ...this.getModalsState().addUser,
          isOpen: true,
          searchResults,
          error: searchResults.length ? undefined : 'Пользователи не найдены',
        },
      })
    } catch (error) {
      this.setModalError('addUser', error instanceof Error ? error.message : 'Не удалось найти пользователя')
    }
  }

  private async handleAddUser(userId: number): Promise<void> {
    if (this.activeChatId === null) {
      return
    }

    try {
      await this.chatService.addUsers(this.activeChatId, [userId])

      this.setModals({
        ...this.getModalsState(),
        addUser: { isOpen: false, searchResults: [], error: undefined },
      })
    } catch (error) {
      this.setModalError('addUser', error instanceof Error ? error.message : 'Не удалось добавить пользователя')
    }
  }

  private async handleRemoveUser(userId: number): Promise<void> {
    if (this.activeChatId === null) {
      return
    }

    try {
      await this.chatService.removeUsers(this.activeChatId, [userId])
      await this.loadRemoveUserModal()
    } catch (error) {
      this.setModalError('removeUser', error instanceof Error ? error.message : 'Не удалось удалить пользователя')
    }
  }

  private async loadRemoveUserModal(): Promise<void> {
    if (this.activeChatId === null) {
      return
    }

    try {
      const users = await this.chatService.fetchChatUsers(this.activeChatId)

      this.setModals({
        ...this.getModalsState(),
        removeUser: {
          isOpen: true,
          users,
          error: undefined,
        },
      })
    } catch (error) {
      this.setModalError('removeUser', error instanceof Error ? error.message : 'Не удалось загрузить участников')
    }
  }

  private setModalError(modal: keyof ChatsModalsState, error: string): void {
    const currentModals = this.getModalsState()

    this.setModals({
      ...currentModals,
      [modal]: {
        ...currentModals[modal],
        isOpen: true,
        error,
      },
    })
  }
}
