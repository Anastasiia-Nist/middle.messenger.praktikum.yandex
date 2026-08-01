# Веб мессенджер

Учебный проект Яндекс Практикум: клиентский интерфейс мессенджера с авторизацией, управлением чатами и обменом сообщениями в реальном времени через WebSocket.

## Стек

- Node.js 22+
- TypeScript 6
- Vite 6
- PostCSS
- Handlebars
- ESLint 9
- Stylelint 16
- Vitest 3 + jsdom
- Husky + Commitlint (pre-commit lint, conventional commits)

## Функциональность

- **Авторизация** — вход, регистрация, проверка сессии при старте приложения
- **Профиль** — просмотр и редактирование данных, смена пароля, загрузка аватара, выход
- **Чаты** — список чатов, создание, удаление, добавление и удаление участников
- **Сообщения** — отправка и получение в реальном времени через WebSocket, подгрузка истории, группировка по дням
- **Навигация** — SPA на History API; активный чат хранится в hash (`/messenger#123`)

## Архитектура (MVC)

Поток данных: `main.ts` → `Router` (History API) → **Controller** → **View** (страница `Block`) → **Model** (сервисы + API).

| Слой | Где в `src/` | Роль |
|------|--------------|------|
| **View** | `pages/`, `components/`, `system/Block.ts` | Отрисовка UI: классы `extends Block`, шаблоны `.hbs`, стили |
| **Controller** | `controllers/` | Состояние страницы, обработчики, связь View и Model |
| **Model** | `services/` | Бизнес-логика без DOM |
| **Transport** | `api/`, `system/api/` | HTTP- и WebSocket-транспорт |
| **Routing** | `routes/` | Конфигурация маршрутов приложения |

Контроллер — единственный владелец состояния страницы. View-компоненты «глупые»: получают props и вызывают колбэки.

### Структура `src/`

```
src/
├── main.ts                 # Точка входа: регистрация HB, auth check, SPA-навигация
├── base.css, styles.css
├── routes/                 # Конфигурация Router (маршрут → Controller)
├── system/                 # Ядро: Block, registerComponents, Router, HTTP/WebSocket transport
├── controllers/            # Controller: контроллеры страниц
├── services/               # Model: AuthService, ChatService, MessageService, UserService, FormService
├── api/                    # HTTP-клиенты (AuthAPI, ChatAPI, UserAPI)
├── pages/                  # View: страницы (Block + template + data)
├── components/
│   ├── ui/                 # Атомарные компоненты (Button, Form, Modal…)
│   ├── pages/              # Составные блоки страниц (sidebar, header, modals)
│   └── layouts/            # Обёртки разметки (layout, page)
├── helpers/                # formActions, регистрация HB, валидация, маппинг чатов/сообщений
├── partials/               # Handlebars partials и их регистрация
├── constants/              # routes, actions, messages, validation, api
├── types/                  # Domain и infra типы
└── utils/                  # renderDOM, api helpers, withApiError, sanitizeInput, formatDateTime, chatHash
```

### Добавление UI-компонента

1. Класс `extends Block` в `components/ui/<name>/`
2. `static componentName`, шаблон `.hbs`, стили
3. Импорт и `registerComponent()` в `system/registerComponents.ts`
4. В шаблоне: `{{{ ComponentName key=value }}}`

Action-строки кнопок и UI-тексты выносятся в `constants/actions.ts` и `constants/messages.ts`, в шаблоны передаются через props.

## Команды

- `npm install` — установка зависимостей
- `npm run dev` — dev-сервер Vite на порту `3000` (с прокси `/api/v2` и `/ws`)
- `npm run start` — production-сборка и preview на порту `3000`
- `npm run preview` — preview уже собранного `dist`
- `npm run typecheck` — проверка типов TypeScript (`tsc --noEmit`)
- `npm run build` — lint (TypeScript, CSS, typecheck) и production-сборка в `dist`
- `npm run lint` — ESLint, Stylelint и typecheck
- `npm run lint:fix` — автоисправление замечаний ESLint и Stylelint
- `npm run test` — однократный прогон unit-тестов (Vitest)
- `npm run test:watch` — тесты в watch-режиме

## Тестирование

Unit-тесты на **Vitest** с окружением **jsdom** (конфигурация в `vite.config.ts`).

| Область | Файлы |
|---------|-------|
| UI-компоненты | `Button`, `Form`, `Input`, `Modal` в `components/ui/` |
| HTTP-транспорт | `system/api/HTTPTransport.test.ts` |
| Роутинг | `system/router/Router.test.ts`, `Route.test.ts` |

UI-компоненты проверяются через инстанс `Block`: рендер, props, события. Для HTTP и роутера используются моки (`vi.mock`, `MockXHR`).

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
- **API (Swagger):** [ya-praktikum.tech/api/v2/swagger](https://ya-praktikum.tech/api/v2/swagger/#/)
- **WebSocket API:** [ya-praktikum.tech/api/v2/openapi/ws](https://ya-praktikum.tech/api/v2/openapi/ws)
