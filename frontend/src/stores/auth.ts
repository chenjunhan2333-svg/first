import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { login, getCurrentUser } from '@/api/auth'
import type { User } from '@/types/user'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'))
  const user = ref<User | null>(null)

  const isAuthenticated = computed(() => !!token.value)

  async function loginUser(username: string, password: string) {
    const response = await login(username, password)
    token.value = response.access_token
    localStorage.setItem('token', response.access_token)
    
    // 获取用户信息
    await fetchUserInfo()
    return response
  }

  async function fetchUserInfo() {
    if (!token.value) return
    try {
      user.value = await getCurrentUser()
    } catch (error: any) {
      // 如果获取用户信息失败（如 token 无效），静默登出
      // 不显示错误消息，因为响应拦截器已经处理了
      if (error.response?.status === 401) {
        logout()
      }
    }
  }

  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
  }

  // 初始化时获取用户信息（静默失败，不显示错误）
  if (token.value) {
    fetchUserInfo().catch(() => {
      // 静默处理初始化时的错误
    })
  }

  return {
    token,
    user,
    isAuthenticated,
    loginUser,
    fetchUserInfo,
    logout,
  }
})



