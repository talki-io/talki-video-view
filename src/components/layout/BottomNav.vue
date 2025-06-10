<template>
  <div class="bottom-nav">
    <div class="nav-item" :class="{active: activeIdx===0}" @click="go(0)">
      <svg class="icon-home" viewBox="0 0 1024 1024" width="24" height="24"><path d="M512 128l384 320v416a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V448z" fill="#fff"/><path d="M512 128l384 320v416a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V448z" fill="#ff5c8a" fill-opacity=".15"/><path d="M512 128l384 320v416a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V448z" stroke="#ff5c8a" stroke-width="32" fill="none"/><path d="M384 896V640h256v256" stroke="#ff5c8a" stroke-width="32" fill="none"/></svg>
      <span>首页</span>
    </div>
    <div class="nav-item" :class="{active: activeIdx===1}" @click="go(1)">
      <svg class="icon-user" viewBox="0 0 1024 1024" width="24" height="24"><circle cx="512" cy="384" r="128" fill="#ff5c8a" fill-opacity=".15"/><circle cx="512" cy="384" r="128" stroke="#ff5c8a" stroke-width="32" fill="none"/><path d="M192 832c0-106 134-160 320-160s320 54 320 160" stroke="#ff5c8a" stroke-width="32" fill="none"/></svg>
      <span>我的</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const activeIdx = ref(0)
function go(idx:number) {
  activeIdx.value = idx
  if(idx===0) router.push('/')
  else router.push('/profile')
}
</script>

<style lang="scss" scoped>
.bottom-nav {
  position: fixed;
  left: 0; right: 0; bottom: 0;
  height: 56px;
  background: #fff;
  box-shadow: 0 -2px 8px rgba(0,0,0,0.04);
  display: flex;
  z-index: 100;
  .nav-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #888;
    font-size: 13px;
    &.active {
      color: #ff5c8a;
    }
    svg {
      margin-bottom: 2px;
    }
  }
}
</style> 