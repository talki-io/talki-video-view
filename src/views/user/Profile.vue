<template>
  <div class="profile-page">
    <user-info />
    <bottom-nav />
  </div>
</template>

<script setup lang="ts">
import UserInfo from '@/components/profile/UserInfo.vue'
import BottomNav from '@/components/layout/BottomNav.vue'
</script>

<style lang="scss" scoped>
.profile-page {
  min-height: 100vh;
  padding-bottom: 56px;
}
</style> 