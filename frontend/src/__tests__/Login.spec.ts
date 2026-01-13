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
    const wrapper = mount(Login)
    
    // 查找标题文本 - Element Plus 的 el-card header 会渲染 h2
    const title = wrapper.find('h2')
    expect(title.exists()).toBe(true)
    expect(title.text()).toBe('高纯石英矿石图像分类系统')
  })

  it('应该包含用户名和密码输入框', () => {
    const wrapper = mount(Login)
    
    // 查找所有输入框（Element Plus 的 el-input 会渲染 input 元素）
    const inputs = wrapper.findAll('input[type="text"], input[type="password"]')
    expect(inputs.length).toBeGreaterThanOrEqual(2)
    
    // 验证至少有一个用户名输入框和一个密码输入框
    const passwordInput = wrapper.find('input[type="password"]')
    expect(passwordInput.exists()).toBe(true)
  })
})
