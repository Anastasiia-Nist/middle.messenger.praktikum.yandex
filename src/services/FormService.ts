import type { FormData } from '../components/ui/form/types'
import { sanitizeInput } from '../utils/sanitizeInput'

const PASSWORD_FIELDS = new Set(['password', 'oldPassword', 'newPassword'])

export default class FormService {
  collect<TData extends FormData = FormData>(form: HTMLFormElement): TData {
    const result: FormData = {}
    const elements = Array.from(form)

    elements.forEach((element) => {
      if (!(element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement)) {
        return
      }

      if (!element.name || element.disabled) {
        return
      }

      if (element instanceof HTMLInputElement && element.type === 'checkbox') {
        result[element.name] = element.checked
        return
      }

      result[element.name] = PASSWORD_FIELDS.has(element.name)
        ? element.value
        : sanitizeInput(element.value)
    })

    return result as TData
  }
}
