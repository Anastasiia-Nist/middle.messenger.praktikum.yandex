import { WS_PING_INTERVAL_MS } from '../../constants/api'

type WsEvent = 'open' | 'message' | 'close' | 'error'

type WsListener = (event?: Event | MessageEvent) => void

export default class WebSocketTransport {
  private socket: WebSocket | null = null

  private pingTimer: ReturnType<typeof setInterval> | null = null

  private readonly listeners = new Map<WsEvent, Set<WsListener>>()

  connect(url: string): void {
    this.close()
    this.socket = new WebSocket(url)

    this.socket.addEventListener('open', (event) => {
      this.startPing()
      this.emit('open', event)
    })

    this.socket.addEventListener('message', (event) => {
      this.emit('message', event)
    })

    this.socket.addEventListener('close', (event) => {
      this.stopPing()
      this.emit('close', event)
    })

    this.socket.addEventListener('error', (event) => {
      this.emit('error', event)
    })
  }

  send(data: Record<string, unknown>): void {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      console.error('WebSocket не открыт')

      return
    }

    this.socket.send(JSON.stringify(data))
  }

  close(): void {
    this.stopPing()

    if (!this.socket) {
      return
    }

    if (
      this.socket.readyState === WebSocket.OPEN
      || this.socket.readyState === WebSocket.CONNECTING
    ) {
      this.socket.close()
    }

    this.socket = null
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
      this.send({ type: 'ping' })
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
