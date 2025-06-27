import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig, AxiosError } from 'axios'
import { useAuthStore } from '@/stores/auth'

// 可配置的 API 基础地址
const API_BASE_URL = '/api' // 伪造数据时可用 mock 地址，后续可替换

const service = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000
})

// 请求拦截器，自动携带 token
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const authStore = useAuthStore()
    if (authStore.token) {
      config.headers = config.headers || {}
      config.headers['Authorization'] = `Bearer ${authStore.token}`
    }
    // 可扩展：全局 loading
    return config
  },
  error => Promise.reject(error)
)

// 响应拦截器，统一错误处理
service.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError) => {
    // 可扩展：全局 loading/error 处理
    if (error.response) {
      // 401 未登录/登录失效
      if (error.response.status === 401) {
        // 可自动跳转登录页
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

// 通用请求方法，支持类型推断
function request<T = any>(config: AxiosRequestConfig): Promise<T> {
  return service.request<T>(config).then(res => res as T)
}

// 类型安全的 GET 方法
function get<T = any>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> {
  return service.get<T>(url, { params, ...config }).then(res => res as T)
}

// 类型安全的 POST 方法
function post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
  return service.post<T>(url, data, config).then(res => res as T)
}

// 类型安全的 PUT 方法
function put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
  return service.put<T>(url, data, config).then(res => res as T)
}

// 类型安全的 DELETE 方法
function del<T = any>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> {
  return service.delete<T>(url, { params, ...config }).then(res => res as T)
}

// 类型安全的 PATCH 方法
function patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
  return service.patch<T>(url, data, config).then(res => res as T)
}

// 文件上传
function upload<T = any>(url: string, file: File | Blob, field = 'file', extraData?: Record<string, any>, config?: AxiosRequestConfig): Promise<T> {
  const formData = new FormData()
  formData.append(field, file)
  if (extraData) {
    Object.entries(extraData).forEach(([k, v]) => formData.append(k, v as any))
  }
  return service.post<T>(url, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    ...config
  }).then(res => res as T)
}

// 文件下载（返回 blob）
function download(url: string, params?: any, config?: AxiosRequestConfig): Promise<Blob> {
  return service.get(url, {
    params,
    responseType: 'blob',
    ...config
  }).then((res: any) => res as Blob)
}

export default {
  request,
  get,
  post,
  put,
  delete: del,
  patch,
  upload,
  download,
  axios: service // 如需自定义可直接用
} 