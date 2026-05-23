export default class FormService {
  collect(form: HTMLFormElement): Record<string, string | boolean> {
    const result: Record<string, string | boolean> = {}
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

    return result
  }
}
