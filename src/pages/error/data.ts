export const ERROR_CODES = ['404', '500'] as const

export type ErrorCode = (typeof ERROR_CODES)[number]

export const errorPageDataByCode: Record<
  ErrorCode,
  {
    code: ErrorCode
    description: string
    link: {
      href: string
      text: string
    }
  }
> = {
  '404': {
    code: '404',
    description: 'Не туда попали',
    link: {
      href: '#/',
      text: 'Назад к чатам',
    },
  },
  '500': {
    code: '500',
    description: 'Мы уже фиксим',
    link: {
      href: '#/',
      text: 'Назад к чатам',
    },
  },
}
