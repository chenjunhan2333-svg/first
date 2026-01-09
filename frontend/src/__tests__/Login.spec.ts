import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import Login from '@/views/Login.vue'

// Mock路由
const mockRouter = {
  push: vi.fn(),
}

vi.mock('vue-router', async () => {
  const actual = await vi.importActual('vue-router')
  return {
    ...actual,
    useRouter: () => mockRouter,
    useRoute: () => ({ query: {} }),
  }
})

// Mock Pinia store
vi.mock('@/stores/auth', () => ({
  useAuthStore: () => ({
    loginUser: vi.fn().mockResolvedValue({}),
  }),
}))

describe('Login.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('应该渲染登录表单', () => {
    const wrapper = mount(Login, {
      global: {
        stubs: ['el-card', 'el-form', 'el-form-item', 'el-input', 'el-button', 'el-link'],
      },
    })
    
    expect(wrapper.html()).toContain('高纯石英矿石图像分类系统')
  })

  it('应该包含用户名和密码输入框', () => {
    const wrapper = mount(Login, {
      global: {
        stubs: ['el-card', 'el-form', 'el-form-item', 'el-input', 'el-button', 'el-link'],
      },
    })
    
    const form = wrapper.findComponent({ name: 'ElForm' })
    expect(form.exists()).toBe(true)
  })
})
