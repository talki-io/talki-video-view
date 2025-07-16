import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { storeToRefs } from 'pinia'

// 懒加载路由组件
const Home = () => import('@/views/Home.vue')

// 认证相关页面
const Login = () => import('@/views/auth/Login.vue')
const Register = () => import('@/views/auth/Register.vue')
const ForgotPassword = () => import('@/views/auth/ForgotPassword.vue')

// 搜索相关页面
const Search = () => import('@/views/search/Search.vue')
const SearchResultPage = () => import('@/views/search/SearchResultPage.vue')

// 播放器相关页面
const PlayPage = () => import('@/views/player/PlayPage.vue')

// 用户相关页面
const Profile = () => import('@/views/user/Profile.vue')
const Message = () => import('@/views/user/Message.vue')

// 系统相关页面
const Splash = () => import('@/views/system/Splash.vue')
const NotFound = () => import('@/views/system/NotFound.vue')

const router = createRouter({
  history: createWebHistory('/video/'),
  routes: [
    {
      path: '/',
      redirect: '/splash'
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        title: '首页',
        keepAlive: true
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: { 
        requiresAuth: true,
        title: '个人中心'
      }
    },
    {
      path: '/message',
      name: 'message',
      component: Message,
      meta: { 
        requiresAuth: true,
        title: '消息中心'
      }
    },
    {
      path: '/splash',
      name: 'splash',
      component: Splash,
      meta: {
        title: '启动页'
      }
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
      meta: {
        title: '搜索'
      }
    },
    {
      path: '/play',
      name: 'play',
      component: PlayPage,
      meta: {
        title: '视频播放'
      }
    },
    {
      path: '/search-result',
      name: 'search-result',
      component: SearchResultPage,
      meta: {
        title: '搜索结果'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: '登录',
        guest: true // 只有未登录用户可访问
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        title: '注册',
        guest: true
      }
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPassword,
      meta: {
        title: '重置密码',
        guest: true
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound,
      meta: {
        title: '页面不存在'
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // 如果有保存的位置，则滚动到该位置
    if (savedPosition) {
      return savedPosition
    }
    // 如果路由有hash，则滚动到hash位置
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    // 否则滚动到顶部
    return { top: 0 }
  }
})

// 路由守卫
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const { isLoggedIn } = storeToRefs(authStore)
  
  // 设置页面标题
  if (to.meta.title) {
    document.title = `${to.meta.title} - ${import.meta.env.VITE_APP_TITLE || 'ThinCell视频播放器'}`
  }
  
  // 检查是否需要认证
  if (to.meta.requiresAuth && !isLoggedIn.value) {
    // 保存原始路径，登录后跳转
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
    return
  }
  
  // 检查是否只允许未登录用户访问
  if (to.meta.guest && isLoggedIn.value) {
    next('/home')
    return
  }
  
  // 初始化认证状态（如果还没有初始化）
  if (!authStore.user && localStorage.getItem('token')) {
    try {
      await authStore.refreshUserInfo()
    } catch (error) {
      console.error('Failed to refresh user info:', error)
      authStore.clearAuth()
    }
  }
  
  next()
})

// 路由错误处理
router.onError((error) => {
  console.error('Router error:', error)
  // 可以在这里添加错误上报逻辑
})

export default router 