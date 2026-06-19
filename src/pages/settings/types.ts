import type { FormProps } from '../../components/ui/form/types'
import type { BlockOwnProps } from '../../types/block'

export interface SettingsPageProps extends BlockOwnProps {
  backHref: string
  backAriaLabel: string
  displayName: string
  avatarSrc?: string
  profileForm: FormProps
  passwordForm: FormProps
  passwordFormVisible?: boolean
  changeAvatarAction?: string
  editProfileAction?: string
  editPasswordAction?: string
  logoutAction?: string
  onEditProfile?: () => void
  onCancelProfile?: () => void
  onEditPassword?: () => void
  onCancelPassword?: () => void
  onLogout?: () => void
  onAvatarChange?: (file: File) => void | Promise<void>
}
