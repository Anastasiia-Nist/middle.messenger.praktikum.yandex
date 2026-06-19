import { ERROR_CODES, ROUTES } from '../../constants'

const ERROR_PAGE_LINK = {
  href: ROUTES.MESSENGER,
  text: 'Назад к чатам',
} as const

export const errorPageDataByCode = {
  [ERROR_CODES.NOT_FOUND]: {
    code: ERROR_CODES.NOT_FOUND,
    description: 'Не туда попали',
    link: ERROR_PAGE_LINK,
  },
  [ERROR_CODES.SERVER_ERROR]: {
    code: ERROR_CODES.SERVER_ERROR,
    description: 'Мы уже фиксим',
    link: ERROR_PAGE_LINK,
  },
} as const
