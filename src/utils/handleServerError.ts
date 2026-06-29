type ServerErrorHandler = () => void

let serverErrorHandler: ServerErrorHandler | null = null

export function setServerErrorHandler(handler: ServerErrorHandler): void {
  serverErrorHandler = handler
}

export function handleServerError(): void {
  serverErrorHandler?.()
}
