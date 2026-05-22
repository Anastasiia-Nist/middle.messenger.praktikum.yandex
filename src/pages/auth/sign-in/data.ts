export const signInPageData = {
  form: {
    name: 'sign-in',
    fields: [
      {
        id: 'login',
        name: 'login',
        label: 'Логин',
        type: 'text',
      },
      {
        id: 'password',
        name: 'password',
        label: 'Пароль',
        type: 'password',
      },
    ],
    actions: [
      {
        type: 'submit',
        text: 'Авторизоваться',
        buttonClass: 'button_stretch_full',
      },
    ],
    formClass: 'page-auth__form',
  },
  redirectLink: {
    href: '#/sign-up',
    text: 'Нет аккаунта?',
  },
}
