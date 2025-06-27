import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import router from '@/router'
import request from '@/utils/request'

export interface User {
  id: string
  email: string
  username: string
  avatar: string
  uid: string
  bcoin: number
  coin: number
  stats: {
    posts: number
    follows: number
    fans: number
  }
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const loading = ref(false)
  const errorMsg = ref<string | null>(null)

  const isLoggedIn = computed(() => !!user.value && !!token.value)

  // 登录
  const login = async (email: string, password: string) => {
    loading.value = true
    errorMsg.value = null
    try {
      // TODO: 替换为真实API
      // const res = await request.post<{ user: User; token: string }>('/auth/login', { email, password })
      // user.value = res.user
      // token.value = res.token
      // localStorage.setItem('user', JSON.stringify(user.value))
      // localStorage.setItem('token', token.value)
      return { success: true, user: user.value }
    } catch (error: any) {
      errorMsg.value = error?.message || '登录失败，请重试'
      return { success: false, error: errorMsg.value }
    } finally {
      loading.value = false
    }
  }

  // 注册
  const register = async (email: string, password: string, inviteCode: string, verificationCode: string) => {
    loading.value = true
    errorMsg.value = null
    try {
      // TODO: 替换为真实API
      // await request.post('/auth/register', { email, password, inviteCode, verificationCode })
      return { success: true }
    } catch (error: any) {
      errorMsg.value = error?.message || '注册失败，请重试'
      return { success: false, error: errorMsg.value }
    } finally {
      loading.value = false
    }
  }

  // 重置密码
  const resetPassword = async (email: string, newPassword: string, verificationCode: string) => {
    loading.value = true
    errorMsg.value = null
    try {
      // TODO: 替换为真实API
      // await request.post('/auth/reset-password', { email, newPassword, verificationCode })
      return { success: true }
    } catch (error: any) {
      errorMsg.value = error?.message || '重置密码失败，请重试'
      return { success: false, error: errorMsg.value }
    } finally {
      loading.value = false
    }
  }

  // 刷新用户信息（如需）
  const refreshUserInfo = async () => {
    if (!token.value) return
    try {
      // TODO: 替换为真实API
      // const res = await request.get<User>('/user/info')
      // user.value = res
    } catch (error) {
      logout()
    }
  }

  // token 刷新（预留）
  const refreshToken = async () => {
    if (!token.value) return
    try {
      // TODO: 替换为真实API
      // const res = await request.post<{ token: string }>('/auth/refresh-token', { token: token.value })
      // token.value = res.token
    } catch (error) {
      logout()
    }
  }

  // 退出登录
  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    if (router.currentRoute.value.path !== '/login') {
      router.replace('/login')
    }
  }

  // 初始化认证状态
  const initAuth = () => {
    const savedUser = localStorage.getItem('user')
    const savedToken = localStorage.getItem('token')
    if (savedUser && savedToken) {
      try {
        user.value = JSON.parse(savedUser)
        token.value = savedToken
      } catch (error) {
        logout()
      }
    }
  }

  return {
    user,
    token,
    loading,
    errorMsg,
    isLoggedIn,
    login,
    register,
    resetPassword,
    refreshUserInfo,
    refreshToken,
    logout,
    initAuth
  }
}) 