import request from './request'
import type { User } from '@/types/user'

export interface UserStats {
  total_users: number
  active_users: number
  admin_users: number
}

export interface UserCreate {
  username: string
  email: string
  password: string
  full_name?: string
  role?: 'admin' | 'user'
}

export function getUserStats(): Promise<UserStats> {
  return request.get('/users/stats')
}

export function getUsers(): Promise<User[]> {
  return request.get('/users')
}

export function createUser(userData: UserCreate): Promise<User> {
  return request.post('/users', userData)
}

export function deleteUser(userId: number): Promise<void> {
  return request.delete(`/users/${userId}`)
}

