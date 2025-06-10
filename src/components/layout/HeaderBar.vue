<template>
  <div class="header-bar">
    <div class="avatar">
      <img :src="avatarUrl" alt="avatar" />
    </div>
    <div class="search-box">
      <input type="text" placeholder="4点的海棠花未眠" />
    </div>
    <div class="icon-btn" @click="goMessage">
      <div class="icon-message-wrap">
        <svg class="icon-message-svg" viewBox="0 0 1024 1024" width="22" height="22"><path d="M128 224h768a32 32 0 0 1 32 32v512a32 32 0 0 1-32 32H128a32 32 0 0 1-32-32V256a32 32 0 0 1 32-32zm32 64v448h704V288l-352 256L160 288zm64-32l288 210.7L832 256H192z" fill="#ff5c8a"/></svg>
        <span class="msg-dot"></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import avatarUrl from '@/assets/images/start.png'
import { useRouter } from 'vue-router'
const router = useRouter()
function goMessage() {
  router.push('/message')
}
</script>

<style lang="scss" scoped>
.header-bar {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
  .avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 12px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .search-box {
    flex: 1;
    input {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #eee;
      border-radius: 20px;
      background: #f5f5f5;
      font-size: 15px;
      outline: none;
    }
  }
  .icon-btn {
    margin-left: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    .icon-message-wrap {
      position: relative;
      .icon-message-svg {
        display: block;
      }
      .msg-dot {
        position: absolute;
        right: 0;
        top: 0;
        width: 8px;
        height: 8px;
        background: #ff5c8a;
        border-radius: 50%;
        border: 2px solid #fff;
        display: block;
      }
    }
  }
}
</style> 