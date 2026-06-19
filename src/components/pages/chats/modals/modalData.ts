import { ACTIONS } from '../../../../constants'
import type { FormActionConfig, FormFieldConfig } from '../../../ui/form/types'
import { createSubmitCancelActions } from '../../../../helpers/formActions'
import type { ChatsModalsState } from '../../../../types/chats-page'

export type ModalListItemAction = Pick<FormActionConfig, 'type' | 'text' | 'buttonClass'>

export const createChatFields: FormFieldConfig[] = [
  {
    id: 'title',
    name: 'title',
    label: 'Название чата',
    type: 'text',
    placeholder: 'Введите название',
  },
]

export const createChatActions = createSubmitCancelActions(ACTIONS.MODAL_CANCEL, 'Создать')

export const addUserFields: FormFieldConfig[] = [
  {
    id: 'login',
    name: 'login',
    label: 'Логин пользователя',
    type: 'text',
    placeholder: 'Введите логин',
  },
]

export const addUserSearchActions = createSubmitCancelActions(ACTIONS.MODAL_CANCEL, 'Найти')

export const addUserListItemAction: ModalListItemAction = {
  type: 'button',
  text: 'Добавить',
  buttonClass: 'modal-user-list__action',
}

export const removeUserListItemAction: ModalListItemAction = {
  type: 'button',
  text: 'Удалить',
  buttonClass: 'modal-user-list__action modal-user-list__action_danger',
}

export const removeUserCloseActions: FormActionConfig[] = [
  {
    type: 'button',
    text: 'Закрыть',
    buttonClass: 'button_stretch_full',
    action: ACTIONS.MODAL_CLOSE,
  },
]

export const deleteChatActions: FormActionConfig[] = [
  {
    type: 'button',
    text: 'Удалить',
    buttonClass: 'button_stretch_full button_color_danger button_border_danger',
    action: ACTIONS.DELETE_CHAT_CONFIRM,
  },
  {
    type: 'button',
    text: 'Отмена',
    buttonClass: 'button_stretch_full',
    action: ACTIONS.MODAL_CANCEL,
  },
]

export const defaultModalsState: ChatsModalsState = {
  createChat: { isOpen: false },
  addUser: { isOpen: false, searchResults: [] },
  removeUser: { isOpen: false, users: [] },
  deleteChat: { isOpen: false },
}
