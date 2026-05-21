export const chatListMock = [
  {
    id: 'chat-1',
    name: 'Грейнджер',
    time: '10:48',
    preview: 'Отправь, пожалуйста, макет главной страницы.',
    unreadCount: 2,
    isActive: true,
  },
  {
    id: 'chat-2',
    name: 'Малфой',
    time: '09:10',
    preview: 'Проверил стили, можно мерджить.',
    unreadCount: 0,
    isActive: false,
  },
  {
    id: 'chat-3',
    name: 'Поттер',
    time: 'Вчера',
    preview: 'Не забудь про тесты для формы.',
    unreadCount: 3,
    isActive: false,
  },
  {
    id: 'chat-4',
    name: 'Снегг',
    time: 'Вчера',
    preview: 'Жду апдейт по задаче к вечеру.',
    unreadCount: 0,
    isActive: false,
  },
  {
    id: 'chat-5',
    name: 'Луна',
    time: 'Пн',
    preview: 'Соберемся завтра на созвон?',
    unreadCount: 1,
    isActive: false,
  },
  {
    id: 'chat-6',
    name: 'Седрик',
    time: 'Пн',
    preview: 'Скинул комментарии к PR.',
    unreadCount: 0,
    isActive: false,
  },
  {
    id: 'chat-7',
    name: 'Чжоу',
    time: 'Вс',
    preview: 'Можем вынести это в отдельный компонент.',
    unreadCount: 0,
    isActive: false,
  },
  {
    id: 'chat-8',
    name: 'Невилл',
    time: 'Сб',
    preview: 'Спасибо за помощь с валидацией.',
    unreadCount: 4,
    isActive: false,
  },
  {
    id: 'chat-9',
    name: 'Макгонагалл',
    time: 'Сб',
    preview: 'Подготовьте демо к пятнице.',
    unreadCount: 0,
    isActive: false,
  },
  {
    id: 'chat-10',
    name: 'Люпин',
    time: 'Пт',
    preview: 'Можно уточнить требования по странице?',
    unreadCount: 0,
    isActive: false,
  },
]

export const chatMessagesByDayMock = [
  {
    date: '30 апреля',
    messages: [
      {
        id: 'msg-1',
        text: 'Привет! Как продвигается проект?',
        time: '09:12',
        isOwn: false,
      },
      {
        id: 'msg-2',
        text: 'Отлично, уже сделали роутинг и шаблоны.',
        time: '09:13',
        isOwn: true,
      },
      {
        id: 'msg-3',
        text: 'Супер, осталось добавить стили и валидацию.',
        time: '09:15',
        isOwn: false,
      },
    ],
  },
  {
    date: '1 мая',
    messages: [
      {
        id: 'msg-4',
        text: 'Сделал компонент сайдбара и моковые чаты.',
        time: '10:32',
        isOwn: true,
      },
      {
        id: 'msg-5',
        text: 'Отлично, проверь пожалуйста скролл в списке чатов.',
        time: '10:35',
        isOwn: false,
      },
      {
        id: 'msg-6',
        text: 'Проверил, все работает. Осталось немного полировки.',
        time: '10:48',
        isOwn: true,
      },
    ],
  },
  {
    date: '12 мая',
    messages: [
      {
        id: 'msg-4',
        text: 'Сделал компонент сайдбара и моковые чаты.',
        time: '10:32',
        isOwn: true,
      },
      {
        id: 'msg-5',
        text: 'Отлично, проверь пожалуйста скролл в списке чатов.',
        time: '10:35',
        isOwn: false,
      },
      {
        id: 'msg-6',
        text: 'Проверил, все работает. Осталось немного полировки.',
        time: '10:48',
        isOwn: true,
      },
    ],
  },
]
