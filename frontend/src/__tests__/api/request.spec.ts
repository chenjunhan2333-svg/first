import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router'
import request from '@/api/request'

// Mock dependencies
vi.mock('element-plus', () => ({
  ElMessage: {
    error: vi.fn(),
  },
}))

vi.mock('@/router', () => ({
  default: {
    push: vi.fn(),
  },
}))

describe('request interceptor', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  describe('request interceptor', () => {
    it('应该在请求头中添加 token', async () => {
      localStorage.setItem('token', 'test-token')

      const config = {
        headers: {},
      }

      // 模拟请求拦截器
      const interceptor = (request as any).interceptors.request.handlers[0]
      const result = await interceptor.fulfilled(config)

      expect(result.headers.Authorization).toBe('Bearer test-token')
    })

    it('应该在没有 token 时不添加 Authorization 头', async () => {
      localStorage.removeItem('token')

      const config = {
        headers: {},
      }

      const interceptor = (request as any).interceptors.request.handlers[0]
      const result = await interceptor.fulfilled(config)

      expect(result.headers.Authorization).toBeUndefined()
    })
  })

  describe('response interceptor', () => {
    it('应该返回响应数据', async () => {
      const response = {
        data: { message: 'success' },
      }

      const interceptor = (request as any).interceptors.response.handlers[0]
      const result = await interceptor.fulfilled(response)

      expect(result).toEqual({ message: 'success' })
    })

    it('应该处理 401 错误（非登录请求）', async () => {
      const error = {
        response: {
          status: 401,
          config: {
            url: '/api/v1/users',
          },
        },
      }

      const interceptor = (request as any).interceptors.response.handlers[0]
      
      try {
        await interceptor.rejected(error)
      } catch (e) {
        expect(ElMessage.error).toHaveBeenCalledWith('登录已过期，请重新登录')
        expect(localStorage.getItem('token')).toBeNull()
        expect(router.push).toHaveBeenCalledWith('/login')
      }
    })

    it('不应该处理登录请求的 401 错误', async () => {
      const error = {
        response: {
          status: 401,
          config: {
            url: '/api/v1/auth/login',
          },
        },
      }

      const interceptor = (request as any).interceptors.response.handlers[0]
      
      try {
        await interceptor.rejected(error)
      } catch (e) {
        expect(ElMessage.error).not.toHaveBeenCalledWith('登录已过期，请重新登录')
      }
    })

    it('应该处理 403 错误', async () => {
      const error = {
        response: {
          status: 403,
          config: {
            url: '/api/v1/users',
          },
        },
      }

      const interceptor = (request as any).interceptors.response.handlers[0]
      
      try {
        await interceptor.rejected(error)
      } catch (e) {
        expect(ElMessage.error).toHaveBeenCalledWith('没有权限访问')
      }
    })

    it('应该处理 404 错误', async () => {
      const error = {
        response: {
          status: 404,
          config: {
            url: '/api/v1/users/999',
          },
        },
      }

      const interceptor = (request as any).interceptors.response.handlers[0]
      
      try {
        await interceptor.rejected(error)
      } catch (e) {
        expect(ElMessage.error).toHaveBeenCalledWith('资源不存在')
      }
    })

    it('应该处理网络错误', async () => {
      const error = {
        request: {},
        message: 'Network Error',
      }

      const interceptor = (request as any).interceptors.response.handlers[0]
      
      try {
        await interceptor.rejected(error)
      } catch (e) {
        expect(ElMessage.error).toHaveBeenCalledWith('无法连接到服务器，请检查后端服务是否运行')
      }
    })

    it('应该处理请求配置错误', async () => {
      const error = {
        message: 'Request config error',
      }

      const interceptor = (request as any).interceptors.response.handlers[0]
      
      try {
        await interceptor.rejected(error)
      } catch (e) {
        expect(ElMessage.error).toHaveBeenCalledWith('请求配置错误: Request config error')
      }
    })
  })
})

