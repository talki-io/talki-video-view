import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Splash from '@/views/Splash.vue'
import Profile from '@/views/Profile.vue'
import Message from '@/views/Message.vue'
import Search from '@/views/Search.vue'
import PlayPage from '@/views/PlayPage.vue'
import SearchResultPage from '@/views/SearchResultPage.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import ForgotPassword from '@/views/ForgotPassword.vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

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
      component: Home
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: { requiresAuth: true }
    },
    {
      path: '/message',
      name: 'message',
      component: Message,
      meta: { requiresAuth: true }
    },
    {
      path: '/splash',
      name: 'splash',
      component: Splash
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/play',
      name: 'play',
      component: PlayPage
    },
    {
      path: '/search-result',
      name: 'search-result',
      component: SearchResultPage
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPassword
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const { isLoggedIn } = storeToRefs(authStore)
  // 判断 meta.requiresAuth
  if (to.meta.requiresAuth && !isLoggedIn.value) {
    next('/login')
    return
  }
  next()
})

export default router 