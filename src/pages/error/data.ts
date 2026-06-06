import { ERROR_CODES, ROUTES } from '../../constants'

export const errorPageDataByCode = {
  [ERROR_CODES.NOT_FOUND]: {
    code: ERROR_CODES.NOT_FOUND,
    description: 'Не туда попали',
    link: {
      href: ROUTES.MESSENGER,
      text: 'Назад к чатам',
    },
  },
  [ERROR_CODES.SERVER_ERROR]: {
    code: ERROR_CODES.SERVER_ERROR,
    description: 'Мы уже фиксим',
    link: {
      href: ROUTES.MESSENGER,
      text: 'Назад к чатам',
    },
  },
} as const
