import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { authApi } from '@/api/authApi'
import type { User, LoginParams, RegisterParams, ResetPasswordParams } from '@/types/api'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  
  // 状态
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const refreshToken = ref<string | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // 计算属性
  const isLoggedIn = computed(() => !!user.value && !!token.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  const hasPermission = computed(() => (permission: string) => {
    return user.value?.permissions?.includes(permission) || false
  })

  // 初始化认证状态
  const initAuth = () => {
    const savedUser = localStorage.getItem('user')
    const savedToken = localStorage.getItem('token')
    const savedRefreshToken = localStorage.getItem('refreshToken')
    
    if (savedUser && savedToken) {
      try {
        user.value = JSON.parse(savedUser)
        token.value = savedToken
        refreshToken.value = savedRefreshToken
      } catch (error) {
        console.error('Failed to parse saved user data:', error)
        clearAuth()
      }
    }
  }

  // 清除认证状态
  const clearAuth = () => {
    user.value = null
    token.value = null
    refreshToken.value = null
    error.value = null
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
  }

  // 保存认证状态
  const saveAuth = (userData: User, tokenData: string, refreshTokenData?: string) => {
    user.value = userData
    token.value = tokenData
    if (refreshTokenData) {
      refreshToken.value = refreshTokenData
    }
    
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('token', tokenData)
    if (refreshTokenData) {
      localStorage.setItem('refreshToken', refreshTokenData)
    }
  }

  // 登录
  const login = async (params: LoginParams) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await authApi.login(params)
      
      if (response.success) {
        const { user: userData, token: tokenData, refreshToken: refreshTokenData } = response.data
        saveAuth(userData, tokenData, refreshTokenData)
        
        return { success: true, user: userData }
      } else {
        error.value = response.message || '登录失败'
        return { success: false, error: error.value }
      }
    } catch (err: any) {
      error.value = err.message || '登录失败，请重试'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  // 注册
  const register = async (params: RegisterParams) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await authApi.register(params)
      
      if (response.success) {
        return { success: true }
      } else {
        error.value = response.message || '注册失败'
        return { success: false, error: error.value }
      }
    } catch (err: any) {
      error.value = err.message || '注册失败，请重试'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  // 重置密码
  const resetPassword = async (params: ResetPasswordParams) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await authApi.resetPassword(params)
      
      if (response.success) {
        return { success: true }
      } else {
        error.value = response.message || '重置密码失败'
        return { success: false, error: error.value }
      }
    } catch (err: any) {
      error.value = err.message || '重置密码失败，请重试'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  // 刷新用户信息
  const refreshUserInfo = async () => {
    if (!token.value) return
    
    try {
      const response = await authApi.getUserInfo()
      
      if (response.success) {
        user.value = response.data
        localStorage.setItem('user', JSON.stringify(response.data))
      } else {
        logout()
      }
    } catch (err) {
      logout()
    }
  }

  // 刷新Token
  const refreshTokenAction = async () => {
    if (!refreshToken.value) {
      logout()
      return false
    }
    
    try {
      const response = await authApi.refreshToken(refreshToken.value)
      
      if (response.success) {
        token.value = response.data.token
        localStorage.setItem('token', response.data.token)
        return true
      } else {
        logout()
        return false
      }
    } catch (err) {
      logout()
      return false
    }
  }

  // 退出登录
  const logout = () => {
    clearAuth()
    
    // 调用退出登录API（可选）
    if (token.value) {
      authApi.logout().catch(() => {
        // 忽略退出登录API的错误
      })
    }
    
    // 跳转到登录页
    if (router.currentRoute.value.path !== '/login') {
      router.replace('/login')
    }
  }

  // 发送验证码
  const sendVerificationCode = async (email: string, type: 'register' | 'reset' | 'login') => {
    try {
      const response = await authApi.sendVerificationCode({ email, type })
      return { success: response.success, message: response.message }
    } catch (err: any) {
      return { success: false, message: err.message || '发送验证码失败' }
    }
  }

  // 验证邀请码
  const verifyInviteCode = async (inviteCode: string) => {
    try {
      const response = await authApi.verifyInviteCode(inviteCode)
      return { success: response.success, valid: response.data.valid, message: response.data.message }
    } catch (err: any) {
      return { success: false, valid: false, message: err.message || '验证邀请码失败' }
    }
  }

  // 检查邮箱是否存在
  const checkEmailExists = async (email: string) => {
    try {
      const response = await authApi.checkEmailExists(email)
      return { success: response.success, exists: response.data.exists }
    } catch (err: any) {
      return { success: false, exists: false, message: err.message || '检查邮箱失败' }
    }
  }

  return {
    // 状态
    user,
    token,
    refreshToken,
    loading,
    error,
    
    // 计算属性
    isLoggedIn,
    isAdmin,
    hasPermission,
    
    // 方法
    initAuth,
    login,
    register,
    resetPassword,
    refreshUserInfo,
    refreshTokenAction,
    logout,
    sendVerificationCode,
    verifyInviteCode,
    checkEmailExists,
    clearAuth
  }
}) 