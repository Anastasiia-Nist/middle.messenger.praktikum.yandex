import { WS_PING_INTERVAL_MS } from '../../constants/api'

type WsEvent = 'open' | 'message' | 'close' | 'error'

type WsListener = (event?: Event | MessageEvent) => void

export default class WebSocketTransport {
  private socket: WebSocket | null = null

  private pingTimer: ReturnType<typeof setInterval> | null = null

  private readonly listeners = new Map<WsEvent, Set<WsListener>>()

  connect(url: string): void {
    this.close()

    const socket = new WebSocket(url)
    this.socket = socket

    socket.addEventListener('open', (event) => {
      if (this.socket !== socket) {
        return
      }

      this.startPing()
      this.emit('open', event)
    })

    socket.addEventListener('message', (event) => {
      if (this.socket !== socket) {
        return
      }

      this.emit('message', event)
    })

    socket.addEventListener('close', (event) => {
      if (this.socket !== socket) {
        return
      }

      this.socket = null
      this.stopPing()
      this.emit('close', event)
    })

    socket.addEventListener('error', (event) => {
      if (this.socket !== socket) {
        return
      }

      this.emit('error', event)
    })
  }

  send(data: Record<string, unknown>): void {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      throw new Error('WebSocket не открыт')
    }

    this.socket.send(JSON.stringify(data))
  }

  close(): void {
    this.stopPing()

    const socket = this.socket

    if (!socket) {
      return
    }

    this.socket = null

    if (
      socket.readyState === WebSocket.OPEN
      || socket.readyState === WebSocket.CONNECTING
    ) {
      socket.close()
    }
  }

  isConnecting(): boolean {
    return this.socket?.readyState === WebSocket.CONNECTING
  }

  isOpen(): boolean {
    return this.socket?.readyState === WebSocket.OPEN
  }

  on(event: WsEvent, callback: WsListener): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set())
    }

    this.listeners.get(event)?.add(callback)
  }

  off(event: WsEvent, callback: WsListener): void {
    this.listeners.get(event)?.delete(callback)
  }

  private emit(event: WsEvent, payload?: Event | MessageEvent): void {
    this.listeners.get(event)?.forEach((callback) => {
      callback(payload)
    })
  }

  private startPing(): void {
    this.stopPing()

    this.pingTimer = setInterval(() => {
      try {
        this.send({ type: 'ping' })
      } catch {
        this.stopPing()
      }
    }, WS_PING_INTERVAL_MS)
  }

  private stopPing(): void {
    if (this.pingTimer === null) {
      return
    }

    clearInterval(this.pingTimer)
    this.pingTimer = null
  }
}
