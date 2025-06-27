<template>
  <div class="user-info-page">
    <TopActionBar />
    <UserBaseInfo :user="user" />
    <div class="divider"></div>
    <div :class="['sticky-tab-bar', { fixed: isTabBarFixed }]" ref="tabBarRef">
      <UserTabBar :actions="actions" v-model="tab" />
    </div>
    <div :style="tabBarPlaceholderStyle"></div>
    <div class="tab-content">
      <Transition name="tab-fade" mode="out-in">
        <component :is="tab === 'favorite' ? MyFavorite : HistoryList" />
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import TopActionBar from './TopActionBar.vue'
import MyFavorite from './MyFavorite.vue'
import HistoryList from './HistoryList.vue'
import UserBaseInfo from './UserBaseInfo.vue'
import UserTabBar from './UserTabBar.vue'
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import startImg from '@/assets/images/icon/start.png'
import history from '@/assets/images/icon/history.png'
import uitFavorite from '@/assets/images/icon/uitFavorite.png'

const user = ref({
  avatar: startImg,
  username: '晴天下的情绪',
  bcoin: 0,
  coin: 2104,
  uid: 2104,
  stats: {
    posts: 5,
    follows: 66,
    fans: 8
  }
})

const tab = ref('favorite')

const actions = [
  { icon: uitFavorite, label: '我的收藏', key: 'favorite' },
  { icon: history, label: '历史记录', key: 'history' }
]

const tabBarRef = ref<HTMLElement | null>(null)
const isTabBarFixed = ref(false)
const tabBarPlaceholderStyle = ref({})
let tabBarOriginTop = 0;

function handleScroll() {
  if (!tabBarRef.value) return
  const rect = tabBarRef.value.getBoundingClientRect()
  const scrollY = window.scrollY || window.pageYOffset
  if (!tabBarOriginTop) {
    tabBarOriginTop = tabBarRef.value.offsetTop + rect.top + scrollY - rect.top
  }
  if (scrollY >= tabBarOriginTop) {
    isTabBarFixed.value = true
    tabBarPlaceholderStyle.value = { height: rect.height + 'px' }
  } else {
    isTabBarFixed.value = false
    tabBarPlaceholderStyle.value = { height: 0 }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  nextTick(() => handleScroll())
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
.user-info-page {
  margin: 0 auto;
  padding: 0 0 32px 0;
  font-family: 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif;
  color: #222;
  background: #fff;
  position: relative;
  overflow: visible !important;
  @media (max-width: 600px) {
    max-width: 100vw;
    padding: 0 0 24px 0;
  }
}
.divider {
  height: 1px;
  background: #f5f5f5;
  margin: 18px 0 0 0;
}
.tab-content {
  min-height: 200px;
  position: relative;
}
.tab-fade-enter-active, .tab-fade-leave-active {
  transition: opacity 0.35s cubic-bezier(0.4,0,0.2,1);
}
.tab-fade-enter-from, .tab-fade-leave-to {
  opacity: 0;
}
.tab-fade-enter-to, .tab-fade-leave-from {
  opacity: 1;
}
.sticky-tab-bar {
  background: #fff;
  transition: box-shadow 0.2s;
  z-index: 99;
  width: 100%;
}
.sticky-tab-bar.fixed {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  width: 100vw;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  z-index: 99;
}
</style> 