import type { ChatDayGroup, ChatMessageItem } from '../../types/chats-page'
import type { WsMessage } from '../../types/message'
import { formatDayLabel, formatMessageTime } from '../../utils/formatDateTime'

export function mapWsMessageToItem(message: WsMessage, currentUserId: number | null): ChatMessageItem {
  return {
    text: message.content,
    time: formatMessageTime(message.time),
    isOwn: currentUserId !== null && Number(message.user_id) === currentUserId,
  }
}

export function groupMessagesByDay(
  messages: WsMessage[],
  currentUserId: number | null,
): ChatDayGroup[] {
  const sorted = [...messages].sort(
    (left, right) => new Date(left.time).getTime() - new Date(right.time).getTime(),
  )

  const groups: ChatDayGroup[] = []
  const groupIndexByDate = new Map<string, number>()

  sorted.forEach((message) => {
    const dateKey = new Date(message.time).toDateString()
    const item = mapWsMessageToItem(message, currentUserId)
    const existingIndex = groupIndexByDate.get(dateKey)

    if (existingIndex === undefined) {
      groupIndexByDate.set(dateKey, groups.length)
      groups.push({
        date: formatDayLabel(message.time),
        messages: [item],
      })

      return
    }

    groups[existingIndex].messages.push(item)
  })

  return groups
}
