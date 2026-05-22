# Веб мессенджер

Учебный проект Яндекс Практикум: клиентский интерфейс мессенджера (чаты и сообщения).

## Стек

- TypeScript 5+
- Vite
- PostCSS
- Handlebars
- ESLint
- Stylelint

## Архитектура (MVC)

- **View** — базовый класс `Block` и компоненты/страницы (`Title`, `Form`, `ChatsPage` и т.д.), шаблоны Handlebars
- **Model** — сервисы в `src/services/` (`FormService`, `ChatService`)
- **Controller** — `src/controllers/`, связывают View и Model; роутер создаёт контроллер на маршрут

Добавление UI-компонента: класс `extends Block` → `static componentName` → `registerComponent()` в `src/app/registerComponents.ts` → `{{{ ComponentName ... }}}` в шаблоне.

## Команды

- `npm install` — установка зависимостей
- `npm run start` — запуск dev-сервера на порту `3000`
- `npm run typecheck` — проверка типов TypeScript (`tsc --noEmit`)
- `npm run build` — typecheck + production-сборка в `dist`
- `npm run lint` — проверка TypeScript и CSS линтерами

## Страницы приложения

Маршруты работают через hash: в адресе после `#` указывается путь (например `http://localhost:3000/#/settings` или тот же путь на демо-домене).

**без VPN демо не открывается**

- **Чаты:** `/`, `/chats` — [открыть на демо](https://messenger-practicum-yandex-by-nist.netlify.app/#/)
- **Вход:** `/sign-in` — [открыть на демо](https://messenger-practicum-yandex-by-nist.netlify.app/#/sign-in)
- **Регистрация:** `/sign-up` — [открыть на демо](https://messenger-practicum-yandex-by-nist.netlify.app/#/sign-up)
- **Настройки профиля:** `/settings` — [открыть на демо](https://messenger-practicum-yandex-by-nist.netlify.app/#/settings)
- **Ошибка 404:** `/404` — [открыть на демо](https://messenger-practicum-yandex-by-nist.netlify.app/#/404)
- **Ошибка 500:** `/500` — [открыть на демо](https://messenger-practicum-yandex-by-nist.netlify.app/#/500)

## Ссылки

- **Демо:** [messenger-practicum-yandex-by-nist.netlify.app](https://messenger-practicum-yandex-by-nist.netlify.app/) — **без VPN демо не открывается**
- **Figma:** [ссылка на макет](https://www.figma.com/design/jF5fFFzgGOxQeB4CmKWTiE/Chat_external_link?node-id=1-502&t=FRbllHNs6HSSEDlZ-0)
