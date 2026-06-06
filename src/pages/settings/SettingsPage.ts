import type { FormActionConfig, FormSubmitData } from '../../components/ui/form/types'
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

  constructor(props: SettingsPageProps) {
    const { onSubmit: onProfileSubmit, ...profileForm } = props.profileForm
    const { onSubmit: onPasswordSubmit, ...passwordForm } = props.passwordForm

    super({
      ...props,
      profileForm: {
        ...profileForm,
        onSubmit: (data: FormSubmitData) => {
          onProfileSubmit?.(data)
          this.disableProfileEdit()
        },
      },
      passwordForm: {
        ...passwordForm,
        onSubmit: (data: FormSubmitData) => {
          onPasswordSubmit?.(data)
          this.disablePasswordEdit()
        },
      },
    })
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
        default:
          break
      }
    },
  }

  private enableProfileEdit(): void {
    if (!this.props.profileForm.disabled) {
      return
    }

    this.disablePasswordEdit()

    this.setProps({
      profileForm: {
        ...this.props.profileForm,
        disabled: false,
        actions: PROFILE_FORM_ACTIONS,
      },
    })
  }

  private disableProfileEdit(): void {
    this.setProps({
      profileForm: {
        ...this.props.profileForm,
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
        ...this.props.passwordForm,
        actions: PASSWORD_FORM_ACTIONS,
      },
    })
  }

  private disablePasswordEdit(): void {
    this.setProps({
      passwordFormVisible: false,
      passwordForm: {
        ...this.props.passwordForm,
        actions: undefined,
      },
    })
  }
}
