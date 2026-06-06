import { VALIDATION_MESSAGES, VALIDATION_PATTERNS } from '../../constants'
import type { ValidationFieldName } from '../../types'

type ValidationRule = {
  pattern?: RegExp
  required?: boolean
}

const FIELD_RULES: Record<ValidationFieldName, ValidationRule> = {
  first_name: { pattern: VALIDATION_PATTERNS.NAME },
  second_name: { pattern: VALIDATION_PATTERNS.NAME },
  display_name: { required: true },
  login: { pattern: VALIDATION_PATTERNS.LOGIN },
  email: { pattern: VALIDATION_PATTERNS.EMAIL },
  password: { pattern: VALIDATION_PATTERNS.PASSWORD },
  oldPassword: { required: true },
  newPassword: { pattern: VALIDATION_PATTERNS.PASSWORD },
  phone: { pattern: VALIDATION_PATTERNS.PHONE },
  message: { required: true },
}

const isValidationFieldName = (name: string): name is ValidationFieldName =>
  name in VALIDATION_MESSAGES

export function validateFieldValue(name: string, value: string): string | null {
  if (!isValidationFieldName(name)) {
    return null
  }

  const trimmedValue = value.trim()
  const rule = FIELD_RULES[name]

  if (rule.required) {
    return trimmedValue.length > 0 ? null : VALIDATION_MESSAGES[name]
  }

  if (rule.pattern) {
    return rule.pattern.test(trimmedValue) ? null : VALIDATION_MESSAGES[name]
  }

  return null
}
