import type { FormData } from '../components/ui/form/types'

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

      result[element.name] = element.value
    })

    return result as TData
  }
}
