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
  padding-top: 60px;
  
  .msg-empty {
    color: #888;
    font-size: 18px;
  }
}

@media (max-width: 600px) {
  .message-page {
    padding-top: 48px;
  }
}
</style> 