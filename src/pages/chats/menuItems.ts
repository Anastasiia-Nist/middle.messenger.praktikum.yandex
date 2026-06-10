import type { ChatMenuAction } from '../../components/pages/chats/header/types'

export function buildMenuItems(activeChatId: number | null): Array<{
  id: ChatMenuAction
  label: string
  disabled?: boolean
}> {
  const isChatSelected = activeChatId !== null

  return [
    { id: 'create-chat', label: 'Создать чат' },
    { id: 'add-user', label: 'Добавить пользователя', disabled: !isChatSelected },
    { id: 'remove-user', label: 'Удалить пользователя', disabled: !isChatSelected },
  ]
}
