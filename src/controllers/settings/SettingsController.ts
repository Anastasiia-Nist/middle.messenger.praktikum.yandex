import type { FormFieldConfig, FormData } from '../../components/ui/form/types'
import { resolveResourceUrl, ROUTES } from '../../constants'
import { settingsPageData } from '../../pages/settings/data'
import SettingsPage from '../../pages/settings/SettingsPage'
import { router } from '../../routes'
import { authService } from '../../services/AuthService'
import { userService } from '../../services/UserService'
import type { ChangePasswordRequest, UserUpdateRequest } from '../../types/user'
import RouteController from '../RouteController'

export default class SettingsController extends RouteController<SettingsPage> {
  private profileFields: FormFieldConfig[] = [...settingsPageData.profileForm.fields]

  render(): HTMLElement {
    const element = this.renderPage(
      new SettingsPage({
        ...settingsPageData,
        profileForm: {
          ...settingsPageData.profileForm,
          fields: this.profileFields,
          onSubmit: (data: FormData) => this.handleProfileSubmit(data),
        },
        passwordForm: {
          ...settingsPageData.passwordForm,
          onSubmit: (data: FormData) => this.handlePasswordSubmit(data),
        },
        onLogout: () => {
          void this.handleLogout()
        },
        onAvatarChange: (file: File) => this.handleAvatarChange(file),
      }),
      'SettingsPage',
    )

    void this.loadProfile()

    return element
  }

  private async loadProfile(): Promise<void> {
    try {
      const user = await authService.getUser()

      this.profileFields = userService.mapUserToProfileFields(user, this.profileFields)

      this.page?.setProps({
        displayName: user.display_name,
        avatarSrc: user.avatar ? resolveResourceUrl(user.avatar) : undefined,
        profileForm: {
          ...settingsPageData.profileForm,
          fields: this.profileFields,
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  private async handleProfileSubmit(data: FormData): Promise<void> {
    try {
      const user = await userService.updateProfile(data as UserUpdateRequest)

      this.profileFields = userService.mapUserToProfileFields(user, this.profileFields)

      this.page?.setProps({
        displayName: user.display_name,
        profileForm: {
          ...settingsPageData.profileForm,
          fields: this.profileFields,
        },
      })

      await authService.getUser()
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  private async handlePasswordSubmit(data: FormData): Promise<void> {
    try {
      await userService.changePassword(data as ChangePasswordRequest)
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  private async handleAvatarChange(file: File): Promise<void> {
    try {
      const user = await userService.updateAvatar(file)

      this.page?.setProps({
        avatarSrc: user.avatar ? resolveResourceUrl(user.avatar) : undefined,
      })
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  private async handleLogout(): Promise<void> {
    try {
      await authService.logout()
      router.go(ROUTES.SIGN_IN)
    } catch (error) {
      console.error(error)
    }
  }
}
