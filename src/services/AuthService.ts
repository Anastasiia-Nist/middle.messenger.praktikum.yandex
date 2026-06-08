import { authAPI } from '../api'
import type { SignInRequest, SignUpRequest, User } from '../types/user'
import { parseApiError } from '../utils/api'

class AuthService {
  private _isAuth = false

  private currentUser: User | null = null

  isAuth(): boolean {
    return this._isAuth
  }

  getCurrentUser(): User | null {
    return this.currentUser
  }

  async checkAuth(): Promise<void> {
    try {
      await this.getUser()
    } catch {
      this._isAuth = false
      this.currentUser = null
    }
  }

  async signIn(data: SignInRequest): Promise<void> {
    try {
      await authAPI.signIn(data)
      this._isAuth = true
      await this.getUser()
    } catch (error) {
      throw new Error(parseApiError(error))
    }
  }

  async signUp(data: SignUpRequest): Promise<void> {
    try {
      await authAPI.signUp(data)
      this._isAuth = true
      await this.getUser()
    } catch (error) {
      throw new Error(parseApiError(error))
    }
  }

  async logout(): Promise<void> {
    try {
      await authAPI.logout()
    } catch (error) {
      throw new Error(parseApiError(error))
    } finally {
      this._isAuth = false
      this.currentUser = null
    }
  }

  async getUser(): Promise<User> {
    try {
      const user = await authAPI.getUser()

      this._isAuth = true
      this.currentUser = user

      return user
    } catch (error) {
      this._isAuth = false
      this.currentUser = null

      throw new Error(parseApiError(error))
    }
  }
}

export const authService = new AuthService()
