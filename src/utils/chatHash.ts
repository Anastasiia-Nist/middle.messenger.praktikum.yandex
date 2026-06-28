export function parseChatHash(): number | null {
  const raw = window.location.hash.slice(1)

  if (!raw) {
    return null
  }

  const chatId = Number(raw)

  return Number.isNaN(chatId) ? null : chatId
}

export function setChatHash(chatId: number): void {
  const nextHash = `#${chatId}`

  if (window.location.hash === nextHash) {
    return
  }

  window.location.hash = String(chatId)
}

export function clearChatHash(): void {
  if (!window.location.hash) {
    return
  }

  window.location.hash = ''
}

export function replaceChatHashSilently(): void {
  if (!window.location.hash) {
    return
  }

  window.history.replaceState(null, '', window.location.pathname)
}
