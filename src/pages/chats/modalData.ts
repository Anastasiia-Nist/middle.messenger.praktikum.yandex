import type { FormActionConfig, FormFieldConfig } from '../../components/ui/form/types'
import type { ChatUser } from '../../types/chat'
import type { User } from '../../types/user'
import type { ChatsModalsState } from './types'

export const createChatFields: FormFieldConfig[] = [
  {
    id: 'title',
    name: 'title',
    label: 'Название чата',
    type: 'text',
    placeholder: 'Введите название',
  },
]

export const createChatActions: FormActionConfig[] = [
  {
    type: 'submit',
    text: 'Создать',
    buttonClass: 'button_stretch_full',
  },
  {
    type: 'button',
    text: 'Отмена',
    buttonClass: 'button_stretch_full button_color_danger button_border_danger',
    action: 'modal-cancel',
  },
]

export const addUserFields: FormFieldConfig[] = [
  {
    id: 'login',
    name: 'login',
    label: 'Логин пользователя',
    type: 'text',
    placeholder: 'Введите логин',
  },
]

export const addUserSearchActions: FormActionConfig[] = [
  {
    type: 'button',
    text: 'Найти',
    buttonClass: 'button_stretch_full',
    action: 'search-user',
  },
  {
    type: 'button',
    text: 'Отмена',
    buttonClass: 'button_stretch_full button_color_danger button_border_danger',
    action: 'modal-cancel',
  },
]

export const defaultModalsState: ChatsModalsState = {
  createChat: { isOpen: false },
  addUser: { isOpen: false, searchResults: [] },
  removeUser: { isOpen: false, users: [] },
}

export const mockSearchResults: User[] = [
  {
    id: 1,
    first_name: 'Иван',
    second_name: 'Иванов',
    display_name: 'ivan',
    login: 'ivan',
    avatar: '',
    email: 'ivan@mail.ru',
    phone: '+79990000001',
  },
]

export const mockChatUsers: ChatUser[] = [
  {
    id: 2,
    first_name: 'Пётр',
    second_name: 'Петров',
    display_name: 'petr',
    login: 'petr',
    avatar: '',
    role: 'user',
  },
]
