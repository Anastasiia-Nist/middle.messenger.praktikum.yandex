import { LOCALE, TODAY_LABEL, YESTERDAY_LABEL } from '../constants'

const timeFormatter = new Intl.DateTimeFormat(LOCALE, { hour: '2-digit', minute: '2-digit' })
const weekdayFormatter = new Intl.DateTimeFormat(LOCALE, { weekday: 'short' })
const dayFormatter = new Intl.DateTimeFormat(LOCALE, {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

function parseValidDate(time: string): Date | null {
  const date = new Date(time)

  return Number.isNaN(date.getTime()) ? null : date
}

function dayOffset(date: Date, now = new Date()): number {
  const dateUtc = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  const nowUtc = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())

  return Math.round((dateUtc - nowUtc) / 86_400_000)
}

export function formatMessageTime(time: string): string {
  const date = parseValidDate(time)

  return date ? timeFormatter.format(date) : time
}

export function formatChatTime(time: string): string {
  const date = parseValidDate(time)

  if (!date) {
    return time
  }

  const offset = dayOffset(date)

  if (offset === 0) {
    return timeFormatter.format(date)
  }

  if (offset === -1) {
    return YESTERDAY_LABEL
  }

  return weekdayFormatter.format(date)
}

export function formatDayLabel(time: string): string {
  const date = parseValidDate(time)

  if (!date) {
    return time
  }

  const offset = dayOffset(date)

  if (offset === 0) {
    return TODAY_LABEL
  }

  if (offset === -1) {
    return YESTERDAY_LABEL
  }

  return dayFormatter.format(date)
}
