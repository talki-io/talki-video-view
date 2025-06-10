import type { App } from 'vue'
import ThImage from '@/components/global/ThImage.vue'

export default {
  install(app: App) {
    app.component('ThImage', ThImage)
  }
} 