import { ACTIONS, type ChatMenuAction } from '../../../../constants'

export function buildMenuItems(activeChatId: number | null): Array<{
  id: ChatMenuAction
  label: string
  disabled?: boolean
  danger?: boolean
}> {
  const isChatSelected = activeChatId !== null

  return [
    {
      id: ACTIONS.CHAT_MENU.CREATE,
      label: 'Создать чат'
     },
    {
       id: ACTIONS.CHAT_MENU.ADD_USER,
       label: 'Добавить пользователя',
       disabled: !isChatSelected
      },
    {
      id: ACTIONS.CHAT_MENU.REMOVE_USER,
      label: 'Удалить пользователя',
      disabled: !isChatSelected
    },
    {
      id: ACTIONS.CHAT_MENU.DELETE_CHAT,
      label: 'Удалить чат',
      disabled: !isChatSelected,
      danger: true,
    },
  ]
}
