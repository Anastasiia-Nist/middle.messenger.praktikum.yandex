import type { BlockOwnProps, ErrorCode } from '../../types'

export interface ErrorPageProps extends BlockOwnProps {
  code: ErrorCode
  description: string
  link: {
    href: string
    text: string
  }
}
