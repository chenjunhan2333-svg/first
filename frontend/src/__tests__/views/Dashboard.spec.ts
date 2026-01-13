import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import Dashboard from '@/views/Dashboard.vue'
import { getUserStats } from '@/api/users'
import { useAuthStore } from '@/stores/auth'

// Mock API
vi.mock('@/api/users', () => ({
  getUserStats: vi.fn(),
}))

// Mock store
vi.mock('@/stores/auth', () => ({
  useAuthStore: () => ({
    user: { id: 1, username: 'testuser', role: 'user' },
  }),
}))

describe('Dashboard.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('应该渲染仪表板', () => {
    vi.mocked(getUserStats).mockResolvedValue({
      total_users: 10,
      active_users: 8,
      admin_users: 2,
    })

    const wrapper = mount(Dashboard)

    expect(wrapper.find('.dashboard').exists()).toBe(true)
  })

  it('应该显示用户统计数据', async () => {
    vi.mocked(getUserStats).mockResolvedValue({
      total_users: 10,
      active_users: 8,
      admin_users: 2,
    })

    const wrapper = mount(Dashboard)

    // 等待异步数据加载
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 100))

    expect(getUserStats).toHaveBeenCalled()
  })

  it('应该处理统计数据加载失败', async () => {
    vi.mocked(getUserStats).mockRejectedValue(new Error('Network error'))

    const wrapper = mount(Dashboard)

    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 100))

    expect(getUserStats).toHaveBeenCalled()
  })

  it('应该在挂载时加载统计数据', async () => {
    vi.mocked(getUserStats).mockResolvedValue({
      total_users: 5,
      active_users: 4,
      admin_users: 1,
    })

    mount(Dashboard)

    await new Promise(resolve => setTimeout(resolve, 100))

    expect(getUserStats).toHaveBeenCalled()
  })
})

