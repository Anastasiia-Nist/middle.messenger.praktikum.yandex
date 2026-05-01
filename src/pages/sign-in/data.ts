export const signInPageData = {
  title: 'Вход',
  form: {
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
        text: 'Войти',
      },
    ],
  },
  redirectLink: {
    href: '#/sign-up',
    text: 'Зарегистрироваться',
  },
}
