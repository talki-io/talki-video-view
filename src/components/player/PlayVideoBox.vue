<template>
  <div class="play-video-box">
    <div class="video-cover-wrap">
      <img class="video-cover" :src="cover" alt="cover" />
      <div class="danmaku-btn" @click="$emit('danmaku')">弹</div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{ cover: string }>()
const emit = defineEmits(['danmaku'])
</script>
<style lang="scss" scoped>
.play-video-box {
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #23211a;
  .video-cover-wrap {
    position: relative;
    width: 320px;
    height: 420px;
    background: #111;
    border-radius: 12px;
    overflow: hidden;
    .video-cover {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .danmaku-btn {
      position: absolute;
      right: 12px;
      top: 12px;
      background: #fff;
      color: #ff5c8a;
      border-radius: 50%;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-weight: 600;
      box-shadow: 0 2px 8px rgba(0,0,0,0.12);
      cursor: pointer;
      z-index: 2;
    }
  }
}
</style> 