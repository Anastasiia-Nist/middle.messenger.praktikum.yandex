import type { FormSubmitData } from '../../components/ui/form/types'
import { settingsPageData } from '../../pages/settings/data'
import SettingsPage from '../../pages/settings/SettingsPage'
import RouteController from '../RouteController'

export default class SettingsController extends RouteController<SettingsPage> {
  render(): HTMLElement {
    return this.renderPage(
      new SettingsPage({
        ...settingsPageData,
        profileForm: {
          ...settingsPageData.profileForm,
          onSubmit: (data: FormSubmitData) => console.log(data),
        },
      }),
      'SettingsPage',
    )
  }
}
