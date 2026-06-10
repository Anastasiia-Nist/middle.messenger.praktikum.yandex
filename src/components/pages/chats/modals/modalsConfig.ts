import { ACTIONS, type ChatMenuAction } from '../../../../constants'
import type { ChatsModalsState } from '../../../../types/chats-page'
import type { FormActionConfig, FormFieldConfig } from '../../../ui/form/types'
import {
  addUserFields,
  addUserSearchActions,
  createChatActions,
  createChatFields,
} from './modalData'

export type ChatModalKey = keyof ChatsModalsState

export type ChatModalContentType = 'form' | 'search-form' | 'user-list'

export interface ChatModalConfig {
  title: string
  hostClass: string
  modalClass?: string
  contentType: ChatModalContentType
  formName?: string
  fields?: FormFieldConfig[]
  actions?: FormActionConfig[]
  searchActions?: FormActionConfig[]
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
    menuAction: ACTIONS.CHAT_MENU.REMOVE_USER,
    requiresActiveChat: true,
    getOpenState: (modals) => ({
      isOpen: true,
      users: modals.removeUser.users,
      error: undefined,
    }),
    getClosedState: () => ({ isOpen: false, users: [], error: undefined }),
  },
}

export function getModalKeyByMenuAction(action: ChatMenuAction): ChatModalKey | undefined {
  return (Object.entries(chatsModalConfig) as Array<[ChatModalKey, ChatModalConfig]>).find(
    ([, config]) => config.menuAction === action,
  )?.[0]
}
