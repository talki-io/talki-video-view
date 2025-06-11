<template>
  <div 
    class="infinite-scroll" 
    ref="scrollRef" 
    @scroll.passive="handleScroll"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <div v-if="enablePullRefresh" class="pull-refresh" :style="{ height: `${pullDistance}px` }">
      <div class="pull-refresh-content" :class="{ 'is-pulling': isPulling }">
        <span v-if="!isPulling">下拉刷新</span>
        <span v-else>释放刷新</span>
      </div>
    </div>
    <slot></slot>
    <div v-if="loading" class="loading-more">
      <div class="loading-spinner"></div>
      <span>加载中...</span>
    </div>
    <div v-if="!hasMore && !loading && !error" class="no-more">
      <span>没有更多了</span>
    </div>
    <div v-if="error" class="error-message">
      <span>{{ errorMessage }}</span>
      <button class="retry-button" @click="retry">重试</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const props = defineProps<{
  loading: boolean
  hasMore: boolean
  threshold?: number
  enablePullRefresh?: boolean
  error?: boolean
  errorMessage?: string
}>()

const emit = defineEmits<{
  (e: 'loadMore'): void
  (e: 'refresh'): void
  (e: 'retry'): void
}>()

const scrollRef = ref<HTMLElement | null>(null)
const isPulling = ref(false)
const pullDistance = ref(0)
const startY = ref(0)
const lastScrollTop = ref(0)
const scrollTimer = ref<number | null>(null)

// 防抖处理
function debounce(fn: Function, delay: number) {
  let timer: number | null = null
  return function(this: any, ...args: any[]) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay) as unknown as number
  }
}

// 处理滚动
const handleScroll = debounce(async () => {
  if (props.loading || !props.hasMore || props.error) return
  
  await nextTick()
  const el = scrollRef.value
  if (!el) return
  
  const threshold = props.threshold || 100
  const scrollTop = el.scrollTop
  const clientHeight = el.clientHeight
  const scrollHeight = el.scrollHeight
  
  // 检测是否滚动到底部
  if (scrollTop + clientHeight >= scrollHeight - threshold) {
    lastScrollTop.value = scrollTop
    emit('loadMore')
  }
}, 200)

// 下拉刷新相关
function handleTouchStart(e: TouchEvent) {
  if (!props.enablePullRefresh) return
  const el = scrollRef.value
  if (!el) return
  
  // 只有在顶部时才允许下拉刷新
  if (el.scrollTop === 0) {
    startY.value = e.touches[0].clientY
  }
}

function handleTouchMove(e: TouchEvent) {
  if (!props.enablePullRefresh || !startY.value) return
  const el = scrollRef.value
  if (!el) return
  
  const currentY = e.touches[0].clientY
  const distance = currentY - startY.value
  
  // 只允许向下拉动
  if (distance > 0 && el.scrollTop === 0) {
    e.preventDefault()
    pullDistance.value = Math.min(distance * 0.5, 100)
    isPulling.value = pullDistance.value > 50
  }
}

function handleTouchEnd() {
  if (!props.enablePullRefresh || !startY.value) return
  
  if (isPulling.value) {
    emit('refresh')
  }
  
  // 重置状态
  startY.value = 0
  pullDistance.value = 0
  isPulling.value = false
}

function retry() {
  emit('retry')
}

// 监听窗口大小变化
function handleResize() {
  if (scrollTimer.value) {
    clearTimeout(scrollTimer.value)
  }
  scrollTimer.value = setTimeout(() => {
    if (scrollRef.value) {
      scrollRef.value.scrollTop = lastScrollTop.value
    }
  }, 100) as unknown as number
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  if (scrollRef.value) {
    scrollRef.value.scrollTop = 0
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (scrollTimer.value) {
    clearTimeout(scrollTimer.value)
  }
})
</script>

<style lang="scss" scoped>
.infinite-scroll {
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  position: relative;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
}

.pull-refresh {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  transition: height 0.3s;
  
  &-content {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
    font-size: 14px;
    transform: translateY(-100%);
    transition: transform 0.3s;
    
    &.is-pulling {
      transform: translateY(0);
    }
  }
}

.loading-more {
  text-align: center;
  color: #888;
  font-size: 14px;
  padding: 16px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.no-more {
  text-align: center;
  color: #bbb;
  font-size: 14px;
  padding: 12px 0;
}

.error-message {
  text-align: center;
  color: #ff4d4f;
  font-size: 14px;
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  
  .retry-button {
    padding: 4px 12px;
    border: 1px solid #ff4d4f;
    border-radius: 4px;
    background: transparent;
    color: #ff4d4f;
    font-size: 12px;
    cursor: pointer;
    
    &:active {
      opacity: 0.8;
    }
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style> 