import type { BlockOwnProps } from '../../../types/block'

export interface Error500PageProps extends BlockOwnProps {
  title: string
  description: string
  link: {
    href: string
    text: string
  }
}
