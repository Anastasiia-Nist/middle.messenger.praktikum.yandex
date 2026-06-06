import type { ERROR_CODES } from '../constants/errors'

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES]
