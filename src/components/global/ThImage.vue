<template>
  <div 
    class="th-image" 
    :class="[fit, { 'is-round': round }]" 
    :style="{ width, height }"
  >
    <img
      v-show="!isLoading && !hasError"
      :src="src"
      :alt="alt"
      class="image"
      @load="handleLoad"
      @error="handleError"
    />
    <div v-if="isLoading" class="loading-wrap">
      <img class="loading-gif" src="@/assets/images/icon/Loading-animation.gif" />
    </div>
    <div v-if="hasError" class="error-wrap">
      <svg class="error-icon" viewBox="0 0 24 24" fill="none" stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  src: string
  alt?: string
  width?: string
  height?: string
  fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
  round?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  alt: '',
  width: '100%',
  height: '100%',
  fit: 'cover',
  round: false
})

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
.th-image {
  position: relative;
  overflow: hidden;
  
  &.is-round {
    border-radius: 50%;
    .image, .loading-wrap, .error-wrap {
      border-radius: 50%;
    }
  }
  
  &.fill {
    .image { object-fit: fill; }
  }
  &.contain {
    .image { object-fit: contain; }
  }
  &.cover {
    .image { object-fit: cover; }
  }
  &.none {
    .image { object-fit: none; }
  }
  &.scale-down {
    .image { object-fit: scale-down; }
  }

  .image {
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  .loading-wrap, .error-wrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f5f5f5;
  }

  .loading-gif {
    width: min(40%, 120px);
    height: min(40%, 120px);
    min-width: 60px;
    min-height: 60px;
    object-fit: contain;
  }

  .error-icon {
    width: min(30%, 80px);
    height: min(30%, 80px);
    min-width: 40px;
    min-height: 40px;
    opacity: 0.5;
  }

  // 图片加载完成后显示
  img[src]:not([src=""]):not(.loading-gif):not(.error-img) {
    opacity: 1;
  }
}
</style> 