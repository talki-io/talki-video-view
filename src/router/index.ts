import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Splash from '@/views/Splash.vue'
import Profile from '@/views/Profile.vue'
import Message from '@/views/Message.vue'
import SearchPage from '@/views/SearchPage.vue'

const router = createRouter({
  history: createWebHistory(),
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
      component: Profile
    },
    {
      path: '/message',
      name: 'message',
      component: Message
    },
    {
      path: '/splash',
      name: 'splash',
      component: Splash
    },
    {
      path: '/search',
      name: 'search',
      component: SearchPage
    }
  ]
})

export default router 