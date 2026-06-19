import { ACTIONS, type ChatMenuAction } from '../../../../constants'
import type { ChatsModalsState } from '../../../../types/chats-page'
import type { FormActionConfig, FormFieldConfig } from '../../../ui/form/types'
import {
  addUserFields,
  addUserListItemAction,
  addUserSearchActions,
  createChatActions,
  createChatFields,
  deleteChatActions,
  removeUserCloseActions,
  removeUserListItemAction,
  type ModalListItemAction,
} from './modalData'

export type ChatModalKey = keyof ChatsModalsState

export type ChatModalContentType = 'form' | 'search-form' | 'user-list' | 'confirm'

export interface ChatModalConfig {
  title: string
  hostClass: string
  modalClass?: string
  contentType: ChatModalContentType
  message?: string
  formName?: string
  fields?: FormFieldConfig[]
  actions?: FormActionConfig[]
  searchActions?: FormActionConfig[]
  listItemAction?: ModalListItemAction
  emptyListMessage?: string
  menuAction?: ChatMenuAction
  requiresActiveChat?: boolean
  getOpenState: (modals: ChatsModalsState) => ChatsModalsState[ChatModalKey]
  getClosedState: () => ChatsModalsState[ChatModalKey]
}

export const chatsModalConfig: Record<ChatModalKey, ChatModalConfig> = {
  createChat: {
    title: 'Создать чат',
    hostClass: 'chat-modal chat-modal_create',
    modalClass: 'modal_create-chat',
    contentType: 'form',
    formName: 'create-chat',
    fields: createChatFields,
    actions: createChatActions,
    menuAction: ACTIONS.CHAT_MENU.CREATE,
    getOpenState: () => ({ isOpen: true, error: undefined }),
    getClosedState: () => ({ isOpen: false, error: undefined }),
  },
  addUser: {
    title: 'Добавить пользователя',
    hostClass: 'chat-modal chat-modal_add-user',
    modalClass: 'modal_add-user',
    contentType: 'search-form',
    formName: 'add-user',
    fields: addUserFields,
    searchActions: addUserSearchActions,
    listItemAction: addUserListItemAction,
    menuAction: ACTIONS.CHAT_MENU.ADD_USER,
    requiresActiveChat: true,
    getOpenState: () => ({ isOpen: true, searchResults: [], error: undefined }),
    getClosedState: () => ({ isOpen: false, searchResults: [], error: undefined }),
  },
  removeUser: {
    title: 'Удалить пользователя',
    hostClass: 'chat-modal chat-modal_remove-user',
    modalClass: 'modal_remove-user',
    contentType: 'user-list',
    listItemAction: removeUserListItemAction,
    actions: removeUserCloseActions,
    emptyListMessage: 'В чате нет участников',
    menuAction: ACTIONS.CHAT_MENU.REMOVE_USER,
    requiresActiveChat: true,
    getOpenState: (modals) => ({
      isOpen: true,
      users: modals.removeUser.users,
      error: undefined,
    }),
    getClosedState: () => ({ isOpen: false, users: [], error: undefined }),
  },
  deleteChat: {
    title: 'Удалить чат',
    hostClass: 'chat-modal chat-modal_delete-chat',
    modalClass: 'modal_delete-chat',
    contentType: 'confirm',
    message: 'Вы уверены, что хотите удалить этот чат?',
    actions: deleteChatActions,
    menuAction: ACTIONS.CHAT_MENU.DELETE_CHAT,
    requiresActiveChat: true,
    getOpenState: () => ({ isOpen: true, error: undefined }),
    getClosedState: () => ({ isOpen: false, error: undefined }),
  },
}

export function getModalKeyByMenuAction(action: ChatMenuAction): ChatModalKey | undefined {
  return (Object.entries(chatsModalConfig) as Array<[ChatModalKey, ChatModalConfig]>).find(
    ([, config]) => config.menuAction === action,
  )?.[0]
}
