import type { FormFieldConfig, FormData } from '../../components/ui/form/types'
import { ACTIONS, resolveResourceUrl, ROUTES } from '../../constants'
import { createSubmitCancelActions } from '../../helpers/formActions'
import { settingsPageData } from '../../pages/settings/data'
import SettingsPage from '../../pages/settings/SettingsPage'
import type { SettingsPageProps } from '../../pages/settings/types'
import { router } from '../../routes'
import { authService } from '../../services/AuthService'
import { userService } from '../../services/UserService'
import type { ChangePasswordRequest, UserUpdateRequest } from '../../types/user'
import RouteController from '../RouteController'

export default class SettingsController extends RouteController<SettingsPage> {
  private profileFields: FormFieldConfig[] = [...settingsPageData.profileForm.fields]

  private isProfileEditing = false

  private isPasswordFormVisible = false

  render(): HTMLElement {
    const element = this.renderPage(
      new SettingsPage(this.buildPageProps()),
      'SettingsPage',
    )

    void this.loadProfile()

    return element
  }

  private buildPageProps(): SettingsPageProps {
    return {
      ...settingsPageData,
      changeAvatarAction: ACTIONS.SETTINGS.CHANGE_AVATAR,
      editProfileAction: ACTIONS.SETTINGS.EDIT_PROFILE,
      editPasswordAction: ACTIONS.SETTINGS.EDIT_PASSWORD,
      logoutAction: ACTIONS.SETTINGS.LOGOUT,
      passwordFormVisible: this.isPasswordFormVisible,
      profileForm: this.buildProfileFormProps(),
      passwordForm: this.buildPasswordFormProps(),
      onEditProfile: () => {
        this.enableProfileEdit()
      },
      onCancelProfile: () => {
        this.disableProfileEdit()
      },
      onEditPassword: () => {
        this.enablePasswordEdit()
      },
      onCancelPassword: () => {
        this.disablePasswordEdit()
      },
      onLogout: () => {
        void this.handleLogout()
      },
      onAvatarChange: (file: File) => this.handleAvatarChange(file),
    }
  }

  private buildProfileFormProps() {
    return {
      ...settingsPageData.profileForm,
      fields: this.profileFields,
      disabled: !this.isProfileEditing,
      actions: this.isProfileEditing
        ? createSubmitCancelActions(ACTIONS.SETTINGS.CANCEL_PROFILE)
        : undefined,
      onSubmit: (data: FormData) => this.handleProfileSubmit(data),
    }
  }

  private buildPasswordFormProps() {
    return {
      ...settingsPageData.passwordForm,
      actions: this.isPasswordFormVisible
        ? createSubmitCancelActions(ACTIONS.SETTINGS.CANCEL_PASSWORD)
        : undefined,
      onSubmit: (data: FormData) => this.handlePasswordSubmit(data),
    }
  }

  private updatePage(): void {
    this.page?.setProps(this.buildPageProps())
  }

  private enableProfileEdit(): void {
    if (this.isProfileEditing) {
      return
    }

    this.isProfileEditing = true
    this.disablePasswordEditState()
    this.updatePage()
  }

  private disableProfileEdit(): void {
    this.isProfileEditing = false
    this.updatePage()
  }

  private enablePasswordEdit(): void {
    if (this.isPasswordFormVisible) {
      return
    }

    this.isProfileEditing = false
    this.isPasswordFormVisible = true
    this.updatePage()
  }

  private disablePasswordEdit(): void {
    this.isPasswordFormVisible = false
    this.updatePage()
  }

  private disablePasswordEditState(): void {
    this.isPasswordFormVisible = false
  }

  private async loadProfile(): Promise<void> {
    try {
      const user = await authService.getUser()

      this.profileFields = userService.mapUserToProfileFields(user, this.profileFields)

      this.page?.setProps({
        displayName: user.display_name,
        avatarSrc: user.avatar ? resolveResourceUrl(user.avatar) : undefined,
        profileForm: this.buildProfileFormProps(),
      })
    } catch (error) {
      console.error(error)
    }
  }

  private async handleProfileSubmit(data: FormData): Promise<void> {
    try {
      const user = await userService.updateProfile(data as UserUpdateRequest)

      this.profileFields = userService.mapUserToProfileFields(user, this.profileFields)
      this.isProfileEditing = false

      this.page?.setProps({
        displayName: user.display_name,
        profileForm: this.buildProfileFormProps(),
      })
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  private async handlePasswordSubmit(data: FormData): Promise<void> {
    try {
      await userService.changePassword(data as ChangePasswordRequest)
      this.isPasswordFormVisible = false
      this.updatePage()
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
