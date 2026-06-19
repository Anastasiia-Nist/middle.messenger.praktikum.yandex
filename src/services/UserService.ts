import { userAPI } from '../api'
import type { FormFieldConfig } from '../components/ui/form/types'
import type { ChangePasswordRequest, User, UserUpdateRequest } from '../types/user'
import { withApiError } from '../utils/withApiError'

class UserService {
  mapUserToProfileFields(user: User, fields: FormFieldConfig[]): FormFieldConfig[] {
    return fields.map((field) => ({
      ...field,
      value: String(user[field.name as keyof User] ?? field.value ?? ''),
    }))
  }

  async updateProfile(data: UserUpdateRequest): Promise<User> {
    return withApiError(() => userAPI.updateProfile(data))
  }

  async changePassword(data: ChangePasswordRequest): Promise<void> {
    await withApiError(() => userAPI.changePassword(data))
  }

  async updateAvatar(file: File): Promise<User> {
    return withApiError(() => userAPI.updateAvatar(file))
  }

  async searchByLogin(login: string): Promise<User[]> {
    return withApiError(() => userAPI.searchByLogin({ login }))
  }
}

export const userService = new UserService()
