import { chatMessagesMock } from '../../mock/chat/messages'

export const chatsPageData = {
  messages: chatMessagesMock,
  form: {
    fields: [
      {
        id: 'message',
        name: 'message',
        label: 'Сообщение',
        fieldType: 'textarea',
        rows: 3,
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
