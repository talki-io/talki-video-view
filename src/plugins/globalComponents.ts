import type { App } from 'vue'
import ThImage from '@/components/global/ThImage.vue'
import ErrorBoundary from '@/components/common/ErrorBoundary.vue'
import lazyload from '@/directives/lazyload'

export default {
  install(app: App) {
    // 注册全局组件
    app.component('ThImage', ThImage)
    app.component('ErrorBoundary', ErrorBoundary)
    
    // 注册全局指令
    app.directive('lazy', lazyload)
    
    // 全局错误处理
    app.config.errorHandler = (err, instance, info) => {
      console.error('Global error:', err)
      console.error('Component:', instance)
      console.error('Error info:', info)
      
      // 这里可以添加错误上报逻辑
      // 例如发送到Sentry或其他错误监控服务
    }
    
    // 全局警告处理
    app.config.warnHandler = (msg, instance, trace) => {
      console.warn('Global warning:', msg)
      console.warn('Component:', instance)
      console.warn('Trace:', trace)
    }
  }
} 