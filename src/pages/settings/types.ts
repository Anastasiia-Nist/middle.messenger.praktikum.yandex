import type { FormProps } from '../../components/ui/form/types'
import type { BlockOwnProps } from '../../types/block'

export interface SettingsPageProps extends BlockOwnProps {
  title?: string
  backHref: string
  backAriaLabel: string
  displayName: string
  avatarSrc?: string
  profileForm: FormProps
  passwordForm: FormProps
  passwordFormVisible?: boolean
  onLogout?: () => void
  onAvatarChange?: (file: File) => void | Promise<void>
}
