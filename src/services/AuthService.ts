import { authAPI } from '../api'
import type { SignInRequest, SignUpRequest, User } from '../types/user'
import { withApiError } from '../utils/withApiError'

class AuthService {
  private _isAuth = false

  isAuth(): boolean {
    return this._isAuth
  }

  async checkAuth(): Promise<void> {
    try {
      await this.getUser()
    } catch {
      this._isAuth = false
    }
  }

  async signIn(data: SignInRequest): Promise<void> {
    await withApiError(() => authAPI.signIn(data))
    this._isAuth = true
    await this.getUser()
  }

  async signUp(data: SignUpRequest): Promise<void> {
    await withApiError(() => authAPI.signUp(data))
    this._isAuth = true
    await this.getUser()
  }

  async logout(): Promise<void> {
    try {
      await withApiError(() => authAPI.logout())
    } finally {
      this._isAuth = false
    }
  }

  async getUser(): Promise<User> {
    try {
      const user = await withApiError(() => authAPI.getUser())

      this._isAuth = true

      return user
    } catch (error) {
      this._isAuth = false

      throw error
    }
  }
}

export const authService = new AuthService()
