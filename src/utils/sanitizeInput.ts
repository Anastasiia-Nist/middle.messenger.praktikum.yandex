import DOMPurify from 'dompurify'

export function sanitizeInput(value: string): string {
  return DOMPurify.sanitize(value, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  })
}
