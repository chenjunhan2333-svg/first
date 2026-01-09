import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '@/stores/auth'

// Mock API模块
vi.mock('@/api/auth', async () => {
  const actual = await vi.importActual('@/api/auth')
  return {
    ...actual,
    login: vi.fn(),
    getCurrentUser: vi.fn(),
  }
})

// 动态导入以获取mock函数
const authApi = await import('@/api/auth')

describe('Auth Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
    localStorage.clear()
  })

  it('应该初始化时没有token', () => {
    const store = useAuthStore()
    expect(store.token).toBeNull()
    expect(store.isAuthenticated).toBe(false)
  })

  it('应该能够登录并保存token', async () => {
    const mockToken = { access_token: 'test-token', token_type: 'bearer' }
    const mockUser = {
      id: 1,
      username: 'testuser',
      email: 'test@example.com',
      role: 'user',
      is_active: true,
    }

    vi.mocked(authApi.login).mockResolvedValue(mockToken)
    vi.mocked(authApi.getCurrentUser).mockResolvedValue(mockUser as any)

    const store = useAuthStore()
    await store.loginUser('testuser', 'password123')

    expect(store.token).toBe('test-token')
    expect(store.isAuthenticated).toBe(true)
    expect(localStorage.getItem('token')).toBe('test-token')
    expect(authApi.login).toHaveBeenCalledWith('testuser', 'password123')
  })

  it('应该能够登出', () => {
    const store = useAuthStore()
    store.token = 'test-token'
    localStorage.setItem('token', 'test-token')

    store.logout()

    expect(store.token).toBeNull()
    expect(store.user).toBeNull()
    expect(localStorage.getItem('token')).toBeNull()
  })

  it('应该能够获取用户信息', async () => {
    const mockUser = {
      id: 1,
      username: 'testuser',
      email: 'test@example.com',
      role: 'user',
      is_active: true,
    }

    vi.mocked(authApi.getCurrentUser).mockResolvedValue(mockUser as any)

    const store = useAuthStore()
    store.token = 'test-token'
    await store.fetchUserInfo()

    expect(store.user).toEqual(mockUser)
    expect(authApi.getCurrentUser).toHaveBeenCalled()
  })
})

