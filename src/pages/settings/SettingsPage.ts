import { ACTIONS, BUTTON_CLICK_EVENT } from '../../constants'
import Block from '../../system/Block'
import { isCustomEventWithStringDetail } from '../../utils/events'
import template from './template.hbs?raw'
import type { SettingsPageProps } from './types'

export default class SettingsPage extends Block<SettingsPageProps> {
  protected template = template

  private readonly actionHandlers: Partial<Record<string, () => void>> = {
    [ACTIONS.SETTINGS.EDIT_PROFILE]: () => this.props.onEditProfile?.(),
    [ACTIONS.SETTINGS.CANCEL_PROFILE]: () => this.props.onCancelProfile?.(),
    [ACTIONS.SETTINGS.EDIT_PASSWORD]: () => this.props.onEditPassword?.(),
    [ACTIONS.SETTINGS.CANCEL_PASSWORD]: () => this.props.onCancelPassword?.(),
    [ACTIONS.SETTINGS.LOGOUT]: () => this.props.onLogout?.(),
  }

  protected events = {
    [BUTTON_CLICK_EVENT]: (event: Event) => {
      if (!isCustomEventWithStringDetail(event, 'action')) {
        return
      }

      this.actionHandlers[event.detail.action]?.()
    },
  }
}
