// API 响应基础类型
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
  success: boolean
}

// 分页响应类型
export interface PaginatedResponse<T = any> {
  list: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

// 用户相关类型
export interface User {
  id: string
  email: string
  username: string
  avatar: string
  uid: string
  bcoin: number
  coin: number
  role?: 'user' | 'admin' | 'moderator'
  permissions?: string[]
  stats: {
    posts: number
    follows: number
    fans: number
  }
  createdAt: string
  updatedAt: string
}

// 登录请求参数
export interface LoginParams {
  email: string
  password: string
}

// 登录响应
export interface LoginResponse {
  user: User
  token: string
  refreshToken?: string
}

// 注册请求参数
export interface RegisterParams {
  email: string
  password: string
  inviteCode: string
  verificationCode: string
}

// 发送验证码请求参数
export interface SendVerificationCodeParams {
  email: string
  type: 'register' | 'reset' | 'login'
}

// 重置密码请求参数
export interface ResetPasswordParams {
  email: string
  newPassword: string
  verificationCode: string
}

// 用户信息更新参数
export interface UpdateUserParams {
  username?: string
  avatar?: string
  email?: string
}

// 视频相关类型
export interface Video {
  id: string
  title: string
  description: string
  poster: string
  url: string
  duration: number
  views: number
  likes: number
  category: string
  tags: string[]
  createdAt: string
  updatedAt: string
  isLiked?: boolean
  isFavorited?: boolean
}

// 视频列表请求参数
export interface VideoListParams {
  page?: number
  pageSize?: number
  category?: string
  keyword?: string
  sortBy?: 'latest' | 'popular' | 'trending'
  userId?: string
}

// 视频详情响应
export interface VideoDetailResponse {
  video: Video
  relatedVideos: Video[]
  comments: Comment[]
  isLiked: boolean
  isFavorited: boolean
  watchProgress?: number
}

// 评论类型
export interface Comment {
  id: string
  content: string
  user: User
  videoId: string
  parentId?: string
  replies?: Comment[]
  likes: number
  isLiked?: boolean
  createdAt: string
  updatedAt: string
}

// 评论请求参数
export interface CommentParams {
  content: string
  videoId: string
  parentId?: string
}

// 收藏相关类型
export interface Favorite {
  id: string
  video: Video
  createdAt: string
}

// 历史记录类型
export interface History {
  id: string
  video: Video
  progress: number
  duration: number
  lastWatchedAt: string
}

// 搜索请求参数
export interface SearchParams {
  keyword: string
  type?: 'video' | 'user' | 'all'
  page?: number
  pageSize?: number
  category?: string
}

// 搜索响应
export interface SearchResponse {
  videos: Video[]
  users: User[]
  total: number
}

// 通知类型
export interface Notification {
  id: string
  type: 'like' | 'comment' | 'follow' | 'system'
  title: string
  content: string
  isRead: boolean
  createdAt: string
  data?: any
}

// 分类类型
export interface Category {
  id: string
  name: string
  icon?: string
  color?: string
  count?: number
  subCategories?: Category[]
}

// 文件上传响应
export interface UploadResponse {
  url: string
  filename: string
  size: number
  mimeType: string
}

// 统计数据类型
export interface Statistics {
  totalVideos: number
  totalUsers: number
  totalViews: number
  totalLikes: number
}

// 错误类型
export interface ApiError {
  code: number
  message: string
  details?: any
}

// 请求配置类型
export interface RequestConfig {
  showLoading?: boolean
  showError?: boolean
  retryCount?: number
  timeout?: number
}

// 响应状态类型
export interface ResponseStatus {
  loading: boolean
  error: string | null
  success: boolean
} 