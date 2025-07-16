import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/styles/global.scss'
import App from './App.vue'
import router from './router'

import globalComponents from './plugins/globalComponents'
import performanceMonitor from './utils/performance'

// 创建应用实例
const app = createApp(App)
const pinia = createPinia()

// 注册插件
app.use(pinia)
app.use(ElementPlus)
app.use(router)

app.use(globalComponents)

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

// 开发环境下的性能监控
if (import.meta.env.DEV) {
  console.log('Performance monitoring enabled in development mode')
  // 可以在这里添加开发环境特定的性能监控
}

// 挂载应用
app.mount('#app')

// 导出性能监控实例供开发时使用
if (import.meta.env.DEV) {
  (window as any).performanceMonitor = performanceMonitor
}
