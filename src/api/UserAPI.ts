import { API_BASE } from '../constants/api'
import { BaseApi } from '../system/api/BaseApi'
import HTTPTransport from '../system/api/HTTPTransport'
import type {
  ChangePasswordRequest,
  FindUserRequest,
  User,
  UserUpdateRequest,
} from '../types/user'

const http = new HTTPTransport(`${API_BASE}/user`)

export class UserAPI extends BaseApi {
  updateProfile(data: UserUpdateRequest): Promise<User> {
    return http.put('/profile', { data })
  }

  changePassword(data: ChangePasswordRequest): Promise<void> {
    return http.put('/password', { data })
  }

  updateAvatar(file: File): Promise<User> {
    const formData = new FormData()

    formData.append('avatar', file)

    return http.put('/profile/avatar', { data: formData })
  }

  searchByLogin(data: FindUserRequest): Promise<User[]> {
    return http.post('/search', { data })
  }
}

export const userAPI = new UserAPI()
