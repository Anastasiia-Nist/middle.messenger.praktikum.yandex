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

Поток данных: `main.ts` → `Router` (History API) → **Controller** → **View** (страница `Block`) → при необходимости **Model** (сервис).

| Слой | Где в `src/` | Роль |
|------|--------------|------|
| **View** | `components/`, `pages/`, `system/Block.ts` | Отрисовка UI: классы `extends Block`, шаблоны `.hbs`, стили |
| **Controller** | `controllers/` | Создание страницы, обработчики событий, связь View и Model |
| **Model** | `services/` | Бизнес-логика без DOM (`FormService`, `ChatService`) |


### Структура `src/`

```
src/
├── main.ts              # Точка входа: регистрация, роутинг, монтирование в #app
├── base.css, styles.css # Глобальные стили
├── system/              # Ядро View: Block, registerComponents, Router
│   └── router/          # Классы Route, Router и регистрация маршрутов
├── controllers/         # Controller: контроллеры страниц
├── services/            # Model: работа с данными и формами
├── pages/               # View: страницы приложения (Block + template + data)
├── components/          # View: компоненты
│   ├── ui/              # Атомарные компоненты (Button, Form, Input…)
│   ├── pages/           # Составные блоки конкретных страниц (сайдбары)
│   └── layouts/         # Обёртки разметки (layout, page)
├── helpers/             # Хелперы
│   ├── register/        # Регистрация компонентов
│   └── validation/      # Проверка полей форм
├── constants/           # Константы (селекторы, правила валидации)
├── types/               # Общие TypeScript-типы
└── public/              # Статические файлы (иконки, изображения)
```

### Добавление UI-компонента

1. Класс `extends Block` в `components/ui/<name>/`
2. `static componentName`, шаблон `.hbs`, стили
3. Импорт и `registerComponent()` в `system/registerComponents.ts`
4. В шаблоне: `{{{ ComponentName key=value }}}`

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
