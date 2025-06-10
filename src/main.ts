import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/styles/global.scss'
import App from './App.vue'
import router from './router'
import lazyLoadPlugin from './plugins/lazyload'
import globalComponents from './plugins/globalComponents'

const app = createApp(App)

app.use(createPinia())
app.use(ElementPlus)
app.use(router)
app.use(lazyLoadPlugin)
app.use(globalComponents)

app.mount('#app')
