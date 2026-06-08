export type User = {
  id: number
  first_name: string
  second_name: string
  display_name: string
  phone: string
  login: string
  avatar: string
  email: string
}

export type SignInRequest = {
  login: string
  password: string
}

export type SignUpRequest = {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

export type SignUpResponse = {
  id: number
}

export type UserUpdateRequest = {
  first_name?: string
  second_name?: string
  display_name?: string
  login?: string
  email?: string
  phone?: string
}

export type ChangePasswordRequest = {
  oldPassword: string
  newPassword: string
}

export type FindUserRequest = {
  login: string
}
