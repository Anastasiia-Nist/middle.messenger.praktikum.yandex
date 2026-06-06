import type { ROUTES } from '../constants/routes'

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES]
