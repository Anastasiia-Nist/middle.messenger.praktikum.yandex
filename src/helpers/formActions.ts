import type { FormActionConfig } from '../components/ui/form/types'

const CANCEL_BUTTON_CLASS = 'button_stretch_full button_color_danger button_border_danger'

export function createSubmitCancelActions(
  cancelAction: string,
  submitText = 'Сохранить',
): FormActionConfig[] {
  return [
    {
      type: 'submit',
      text: submitText,
      buttonClass: 'button_stretch_full',
    },
    {
      type: 'button',
      text: 'Отмена',
      buttonClass: CANCEL_BUTTON_CLASS,
      action: cancelAction,
    },
  ]
}
