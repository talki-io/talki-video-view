import httpClient from '@/utils/http'
import type {
  ApiResponse,
  SearchParams,
  SearchResponse,
  Video,
  User
} from '@/types/api'

/**
 * 搜索相关API接口
 */
export const searchApi = {
  /**
   * 搜索内容
   * @param params 搜索参数
   * @returns 搜索结果
   */
  search(params: SearchParams): Promise<ApiResponse<SearchResponse>> {
    return httpClient.get('/search', { params })
  },

  /**
   * 搜索视频
   * @param keyword 关键词
   * @param params 查询参数
   * @returns 视频搜索结果 
   */
  searchVideos(keyword: string, params?: { page?: number; pageSize?: number }): Promise<ApiResponse<{ videos: Video[]; total: number }>> {
    return httpClient.get('/search/videos', { params: { keyword, ...params } })
  },

  /**
   * 搜索用户
   * @param keyword 关键词
   * @param params 查询参数
   * @returns 用户搜索结果
   */
  searchUsers(keyword: string, params?: { page?: number; pageSize?: number }): Promise<ApiResponse<{ users: User[]; total: number }>> {
    return httpClient.get('/search/users', { params: { keyword, ...params } })
  },

  /**
   * 获取热门搜索
   * @returns 热门搜索列表
   */
  getHotSearches(): Promise<ApiResponse<string[]>> {
    return httpClient.get('/search/hot')
  },

  /**
   * 获取搜索建议
   * @param keyword 关键词
   * @returns 搜索建议列表
   */
  getSearchSuggestions(keyword: string): Promise<ApiResponse<string[]>> {
    return httpClient.get('/search/suggestions', { params: { keyword } })
  },

  /**
   * 获取搜索历史
   * @returns 搜索历史列表
   */
  getSearchHistory(): Promise<ApiResponse<string[]>> {
    return httpClient.get('/search/history')
  },

  /**
   * 清除搜索历史
   * @returns 操作结果
   */
  clearSearchHistory(): Promise<ApiResponse<{ message: string }>> {
    return httpClient.delete('/search/history')
  },

  /**
   * 添加搜索记录
   * @param keyword 搜索关键词
   * @returns 操作结果
   */
  addSearchRecord(keyword: string): Promise<ApiResponse<{ message: string }>> {
    return httpClient.post('/search/history', { keyword })
  }
}

// 导出默认对象
export default searchApi 