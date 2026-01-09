import request from './request'
import type { User, Token } from '@/types/user'

export interface RegisterData {
  username: string
  email: string
  password: string
  full_name?: string
}

export function login(username: string, password: string): Promise<Token> {
  const formData = new FormData()
  formData.append('username', username)
  formData.append('password', password)
  return request.post('/auth/login', formData)
}

export function register(data: RegisterData): Promise<User> {
  return request.post('/auth/register', data)
}

export function getCurrentUser(): Promise<User> {
  return request.get('/auth/me')
}



