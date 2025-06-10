<template>
  <div class="message-page">
    <div class="msg-empty">暂无消息</div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.message-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--background-color);
  .msg-empty {
    color: #888;
    font-size: 18px;
  }
}
</style> 