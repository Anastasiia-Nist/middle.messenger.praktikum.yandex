import { ROUTES } from '../../constants'

export const settingsPageData = {
  backHref: ROUTES.MESSENGER,
  backAriaLabel: 'Назад к чатам',
  displayName: '',
  passwordFormVisible: false,
  profileForm: {
    name: 'profile-info',
    disabled: true,
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
    actions: undefined,
    formClass: 'page-profile__form',
  },
  passwordForm: {
    name: 'change-password',
    disabled: false,
    fields: [
      {
        id: 'oldPassword',
        name: 'oldPassword',
        label: 'Старый пароль',
        type: 'password',
        autocomplete: 'current-password',
      },
      {
        id: 'newPassword',
        name: 'newPassword',
        label: 'Новый пароль',
        type: 'password',
        autocomplete: 'new-password',
      },
    ],
    actions: undefined,
    formClass: 'page-profile__form page-profile__form-password',
  },
}
