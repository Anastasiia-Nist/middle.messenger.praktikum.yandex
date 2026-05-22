import Handlebars from 'handlebars'

export const registerHandlebarsHelpers = (): void => {
  Handlebars.registerHelper('eq', (value, expected) => value === expected)
}
