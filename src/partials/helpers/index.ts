import Handlebars from 'handlebars'

export const registerHelpers = (): void => {
  Handlebars.registerHelper('eq', (value, expected) => value === expected)
}
