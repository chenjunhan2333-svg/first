import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router'

const request = axios.create({
  baseURL: '/api/v1',
  timeout: 30000,
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    if (error.response) {
      const { status, data, config } = error.response
      
      // 登录接口失败不显示"登录已过期"
      const isLoginRequest = config?.url?.includes('/auth/login')
      const isGetCurrentUserRequest = config?.url?.includes('/auth/me')
      
      if (status === 401) {
        // 如果是登录请求或获取当前用户请求失败，不显示"登录已过期"
        // 这些错误应该由调用方处理
        if (!isLoginRequest && !isGetCurrentUserRequest) {
          ElMessage.error('登录已过期，请重新登录')
          localStorage.removeItem('token')
          router.push('/login')
        }
      } else if (status === 403) {
        ElMessage.error('没有权限访问')
      } else if (status === 404) {
        ElMessage.error('资源不存在')
      } else {
        // 登录请求的错误由 Login.vue 处理，不在这里显示
        if (!isLoginRequest) {
          const errorMsg = data?.detail || data?.message || `请求失败 (${status})`
          ElMessage.error(errorMsg)
          console.error('API Error:', {
            url: config?.url,
            method: config?.method,
            status,
            data,
          })
        }
      }
    } else if (error.request) {
      // 请求已发出但没有收到响应
      console.error('Network Error:', error.message)
      ElMessage.error('无法连接到服务器，请检查后端服务是否运行')
    } else {
      // 请求配置错误
      console.error('Request Error:', error.message)
      ElMessage.error(`请求配置错误: ${error.message}`)
    }
    
    return Promise.reject(error)
  }
)

export default request



