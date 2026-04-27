import { chatMessagesMock } from '../../mock/chat-messages'

export const chatsPageData = {
  title: 'Чаты',
  stubText: 'Заглушка страницы списка чатов и переписки.',
  messages: chatMessagesMock,
  form: {
    fields: [
      {
        id: 'message',
        name: 'message',
        label: 'Сообщение',
        type: 'text',
      },
    ],
    actions: [
      {
        type: 'submit',
        text: 'Отправить',
      },
    ],
  },
}
