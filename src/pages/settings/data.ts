import { profileValuesMock } from '../../mock/profile/values'

const getProfileValue = (name: string): string => profileValuesMock[name] ?? ''

export const settingsPageData = {
  profileForm: {
    disabled: true,
    fields: [
      {
        id: 'first_name',
        name: 'first_name',
        label: 'Имя',
        type: 'text',
        value: getProfileValue('first_name'),
      },
      {
        id: 'second_name',
        name: 'second_name',
        label: 'Фамилия',
        type: 'text',
        value: getProfileValue('second_name'),
      },
      {
        id: 'display_name',
        name: 'display_name',
        label: 'Имя в чате',
        type: 'text',
        value: getProfileValue('display_name'),
      },
      {
        id: 'login',
        name: 'login',
        label: 'Логин',
        type: 'text',
        value: getProfileValue('login'),
      },
      {
        id: 'email',
        name: 'email',
        label: 'Email',
        type: 'email',
        value: getProfileValue('email'),
      },
      {
        id: 'phone',
        name: 'phone',
        label: 'Телефон',
        type: 'tel',
        value: getProfileValue('phone'),
      },
    ],
    formClass: 'page-profile__form',
  },
}
