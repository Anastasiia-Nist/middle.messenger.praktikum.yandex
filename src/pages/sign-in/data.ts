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
  footerLink: {
    href: '#/sign-up',
    text: 'Нет аккаунта? Зарегистрироваться',
  },
}
