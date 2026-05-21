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
} as const
