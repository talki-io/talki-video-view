import axios, { 
  AxiosRequestConfig, 
  AxiosResponse, 
  InternalAxiosRequestConfig, 
  AxiosError 
} from 'axios'
import type { ApiResponse, ApiError, RequestConfig } from '@/types/api'

// 可配置的 API 基础地址
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

// 创建axios实例
const http = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 获取token的函数（避免循环依赖）
const getToken = (): string | null => {
  return localStorage.getItem('token')
}

// 请求拦截器
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken()
    if (token) {
      config.headers = config.headers || {}
      config.headers['Authorization'] = `Bearer ${token}`
    }
    
    // 添加请求时间戳，避免缓存
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        _t: Date.now()
      }
    }
    
    // 添加请求ID用于追踪
    config.headers['X-Request-ID'] = generateRequestId()
    
    return config
  },
  (error: AxiosError) => {
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
http.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const { data } = response
    
    // 如果响应格式不符合预期，抛出错误
    if (typeof data !== 'object' || data === null) {
      throw new Error('Invalid response format')
    }
    
    // 如果业务状态码不是成功，抛出错误
    if (data.code !== 200 && data.code !== 0) {
      const error: ApiError = {
        code: data.code,
        message: data.message || '请求失败',
        details: data.data
      }
      throw error
    }
    
    return response
  },
  (error: AxiosError) => {
    let apiError: ApiError
    
    if (error.response) {
      // 服务器返回错误状态码
      const { status, data } = error.response
      
      switch (status) {
        case 401:
          // 未授权，清除token并跳转到登录页
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          localStorage.removeItem('refreshToken')
          if (window.location.pathname !== '/login') {
            window.location.href = '/login'
          }
          apiError = {
            code: status,
            message: '登录已过期，请重新登录'
          }
          break
        case 403:
          apiError = {
            code: status,
            message: '没有权限访问该资源'
          }
          break
        case 404:
          apiError = {
            code: status,
            message: '请求的资源不存在'
          }
          break
        case 429:
          apiError = {
            code: status,
            message: '请求过于频繁，请稍后再试'
          }
          break
        case 500:
          apiError = {
            code: status,
            message: '服务器内部错误'
          }
          break
        case 502:
        case 503:
        case 504:
          apiError = {
            code: status,
            message: '服务暂时不可用，请稍后再试'
          }
          break
        default:
          apiError = {
            code: status,
            message: (data as any)?.message || '请求失败'
          }
      }
    } else if (error.request) {
      // 网络错误
      apiError = {
        code: -1,
        message: '网络连接失败，请检查网络设置'
      }
    } else {
      // 其他错误
      apiError = {
        code: -2,
        message: error.message || '请求配置错误'
      }
    }
    
    console.error('Response error:', apiError)
    return Promise.reject(apiError)
  }
)

// 生成请求ID
function generateRequestId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// 重试机制
async function retryRequest<T>(
  requestFn: () => Promise<T>,
  retryCount: number = 3,
  delay: number = 1000
): Promise<T> {
  try {
    return await requestFn()
  } catch (error: any) {
    if (retryCount > 0 && (error.code === 500 || error.code === 502 || error.code === 503 || error.code === 504)) {
      await new Promise(resolve => setTimeout(resolve, delay))
      return retryRequest(requestFn, retryCount - 1, delay * 2)
    }
    throw error
  }
}

// 封装请求方法
class HttpClient {
  /**
   * 通用请求方法
   */
  request<T = any>(config: AxiosRequestConfig & RequestConfig): Promise<ApiResponse<T>> {
    const { retryCount = 0, ...axiosConfig } = config
    
    if (retryCount > 0) {
      return retryRequest(() => http.request(axiosConfig), retryCount)
    }
    
    return http.request(axiosConfig)
  }

  /**
   * GET请求
   */
  get<T = any>(url: string, params?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return http.get(url, { params, ...config })
  }

  /**
   * POST请求
   */
  post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return http.post(url, data, config)
  }

  /**
   * PUT请求
   */
  put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return http.put(url, data, config)
  }

  /**
   * DELETE请求
   */
  delete<T = any>(url: string, params?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return http.delete(url, { params, ...config })
  }

  /**
   * PATCH请求
   */
  patch<T = any>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return http.patch(url, data, config)
  }

  /**
   * 文件上传
   */
  upload<T = any>(
    url: string, 
    file: File | Blob, 
    field = 'file', 
    extraData?: Record<string, any>, 
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    const formData = new FormData()
    formData.append(field, file)
    
    if (extraData) {
      Object.entries(extraData).forEach(([key, value]) => {
        formData.append(key, value as any)
      })
    }
    
    return http.post(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      ...config
    })
  }

  /**
   * 文件下载
   */
  download(url: string, params?: any, config?: RequestConfig): Promise<Blob> {
    return http.get(url, {
      params,
      responseType: 'blob',
      ...config
    }).then((response: any) => response.data)
  }

  /**
   * 设置请求头
   */
  setHeader(key: string, value: string): void {
    http.defaults.headers.common[key] = value
  }

  /**
   * 移除请求头
   */
  removeHeader(key: string): void {
    delete http.defaults.headers.common[key]
  }

  /**
   * 设置基础URL
   */
  setBaseURL(url: string): void {
    http.defaults.baseURL = url
  }

  /**
   * 设置超时时间
   */
  setTimeout(timeout: number): void {
    http.defaults.timeout = timeout
  }

  /**
   * 取消请求
   */
  cancelRequest(requestId: string): void {
    // 这里可以实现请求取消逻辑
    console.log('Cancel request:', requestId)
  }
}

// 创建实例
const httpClient = new HttpClient()

// 导出实例和类
export default httpClient
export { HttpClient }
export { http as axiosInstance } 