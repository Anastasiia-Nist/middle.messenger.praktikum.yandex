import { CHAT_PLACEHOLDER, ROUTES } from '../../constants'

export const chatsPageData = {
  sidebar: {
    profileLink: ROUTES.SETTINGS,
    profileText: 'Профиль >',
    chats: [],
  },
  activeChatName: CHAT_PLACEHOLDER,
  messagesByDay: [],
  messageForm: {
    name: 'chat-message',
    formClass: 'chat-content__form',
    fields: [
      {
        id: 'message',
        name: 'message',
        label: '',
        type: 'text',
        placeholder: 'Сообщение',
        inputClass: 'form-field_chat',
        autocomplete: 'off',
      },
    ],
    leadingActions: [
      {
        type: 'button',
        buttonClass: 'chat-content__add-file',
        disabled: true,
        title: 'Функционал в разработке',
      },
    ],
    actions: [
      {
        type: 'submit',
        buttonClass: 'chat-content__submit',
      },
    ],
  },
} as const
