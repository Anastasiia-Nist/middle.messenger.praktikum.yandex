import Handlebars from 'handlebars'
import templateSource from './templates/app.hbs?raw'
import './styles.css'

type AppTemplateContext = {
  title: string
  subtitle: string
}

const rootNode = document.querySelector<HTMLDivElement>('#app')

if (!rootNode) {
  throw new Error('rootNode не найден в DOM')
}

const template = Handlebars.compile<AppTemplateContext>(templateSource)

rootNode.innerHTML = template({
title: 'Веб мессенджер',
subtitle: 'Sprint 1: стартовая конфигурация проекта',
})
