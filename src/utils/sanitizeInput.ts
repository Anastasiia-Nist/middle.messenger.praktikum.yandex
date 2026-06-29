const SCRIPT_BLOCK_PATTERN = /<script\b[^>]*>[\s\S]*?<\/script>/gi
const SCRIPT_TAG_PATTERN = /<\s*\/?\s*script\b[^>]*>/gi
const DANGEROUS_TAG_PATTERN = /<\s*\/?\s*(iframe|object|embed|link|style|meta|base|form)\b[^>]*>/gi
const EVENT_HANDLER_PATTERN = /\s+on\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi
const JAVASCRIPT_URL_PATTERN = /javascript:/gi

export function sanitizeInput(value: string): string {
  return value
    .replace(SCRIPT_BLOCK_PATTERN, '')
    .replace(SCRIPT_TAG_PATTERN, '')
    .replace(DANGEROUS_TAG_PATTERN, '')
    .replace(EVENT_HANDLER_PATTERN, '')
    .replace(JAVASCRIPT_URL_PATTERN, '')
}
