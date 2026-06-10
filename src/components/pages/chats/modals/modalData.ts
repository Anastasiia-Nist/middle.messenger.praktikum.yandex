import { ACTIONS } from '../../../../constants'
import type { FormFieldConfig } from '../../../ui/form/types'
import { createSubmitCancelActions } from '../../../../helpers/formActions'
import type { ChatsModalsState } from '../../../../types/chats-page'

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

export const defaultModalsState: ChatsModalsState = {
  createChat: { isOpen: false },
  addUser: { isOpen: false, searchResults: [] },
  removeUser: { isOpen: false, users: [] },
}
