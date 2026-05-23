import type { BlockOwnProps } from '../../../types/block'

export interface Error404PageProps extends BlockOwnProps {
  title: string
  description: string
  link: {
    href: string
    text: string
  }
}
