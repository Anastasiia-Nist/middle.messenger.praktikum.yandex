import type { ChatSidebarItem } from '../../types/chats-page'
import type { Chat } from '../../types/chat'
import { sanitizeInput } from '../../utils/sanitizeInput'
import { formatChatTime } from '../../utils/formatDateTime'

export function mapChatToSidebarItem(chat: Chat, activeChatId: number | null): ChatSidebarItem {
  const isActive = chat.id === activeChatId

  return {
    id: chat.id,
    name: sanitizeInput(chat.title),
    time: chat.last_message ? formatChatTime(chat.last_message.time) : '',
    preview: sanitizeInput(chat.last_message?.content ?? ''),
    unreadCount: isActive ? undefined : (chat.unread_count || undefined),
    isActive,
  }
}
