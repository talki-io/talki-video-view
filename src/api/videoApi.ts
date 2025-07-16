import httpClient from '@/utils/http'
import type {
  ApiResponse,
  Video,
  VideoListParams,
  VideoDetailResponse,
  PaginatedResponse,
  Comment,
  CommentParams,
  Favorite,
  History
} from '@/types/api'

/**
 * 视频相关API接口
 */
export const videoApi = {
  /**
   * 获取视频列表
   * @param params 查询参数
   * @returns 视频列表
   */
  getVideoList(params: VideoListParams): Promise<ApiResponse<PaginatedResponse<Video>>> {
    return httpClient.get('/videos', { params })
  },

  /**
   * 获取视频详情
   * @param id 视频ID
   * @returns 视频详情
   */
  getVideoDetail(id: string): Promise<ApiResponse<VideoDetailResponse>> {
    return httpClient.get(`/videos/${id}`)
  },

  /**
   * 获取推荐视频
   * @param params 查询参数
   * @returns 推荐视频列表
   */
  getRecommendedVideos(params?: { page?: number; pageSize?: number }): Promise<ApiResponse<Video[]>> {
    return httpClient.get('/videos/recommended', { params })
  },

  /**
   * 获取热门视频
   * @param params 查询参数
   * @returns 热门视频列表
   */
  getHotVideos(params?: { page?: number; pageSize?: number }): Promise<ApiResponse<Video[]>> {
    return httpClient.get('/videos/hot', { params })
  },

  /**
   * 获取分类视频
   * @param category 分类名称
   * @param params 查询参数
   * @returns 分类视频列表
   */
  getVideosByCategory(category: string, params?: { page?: number; pageSize?: number }): Promise<ApiResponse<PaginatedResponse<Video>>> {
    return httpClient.get(`/videos/category/${category}`, { params })
  },

  /**
   * 点赞视频
   * @param id 视频ID
   * @returns 操作结果
   */
  likeVideo(id: string): Promise<ApiResponse<{ message: string }>> {
    return httpClient.post(`/videos/${id}/like`)
  },

  /**
   * 取消点赞视频
   * @param id 视频ID
   * @returns 操作结果
   */
  unlikeVideo(id: string): Promise<ApiResponse<{ message: string }>> {
    return httpClient.delete(`/videos/${id}/like`)
  },

  /**
   * 收藏视频
   * @param id 视频ID
   * @returns 操作结果
   */
  favoriteVideo(id: string): Promise<ApiResponse<{ message: string }>> {
    return httpClient.post(`/videos/${id}/favorite`)
  },

  /**
   * 取消收藏视频
   * @param id 视频ID
   * @returns 操作结果
   */
  unfavoriteVideo(id: string): Promise<ApiResponse<{ message: string }>> {
    return httpClient.delete(`/videos/${id}/favorite`)
  },

  /**
   * 获取收藏列表
   * @param params 查询参数
   * @returns 收藏列表
   */
  getFavorites(params?: { page?: number; pageSize?: number }): Promise<ApiResponse<PaginatedResponse<Favorite>>> {
    return httpClient.get('/user/favorites', { params })
  },

  /**
   * 获取观看历史
   * @param params 查询参数
   * @returns 观看历史
   */
  getHistory(params?: { page?: number; pageSize?: number }): Promise<ApiResponse<PaginatedResponse<History>>> {
    return httpClient.get('/user/history', { params })
  },

  /**
   * 更新观看进度
   * @param id 视频ID
   * @param progress 观看进度（秒）
   * @returns 操作结果
   */
  updateProgress(id: string, progress: number): Promise<ApiResponse<{ message: string }>> {
    return httpClient.post(`/videos/${id}/progress`, { progress })
  },

  /**
   * 获取视频评论
   * @param id 视频ID
   * @param params 查询参数
   * @returns 评论列表
   */
  getComments(id: string, params?: { page?: number; pageSize?: number }): Promise<ApiResponse<PaginatedResponse<Comment>>> {
    return httpClient.get(`/videos/${id}/comments`, { params })
  },

  /**
   * 发表评论
   * @param params 评论参数
   * @returns 评论结果
   */
  addComment(params: CommentParams): Promise<ApiResponse<Comment>> {
    return httpClient.post('/comments', params)
  },

  /**
   * 删除评论
   * @param id 评论ID
   * @returns 操作结果
   */
  deleteComment(id: string): Promise<ApiResponse<{ message: string }>> {
    return httpClient.delete(`/comments/${id}`)
  },

  /**
   * 点赞评论
   * @param id 评论ID
   * @returns 操作结果
   */
  likeComment(id: string): Promise<ApiResponse<{ message: string }>> {
    return httpClient.post(`/comments/${id}/like`)
  },

  /**
   * 取消点赞评论
   * @param id 评论ID
   * @returns 操作结果
   */
  unlikeComment(id: string): Promise<ApiResponse<{ message: string }>> {
    return httpClient.delete(`/comments/${id}/like`)
  }
}

// 导出默认对象
export default videoApi 