import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Register from '@/views/Register.vue'

// Mock路由
const mockRouter = {
  push: vi.fn(),
}

vi.mock('vue-router', async () => {
  const actual = await vi.importActual('vue-router')
  return {
    ...actual,
    useRouter: () => mockRouter,
  }
})

// Mock API
vi.mock('@/api/auth', () => ({
  register: vi.fn().mockResolvedValue({
    id: 1,
    username: 'testuser',
    email: 'test@example.com',
  }),
}))

describe('Register.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('应该渲染注册表单', () => {
    const wrapper = mount(Register)
    
    // 查找标题文本 - Element Plus 的 el-card header 会渲染 h2
    const title = wrapper.find('h2')
    expect(title.exists()).toBe(true)
    expect(title.text()).toBe('用户注册')
  })

  it('应该包含所有必填字段', () => {
    const wrapper = mount(Register)
    
    // 查找必填字段（用户名、邮箱、密码、确认密码）
    // Element Plus 的 el-input 会渲染 input 元素
    const inputs = wrapper.findAll('input[type="text"], input[type="email"], input[type="password"]')
    expect(inputs.length).toBeGreaterThanOrEqual(4)
    
    // 验证至少有一个密码输入框
    const passwordInputs = wrapper.findAll('input[type="password"]')
    expect(passwordInputs.length).toBeGreaterThanOrEqual(2) // 密码和确认密码
  })
})



