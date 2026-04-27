export const settingsPageData = {
  title: 'Профиль',
  profileForm: {
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
        id: 'display_name',
        name: 'display_name',
        label: 'Имя в чате',
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
        id: 'phone',
        name: 'phone',
        label: 'Телефон',
        type: 'tel',
      },
    ],
    actions: [
      {
        type: 'submit',
        text: 'Сохранить профиль',
      },
    ],
  },
  avatarForm: {
    fields: [
      {
        id: 'avatar',
        name: 'avatar',
        label: 'Аватар',
        type: 'file',
      },
    ],
    actions: [
      {
        type: 'submit',
        text: 'Обновить аватар',
      },
    ],
  },
  passwordForm: {
    fields: [
      {
        id: 'old_password',
        name: 'old_password',
        label: 'Старый пароль',
        type: 'password',
      },
      {
        id: 'new_password',
        name: 'new_password',
        label: 'Новый пароль',
        type: 'password',
      },
    ],
    actions: [
      {
        type: 'submit',
        text: 'Изменить пароль',
      },
    ],
  },
}
