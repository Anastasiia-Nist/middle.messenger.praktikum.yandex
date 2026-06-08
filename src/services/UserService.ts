import { userAPI } from '../api'
import type { FormFieldConfig } from '../components/ui/form/types'
import type { ChangePasswordRequest, User, UserUpdateRequest } from '../types/user'
import { parseApiError } from '../utils/api'

class UserService {
  mapUserToProfileFields(user: User, fields: FormFieldConfig[]): FormFieldConfig[] {
    return fields.map((field) => ({
      ...field,
      value: String(user[field.name as keyof User] ?? field.value ?? ''),
    }))
  }

  async updateProfile(data: UserUpdateRequest): Promise<User> {
    try {
      return await userAPI.updateProfile(data)
    } catch (error) {
      throw new Error(parseApiError(error))
    }
  }

  async changePassword(data: ChangePasswordRequest): Promise<void> {
    try {
      await userAPI.changePassword(data)
    } catch (error) {
      throw new Error(parseApiError(error))
    }
  }

  async updateAvatar(file: File): Promise<User> {
    try {
      return await userAPI.updateAvatar(file)
    } catch (error) {
      throw new Error(parseApiError(error))
    }
  }
}

export const userService = new UserService()
