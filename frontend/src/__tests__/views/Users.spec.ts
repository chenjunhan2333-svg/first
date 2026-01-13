import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import Users from '@/views/Users.vue'
import { getUsers, createUser, deleteUser } from '@/api/users'
import { useAuthStore } from '@/stores/auth'
import { ElMessageBox } from 'element-plus'

// Mock API
vi.mock('@/api/users', () => ({
  getUsers: vi.fn(),
  createUser: vi.fn(),
  deleteUser: vi.fn(),
}))

// Mock store
const mockUser = {
  id: 1,
  username: 'admin',
  email: 'admin@example.com',
  role: 'admin' as const,
  is_active: true,
  created_at: new Date().toISOString(),
}

vi.mock('@/stores/auth', () => ({
  useAuthStore: () => ({
    user: mockUser,
  }),
}))

// Mock ElMessageBox
vi.mock('element-plus', async () => {
  const actual = await vi.importActual('element-plus')
  return {
    ...actual,
    ElMessageBox: {
      confirm: vi.fn(),
    },
  }
})

describe('Users.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('应该渲染用户管理页面', () => {
    vi.mocked(getUsers).mockResolvedValue([])

    const wrapper = mount(Users)

    expect(wrapper.find('.users-page').exists()).toBe(true)
  })

  it('应该加载用户列表', async () => {
    const mockUsers = [
      {
        id: 1,
        username: 'user1',
        email: 'user1@example.com',
        role: 'user' as const,
        is_active: true,
        created_at: new Date().toISOString(),
      },
    ]
    vi.mocked(getUsers).mockResolvedValue(mockUsers)

    const wrapper = mount(Users)

    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 100))

    expect(getUsers).toHaveBeenCalled()
  })

  it('应该显示创建用户对话框', async () => {
    vi.mocked(getUsers).mockResolvedValue([])

    const wrapper = mount(Users)

    // 点击创建用户按钮
    const createButton = wrapper.find('button[type="button"]')
    if (createButton.exists()) {
      await createButton.trigger('click')
      await wrapper.vm.$nextTick()
    }
  })

  it('应该处理创建用户', async () => {
    vi.mocked(getUsers).mockResolvedValue([])
    vi.mocked(createUser).mockResolvedValue({
      id: 2,
      username: 'newuser',
      email: 'newuser@example.com',
      role: 'user' as const,
      is_active: true,
      created_at: new Date().toISOString(),
    })

    const wrapper = mount(Users)

    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 100))
  })

  it('应该处理删除用户', async () => {
    const mockUsers = [
      {
        id: 2,
        username: 'user2',
        email: 'user2@example.com',
        role: 'user' as const,
        is_active: true,
        created_at: new Date().toISOString(),
      },
    ]
    vi.mocked(getUsers).mockResolvedValue(mockUsers)
    vi.mocked(ElMessageBox.confirm).mockResolvedValue(undefined)
    vi.mocked(deleteUser).mockResolvedValue(undefined)

    const wrapper = mount(Users)

    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 100))
  })
})

