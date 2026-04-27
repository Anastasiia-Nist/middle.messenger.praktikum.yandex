import Handlebars from 'handlebars'
import { chatsPageData } from '../pages/chats/data'
import chatsTemplateSource from '../pages/chats/template.hbs?raw'
import { error404PageData } from '../pages/error-404/data'
import error404TemplateSource from '../pages/error-404/template.hbs?raw'
import { error500PageData } from '../pages/error-500/data'
import error500TemplateSource from '../pages/error-500/template.hbs?raw'
import { homePageData } from '../pages/home/data'
import homeTemplateSource from '../pages/home/template.hbs?raw'
import { settingsPageData } from '../pages/settings/data'
import settingsTemplateSource from '../pages/settings/template.hbs?raw'
import { signInPageData } from '../pages/sign-in/data'
import signInTemplateSource from '../pages/sign-in/template.hbs?raw'
import { signUpPageData } from '../pages/sign-up/data'
import signUpTemplateSource from '../pages/sign-up/template.hbs?raw'

type TemplateContext = Record<string, unknown>

type RouteConfig = {
  templateSource: string
  data: TemplateContext
}

const routes: Record<string, RouteConfig> = {
  '/': {
    templateSource: homeTemplateSource,
    data: homePageData,
  },
  '/sign-in': {
    templateSource: signInTemplateSource,
    data: signInPageData,
  },
  '/sign-up': {
    templateSource: signUpTemplateSource,
    data: signUpPageData,
  },
  '/chats': {
    templateSource: chatsTemplateSource,
    data: chatsPageData,
  },
  '/settings': {
    templateSource: settingsTemplateSource,
    data: settingsPageData,
  },
  '/404': {
    templateSource: error404TemplateSource,
    data: error404PageData,
  },
  '/500': {
    templateSource: error500TemplateSource,
    data: error500PageData,
  },
}

export const renderCurrentRoute = (): HTMLElement => {
  const path = window.location.hash.slice(1) || '/'
  const route = routes[path] ?? routes['/404']
  const templateSource = route.templateSource
  const template = Handlebars.compile(templateSource)
  const fragment = document.createRange().createContextualFragment(template(route.data))
  const page = fragment.firstElementChild

  if (!page) {
    throw new Error('Шаблон страницы не содержит корневого HTML-элемента')
  }

  return page as HTMLElement
}
