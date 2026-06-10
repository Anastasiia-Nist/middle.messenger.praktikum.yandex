# Веб мессенджер

Учебный проект Яндекс Практикум: клиентский интерфейс мессенджера (чаты и сообщения).

## Стек

- Node.js 22+
- TypeScript 6
- Vite 6
- PostCSS
- Handlebars
- ESLint 9
- Stylelint 16

## Архитектура (MVC)

Поток данных: `main.ts` → `Router` (History API) → **Controller** → **View** (страница `Block`) → **Model** (сервисы + API).

| Слой | Где в `src/` | Роль |
|------|--------------|------|
| **View** | `pages/`, `components/`, `system/Block.ts` | Отрисовка UI: классы `extends Block`, шаблоны `.hbs`, стили |
| **Controller** | `controllers/` | Состояние страницы, обработчики, связь View и Model |
| **Model** | `services/` | Бизнес-логика без DOM |
| **Transport** | `api/`, `system/api/` | HTTP-клиенты и XHR-транспорт |
| **Routing** | `routes/` | Конфигурация маршрутов приложения |

Контроллер — единственный владелец состояния страницы. View-компоненты «глупые»: получают props и вызывают колбэки.

### Структура `src/`

```
src/
├── main.ts                 # Точка входа: регистрация HB, auth check, SPA-навигация
├── base.css, styles.css
├── routes/                 # Конфигурация Router (маршрут → Controller)
├── system/                 # Ядро: Block, registerComponents, Router, HTTPTransport
├── controllers/            # Controller: контроллеры страниц
├── services/               # Model: AuthService, ChatService, UserService, FormService
├── api/                    # HTTP-клиенты (AuthAPI, ChatAPI, UserAPI)
├── pages/                  # View: страницы (Block + template + data)
├── components/
│   ├── ui/                 # Атомарные компоненты (Button, Form, Modal…)
│   ├── pages/              # Составные блоки страниц (sidebar, header, modals)
│   └── layouts/            # Обёртки разметки (layout, page)
├── helpers/                # formActions, регистрация HB, валидация
├── constants/              # routes, actions, messages, validation, api
├── types/                  # Domain и infra типы
└── utils/                  # renderDOM, api helpers, withApiError
```

### Добавление UI-компонента

1. Класс `extends Block` в `components/ui/<name>/`
2. `static componentName`, шаблон `.hbs`, стили
3. Импорт и `registerComponent()` в `system/registerComponents.ts`
4. В шаблоне: `{{{ ComponentName key=value }}}`

Action-строки кнопок и UI-тексты выносятся в `constants/actions.ts` и `constants/messages.ts`, в шаблоны передаются через props.

## Команды

- `npm install` — установка зависимостей
- `npm run dev` — dev-сервер Vite на порту `3000`
- `npm run start` — production-сборка и preview на порту `3000`
- `npm run preview` — preview уже собранного `dist`
- `npm run typecheck` — проверка типов TypeScript (`tsc --noEmit`)
- `npm run build` — lint (TypeScript, CSS, typecheck) и production-сборка в `dist`
- `npm run lint` — ESLint, Stylelint и typecheck
- `npm run lint:fix` — автоисправление замечаний ESLint и Stylelint
- `npm run format` — форматирование шаблонов `.hbs` (js-beautify)

## Страницы приложения

Маршруты работают через History API: путь указывается в адресной строке (например `http://localhost:3000/settings`).

**Возможно без VPN демо не откроется**

- **Вход:** `/` — [открыть на демо](https://messenger-practicum-yandex-by-nist.netlify.app/)
- **Чаты:** `/messenger` — [открыть на демо](https://messenger-practicum-yandex-by-nist.netlify.app/messenger)
- **Регистрация:** `/sign-up` — [открыть на демо](https://messenger-practicum-yandex-by-nist.netlify.app/sign-up)
- **Настройки профиля:** `/settings` — [открыть на демо](https://messenger-practicum-yandex-by-nist.netlify.app/settings)
- **Ошибка 404:** `/404` — [открыть на демо](https://messenger-practicum-yandex-by-nist.netlify.app/404)
- **Ошибка 500:** `/500` — [открыть на демо](https://messenger-practicum-yandex-by-nist.netlify.app/500)

## Ссылки

- **Демо:** [messenger-practicum-yandex-by-nist.netlify.app](https://messenger-practicum-yandex-by-nist.netlify.app/) — **Возможно без VPN демо не откроется**
- **Figma:** [ссылка на макет](https://www.figma.com/design/jF5fFFzgGOxQeB4CmKWTiE/Chat_external_link?node-id=1-502&t=FRbllHNs6HSSEDlZ-0)
