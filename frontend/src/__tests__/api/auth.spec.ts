import { describe, it, expect, vi, beforeEach } from 'vitest'
import { login, register, getCurrentUser } from '@/api/auth'
import request from '@/api/request'

// Mock request module
vi.mock('@/api/request', () => ({
  default: {
    post: vi.fn(),
    get: vi.fn(),
  },
}))

describe('auth API', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('login', () => {
    it('应该使用 FormData 发送登录请求', async () => {
      const mockToken = { access_token: 'test-token', token_type: 'bearer' }
      vi.mocked(request.post).mockResolvedValue(mockToken)

      const result = await login('testuser', 'password123')

      expect(request.post).toHaveBeenCalledWith('/auth/login', expect.any(FormData))
      expect(result).toEqual(mockToken)
    })

    it('应该正确处理登录响应', async () => {
      const mockToken = { access_token: 'test-token', token_type: 'bearer' }
      vi.mocked(request.post).mockResolvedValue(mockToken)

      const result = await login('testuser', 'password123')

      expect(result.access_token).toBe('test-token')
      expect(result.token_type).toBe('bearer')
    })
  })

  describe('register', () => {
    it('应该发送注册请求', async () => {
      const mockUser = {
        id: 1,
        username: 'newuser',
        email: 'newuser@example.com',
        role: 'user',
        is_active: true,
        created_at: new Date().toISOString(),
      }
      vi.mocked(request.post).mockResolvedValue(mockUser)

      const registerData = {
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'password123',
        full_name: 'New User',
      }

      const result = await register(registerData)

      expect(request.post).toHaveBeenCalledWith('/auth/register', registerData)
      expect(result).toEqual(mockUser)
    })

    it('应该处理没有 full_name 的注册', async () => {
      const mockUser = {
        id: 1,
        username: 'newuser',
        email: 'newuser@example.com',
        role: 'user',
        is_active: true,
        created_at: new Date().toISOString(),
      }
      vi.mocked(request.post).mockResolvedValue(mockUser)

      const registerData = {
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'password123',
      }

      await register(registerData)

      expect(request.post).toHaveBeenCalledWith('/auth/register', registerData)
    })
  })

  describe('getCurrentUser', () => {
    it('应该获取当前用户信息', async () => {
      const mockUser = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        role: 'user',
        is_active: true,
        created_at: new Date().toISOString(),
      }
      vi.mocked(request.get).mockResolvedValue(mockUser)

      const result = await getCurrentUser()

      expect(request.get).toHaveBeenCalledWith('/auth/me')
      expect(result).toEqual(mockUser)
    })
  })
})

