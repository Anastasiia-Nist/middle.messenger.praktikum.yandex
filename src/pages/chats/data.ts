import { chatListMock, chatMessagesByDayMock } from '../../mock/chat/messages'

export const chatsPageData = {
  sidebar: {
    profileLink: '#/settings',
    profileText: 'Профиль >',
    searchPlaceholder: 'Поиск',
    chats: chatListMock,
  },
  activeChatName: 'Грейнджер',
  messagesByDay: chatMessagesByDayMock,
  messageForm: {
    name: 'chat-message',
    formClass: 'chat-content__form form_chat',
    fields: [
      {
        id: 'message',
        name: 'message',
        label: '',
        type: 'text',
        placeholder: 'Сообщение',
        inputClass: 'form-field_chat',
        validateOnBlur: false,
        autocomplete: 'off',
      },
    ],
    leadingActions: [
      {
        type: 'button',
        buttonClass: 'chat-content__add-file',
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
