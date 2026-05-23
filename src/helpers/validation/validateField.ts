import {
  VALIDATION_MESSAGES,
  VALIDATION_PATTERNS,
  type ValidationFieldName,
} from '../../constants/validation'

const isValidationFieldName = (name: string): name is ValidationFieldName =>
  name in VALIDATION_MESSAGES

export function validateField(name: string, value: string): string | null {
  if (!isValidationFieldName(name)) {
    return null
  }

  const trimmedValue = value.trim()

  switch (name) {
    case 'first_name':
    case 'second_name':
      return VALIDATION_PATTERNS.NAME.test(trimmedValue) ? null : VALIDATION_MESSAGES[name]
    case 'login':
      return VALIDATION_PATTERNS.LOGIN.test(trimmedValue) ? null : VALIDATION_MESSAGES[name]
    case 'email':
      return VALIDATION_PATTERNS.EMAIL.test(trimmedValue) ? null : VALIDATION_MESSAGES[name]
    case 'password':
      return VALIDATION_PATTERNS.PASSWORD.test(value) ? null : VALIDATION_MESSAGES[name]
    case 'phone':
      return VALIDATION_PATTERNS.PHONE.test(trimmedValue) ? null : VALIDATION_MESSAGES[name]
    case 'message':
      return trimmedValue.length > 0 ? null : VALIDATION_MESSAGES[name]
    default:
      return null
  }
}
