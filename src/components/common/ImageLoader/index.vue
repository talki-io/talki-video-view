<template>
  <div class="image-loader" :class="{ loading: isLoading, error: hasError }">
    <img
      v-lazy
      :data-src="src"
      :alt="alt"
      @load="handleLoad"
      @error="handleError"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  src: string
  alt?: string
}

defineProps<Props>()

const isLoading = ref(true)
const hasError = ref(false)

const handleLoad = () => {
  isLoading.value = false
}

const handleError = () => {
  isLoading.value = false
  hasError.value = true
}
</script>

<style lang="scss" scoped>
.image-loader {
  position: relative;
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 0.3s ease-in-out;
  }

  &.loading {
    img {
      opacity: 0;
    }

    &::after {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 40px;
      height: 40px;
      background: url('@/assets/images/loading-animation.gif') center/cover no-repeat;
    }
  }

  &.error {
    img {
      opacity: 0.5;
    }

    &::after {
      content: '加载失败';
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      color: #999;
      font-size: 14px;
    }
  }
}
</style> 