<template>
  <div class="top-action-bar">
    <div class="action-btn" @click="handleAction">
      <img :src="installIcon" class="svg-icon" alt="install" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import install from '@/assets/images/icon/install.svg'

const authStore = useAuthStore()
const router = useRouter()

const installIcon = install

const handleAction = () => {
  if (authStore.isLoggedIn) {
    // 如果已登录，执行退出登录
    authStore.logout()
    // 可以添加提示信息
    console.log('已退出登录')
  } else {
    // 如果未登录，可以跳转到登录页或执行其他操作
    router.push('/login')
  }
}
</script>

<style lang="scss" scoped>
.top-action-bar {
  display: flex;
  justify-content: flex-end;
  gap: 22px;
  padding: 18px 18px 0 0;
  .action-btn {
    cursor: pointer;
    .svg-icon {
      width: 22px;
      height: 22px;
      display: block;
      transition: filter 0.2s;
    }
    &:hover .svg-icon {
      filter: none;
    }
  }
}
</style> 