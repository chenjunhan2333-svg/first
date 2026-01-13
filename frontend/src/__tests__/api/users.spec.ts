import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getUserStats, getUsers, createUser, deleteUser } from '@/api/users'
import request from '@/api/request'

// Mock request module
vi.mock('@/api/request', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
}))

describe('users API', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getUserStats', () => {
    it('应该获取用户统计数据', async () => {
      const mockStats = {
        total_users: 10,
        active_users: 8,
        admin_users: 2,
      }
      vi.mocked(request.get).mockResolvedValue(mockStats)

      const result = await getUserStats()

      expect(request.get).toHaveBeenCalledWith('/users/stats')
      expect(result).toEqual(mockStats)
    })
  })

  describe('getUsers', () => {
    it('应该获取用户列表', async () => {
      const mockUsers = [
        {
          id: 1,
          username: 'user1',
          email: 'user1@example.com',
          role: 'user',
          is_active: true,
          created_at: new Date().toISOString(),
        },
        {
          id: 2,
          username: 'admin1',
          email: 'admin1@example.com',
          role: 'admin',
          is_active: true,
          created_at: new Date().toISOString(),
        },
      ]
      vi.mocked(request.get).mockResolvedValue(mockUsers)

      const result = await getUsers()

      expect(request.get).toHaveBeenCalledWith('/users')
      expect(result).toEqual(mockUsers)
    })
  })

  describe('createUser', () => {
    it('应该创建新用户', async () => {
      const mockUser = {
        id: 3,
        username: 'newuser',
        email: 'newuser@example.com',
        role: 'user',
        is_active: true,
        created_at: new Date().toISOString(),
      }
      const userData = {
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'password123',
        full_name: 'New User',
        role: 'user',
      }
      vi.mocked(request.post).mockResolvedValue(mockUser)

      const result = await createUser(userData)

      expect(request.post).toHaveBeenCalledWith('/users', userData)
      expect(result).toEqual(mockUser)
    })

    it('应该处理没有 full_name 和 role 的用户创建', async () => {
      const mockUser = {
        id: 3,
        username: 'newuser',
        email: 'newuser@example.com',
        role: 'user',
        is_active: true,
        created_at: new Date().toISOString(),
      }
      const userData = {
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'password123',
      }
      vi.mocked(request.post).mockResolvedValue(mockUser)

      await createUser(userData)

      expect(request.post).toHaveBeenCalledWith('/users', userData)
    })
  })

  describe('deleteUser', () => {
    it('应该删除用户', async () => {
      vi.mocked(request.delete).mockResolvedValue(undefined)

      await deleteUser(1)

      expect(request.delete).toHaveBeenCalledWith('/users/1')
    })
  })
})

