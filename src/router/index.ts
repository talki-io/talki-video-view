import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Splash from '@/views/Splash.vue'
import Profile from '@/views/Profile.vue'
import Message from '@/views/Message.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
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
    }
  ]
})

export default router 