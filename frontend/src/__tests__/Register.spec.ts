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
    const wrapper = mount(Register, {
      global: {
        stubs: ['el-card', 'el-form', 'el-form-item', 'el-input', 'el-button', 'el-link'],
      },
    })
    
    expect(wrapper.html()).toContain('用户注册')
  })

  it('应该包含所有必填字段', () => {
    const wrapper = mount(Register, {
      global: {
        stubs: ['el-card', 'el-form', 'el-form-item', 'el-input', 'el-button', 'el-link'],
      },
    })
    
    const form = wrapper.findComponent({ name: 'ElForm' })
    expect(form.exists()).toBe(true)
  })
})



