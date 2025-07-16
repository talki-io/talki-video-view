import httpClient from '@/utils/http'
import type {
  ApiResponse,
  LoginParams,
  LoginResponse,
  RegisterParams,
  SendVerificationCodeParams,
  ResetPasswordParams,
  User
} from '@/types/api'

/**
 * 认证相关API接口
 */
export const authApi = {
  /**
   * 用户登录
   * @param params 登录参数
   * @returns 登录响应
   */
  login(params: LoginParams): Promise<ApiResponse<LoginResponse>> {
    return httpClient.post('/auth/login', params)
  },

  /**
   * 用户注册
   * @param params 注册参数
   * @returns 注册响应
   */
  register(params: RegisterParams): Promise<ApiResponse<{ message: string }>> {
    return httpClient.post('/auth/register', params)
  },

  /**
   * 发送验证码
   * @param params 发送验证码参数
   * @returns 发送结果
   */
  sendVerificationCode(params: SendVerificationCodeParams): Promise<ApiResponse<{ message: string }>> {
    return httpClient.post('/auth/send-verification-code', params)
  },

  /**
   * 重置密码
   * @param params 重置密码参数
   * @returns 重置结果
   */
  resetPassword(params: ResetPasswordParams): Promise<ApiResponse<{ message: string }>> {
    return httpClient.post('/auth/reset-password', params)
  },

  /**
   * 刷新Token
   * @param token 当前token
   * @returns 新的token
   */
  refreshToken(token: string): Promise<ApiResponse<{ token: string }>> {
    return httpClient.post('/auth/refresh-token', { token })
  },

  /**
   * 获取用户信息
   * @returns 用户信息
   */
  getUserInfo(): Promise<ApiResponse<User>> {
    return httpClient.get('/user/info')
  },

  /**
   * 退出登录
   * @returns 退出结果
   */
  logout(): Promise<ApiResponse<{ message: string }>> {
    return httpClient.post('/auth/logout')
  },

  /**
   * 验证邀请码
   * @param inviteCode 邀请码
   * @returns 验证结果
   */
  verifyInviteCode(inviteCode: string): Promise<ApiResponse<{ valid: boolean; message?: string }>> {
    return httpClient.post('/auth/verify-invite-code', { inviteCode })
  },

  /**
   * 验证邮箱是否已注册
   * @param email 邮箱地址
   * @returns 验证结果
   */
  checkEmailExists(email: string): Promise<ApiResponse<{ exists: boolean }>> {
    return httpClient.get('/auth/check-email', { params: { email } })
  }
}

// 导出默认对象
export default authApi 