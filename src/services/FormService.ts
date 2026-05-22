export default class FormService {
  collect(form: HTMLFormElement): Record<string, string | boolean> {
    const result: Record<string, string | boolean> = {}
    const elements = Array.from(form.elements) as Array<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >

    elements.forEach((element) => {
      if (!element.name || element.disabled) {
        return
      }

      if (element instanceof HTMLInputElement && element.type === 'checkbox') {
        result[element.name] = element.checked
        return
      }

      if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
        result[element.name] = element.value
      }
    })

    return result
  }

  collectFromRefs(refs: Record<string, Element>): Record<string, string> {
    const result: Record<string, string> = {}

    Object.entries(refs).forEach(([name, element]) => {
      if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
        result[name] = element.value
      }
    })

    return result
  }
}
