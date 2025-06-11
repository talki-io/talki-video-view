import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Splash from '@/views/Splash.vue'
import Profile from '@/views/Profile.vue'
import Message from '@/views/Message.vue'
import Search from '@/views/Search.vue'
import PlayPage from '@/views/PlayPage.vue'
import SearchResultPage from '@/views/SearchResultPage.vue'

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
    }
  ]
})

export default router 