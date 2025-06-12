<template>
  <div class="profile-page">
    <div class="profile-header">
      <img :src="startImg" class="avatar" />
      <div class="username">未登录用户</div>
    </div>
    <button class="logout-btn">退出登录</button>
  </div>
</template>

<script setup lang="ts">
import startImg from '@/assets/images/start.png'
</script>

<style lang="scss" scoped>
.profile-page {
  padding: 100px 0 80px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  .profile-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    .avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin-bottom: 16px;
    }
    .username {
      font-size: 18px;
      color: #333;
      margin-bottom: 24px;
    }
  }
  .logout-btn {
    padding: 8px 32px;
    background: #f56c6c;
    color: #fff;
    border: none;
    border-radius: 20px;
    font-size: 15px;
    cursor: pointer;
  }
}

@media (max-width: 600px) {
  .profile-page {
    padding: 88px 0 80px 0;
  }
}
</style> 