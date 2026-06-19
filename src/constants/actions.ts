export const ACTIONS = {
  MODAL_CLOSE: 'modal-close',
  MODAL_CANCEL: 'modal-cancel',
  DELETE_CHAT_CONFIRM: 'delete-chat-confirm',
  DROPDOWN_TOGGLE: 'dropdown-toggle',
  CHAT_MENU: {
    CREATE: 'create-chat',
    ADD_USER: 'add-user',
    REMOVE_USER: 'remove-user',
    DELETE_CHAT: 'delete-chat',
  },
  SETTINGS: {
    EDIT_PROFILE: 'edit-profile',
    CANCEL_PROFILE: 'cancel-profile',
    EDIT_PASSWORD: 'edit-password',
    CANCEL_PASSWORD: 'cancel-password',
    LOGOUT: 'logout',
    CHANGE_AVATAR: 'change-avatar',
  },
} as const

export type ChatMenuAction =
  (typeof ACTIONS.CHAT_MENU)[keyof typeof ACTIONS.CHAT_MENU]

export const chatUserActionPrefix = {
  add: 'add-user-',
  remove: 'remove-user-',
} as const

export function chatUserAction(type: 'add' | 'remove', id: number): string {
  return `${chatUserActionPrefix[type]}${id}`
}

export function parseChatUserAction(
  action: string,
  type: 'add' | 'remove',
): number | null {
  const prefix = chatUserActionPrefix[type]

  if (!action.startsWith(prefix)) {
    return null
  }

  const userId = Number(action.slice(prefix.length))

  return Number.isNaN(userId) ? null : userId
}
