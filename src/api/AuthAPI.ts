import { API_BASE } from '../constants/api'
import { BaseApi } from '../system/api/BaseApi'
import HTTPTransport from '../system/api/HTTPTransport'
import type { SignInRequest, SignUpRequest, SignUpResponse, User } from '../types/user'

const http = new HTTPTransport(`${API_BASE}/auth`)

export class AuthAPI extends BaseApi {
  signUp(data: SignUpRequest): Promise<SignUpResponse> {
    return http.post('/signup', { data })
  }

  signIn(data: SignInRequest): Promise<void> {
    return http.post('/signin', { data })
  }

  getUser(): Promise<User> {
    return http.get('/user')
  }

  logout(): Promise<void> {
    return http.post('/logout')
  }
}

export const authAPI = new AuthAPI()
