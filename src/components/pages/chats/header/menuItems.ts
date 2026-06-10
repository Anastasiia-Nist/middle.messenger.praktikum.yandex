import { ACTIONS, type ChatMenuAction } from '../../../../constants'

export function buildMenuItems(activeChatId: number | null): Array<{
  id: ChatMenuAction
  label: string
  disabled?: boolean
}> {
  const isChatSelected = activeChatId !== null

  return [
    { id: ACTIONS.CHAT_MENU.CREATE, label: 'Создать чат' },
    { id: ACTIONS.CHAT_MENU.ADD_USER, label: 'Добавить пользователя', disabled: !isChatSelected },
    { id: ACTIONS.CHAT_MENU.REMOVE_USER, label: 'Удалить пользователя', disabled: !isChatSelected },
  ]
}
