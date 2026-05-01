export const signUpPageData = {
  title: 'Регистрация',
  form: {
    fields: [
      {
        id: 'first_name',
        name: 'first_name',
        label: 'Имя',
        type: 'text',
      },
      {
        id: 'second_name',
        name: 'second_name',
        label: 'Фамилия',
        type: 'text',
      },
      {
        id: 'login',
        name: 'login',
        label: 'Логин',
        type: 'text',
      },
      {
        id: 'email',
        name: 'email',
        label: 'Email',
        type: 'email',
      },
      {
        id: 'password',
        name: 'password',
        label: 'Пароль',
        type: 'password',
      },
      {
        id: 'phone',
        name: 'phone',
        label: 'Телефон',
        type: 'tel',
      },
    ],
    actions: [
      {
        type: 'submit',
        text: 'Зарегистрироваться',
      },
    ],
  },
  redirectLink: {
    href: '#/sign-in',
    text: 'Войти',
  },
}
