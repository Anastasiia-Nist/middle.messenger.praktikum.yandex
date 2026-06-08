import type { FormActionConfig, FormData, FormProps } from '../../components/ui/form/types'
import { BUTTON_CLICK_EVENT } from '../../constants'
import Block from '../../system/Block'
import { isCustomEventWithStringDetail } from '../../utils/events'
import template from './template.hbs?raw'
import type { SettingsPageProps } from './types'

const PROFILE_FORM_ACTIONS: FormActionConfig[] = [
  {
    type: 'submit',
    text: 'Сохранить',
    buttonClass: 'button_stretch_full',
  },
  {
    type: 'button',
    text: 'Отмена',
    buttonClass: 'button_stretch_full button_color_danger button_border_danger',
    action: 'cancel-profile',
  },
]

const PASSWORD_FORM_ACTIONS: FormActionConfig[] = [
  {
    type: 'submit',
    text: 'Сохранить',
    buttonClass: 'button_stretch_full',
  },
  {
    type: 'button',
    text: 'Отмена',
    buttonClass: 'button_stretch_full button_color_danger button_border_danger',
    action: 'cancel-password',
  },
]

export default class SettingsPage extends Block<SettingsPageProps> {
  protected template = template

  private avatarInput: HTMLInputElement | null = null

  private onProfileSubmit?: (data: FormData) => void | Promise<void>

  private onPasswordSubmit?: (data: FormData) => void | Promise<void>

  constructor(props: SettingsPageProps) {
    const { onSubmit: onProfileSubmit, ...profileForm } = props.profileForm
    const { onSubmit: onPasswordSubmit, ...passwordForm } = props.passwordForm

    super({
      ...props,
      profileForm: {
        ...profileForm,
        onSubmit: (data: FormData) => {
          void this.handleProfileSubmit(data, onProfileSubmit)
        },
      },
      passwordForm: {
        ...passwordForm,
        onSubmit: (data: FormData) => {
          void this.handlePasswordSubmit(data, onPasswordSubmit)
        },
      },
    })

    this.onProfileSubmit = onProfileSubmit
    this.onPasswordSubmit = onPasswordSubmit
  }

  public setProps(props: Partial<SettingsPageProps>) {
    const nextProps = { ...props }

    if (nextProps.profileForm) {
      const { onSubmit, ...profileForm } = nextProps.profileForm

      if (
        onSubmit !== undefined &&
        onSubmit !== this.props.profileForm.onSubmit &&
        onSubmit !== this.onProfileSubmit
      ) {
        this.onProfileSubmit = onSubmit
      }

      nextProps.profileForm = this.wrapProfileForm(profileForm)
    }

    if (nextProps.passwordForm) {
      const { onSubmit, ...passwordForm } = nextProps.passwordForm

      if (
        onSubmit !== undefined &&
        onSubmit !== this.props.passwordForm.onSubmit &&
        onSubmit !== this.onPasswordSubmit
      ) {
        this.onPasswordSubmit = onSubmit
      }

      nextProps.passwordForm = this.wrapPasswordForm(passwordForm)
    }

    super.setProps(nextProps)
  }

  private wrapProfileForm(profileForm: Omit<FormProps, 'onSubmit'>): FormProps {
    return {
      ...profileForm,
      onSubmit: (data: FormData) => {
        void this.handleProfileSubmit(data, this.onProfileSubmit)
      },
    }
  }

  private wrapPasswordForm(passwordForm: Omit<FormProps, 'onSubmit'>): FormProps {
    return {
      ...passwordForm,
      onSubmit: (data: FormData) => {
        void this.handlePasswordSubmit(data, this.onPasswordSubmit)
      },
    }
  }

  protected events = {
    [BUTTON_CLICK_EVENT]: (event: Event) => {
      if (!isCustomEventWithStringDetail(event, 'action')) {
        return
      }

      switch (event.detail.action) {
        case 'edit-profile':
          this.enableProfileEdit()
          break
        case 'cancel-profile':
          this.disableProfileEdit()
          break
        case 'edit-password':
          this.enablePasswordEdit()
          break
        case 'cancel-password':
          this.disablePasswordEdit()
          break
        case 'logout':
          this.props.onLogout?.()
          break
        case 'change-avatar':
          this.openAvatarPicker()
          break
        default:
          break
      }
    },
  }

  private async handleProfileSubmit(
    data: FormData,
    onProfileSubmit?: (data: FormData) => void | Promise<void>,
  ): Promise<void> {
    try {
      await onProfileSubmit?.(data)
      this.disableProfileEdit()
    } catch {
      // Ошибка обработана в контроллере
    }
  }

  private async handlePasswordSubmit(
    data: FormData,
    onPasswordSubmit?: (data: FormData) => void | Promise<void>,
  ): Promise<void> {
    try {
      await onPasswordSubmit?.(data)
      this.disablePasswordEdit()
    } catch {
      // Ошибка обработана в контроллере
    }
  }

  private openAvatarPicker(): void {
    if (!this.avatarInput) {
      this.avatarInput = document.createElement('input')
      this.avatarInput.type = 'file'
      this.avatarInput.accept = 'image/jpeg,image/jpg,image/png,image/gif,image/webp'
      this.avatarInput.style.display = 'none'
      this.avatarInput.addEventListener('change', () => {
        const file = this.avatarInput?.files?.[0]

        if (file) {
          void this.props.onAvatarChange?.(file)
        }

        if (this.avatarInput) {
          this.avatarInput.value = ''
        }
      })
      document.body.appendChild(this.avatarInput)
    }

    this.avatarInput.click()
  }

  private omitFormSubmit<T extends FormProps>(form: T): Omit<T, 'onSubmit'> {
    const { onSubmit, ...formWithoutSubmit } = form
    void onSubmit

    return formWithoutSubmit
  }

  private enableProfileEdit(): void {
    if (!this.props.profileForm.disabled) {
      return
    }

    this.disablePasswordEdit()

    this.setProps({
      profileForm: {
        ...this.omitFormSubmit(this.props.profileForm),
        disabled: false,
        actions: PROFILE_FORM_ACTIONS,
      },
    })
  }

  private disableProfileEdit(): void {
    this.setProps({
      profileForm: {
        ...this.omitFormSubmit(this.props.profileForm),
        disabled: true,
        actions: undefined,
      },
    })
  }

  private enablePasswordEdit(): void {
    if (this.props.passwordFormVisible) {
      return
    }

    this.disableProfileEdit()

    this.setProps({
      passwordFormVisible: true,
      passwordForm: {
        ...this.omitFormSubmit(this.props.passwordForm),
        actions: PASSWORD_FORM_ACTIONS,
      },
    })
  }

  private disablePasswordEdit(): void {
    this.setProps({
      passwordFormVisible: false,
      passwordForm: {
        ...this.omitFormSubmit(this.props.passwordForm),
        actions: undefined,
      },
    })
  }
}
