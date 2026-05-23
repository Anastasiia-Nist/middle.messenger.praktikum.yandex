import type { BlockOwnProps } from '../../types/block'

import type { ErrorCode } from './data'

export interface ErrorPageProps extends BlockOwnProps {
  code: ErrorCode
  description: string
  link: {
    href: string
    text: string
  }
}
