import type { App } from 'vue'
import lazyload from '@/directives/lazyload'

export default {
  install(app: App) {
    app.directive('lazy', lazyload)
  }
} 