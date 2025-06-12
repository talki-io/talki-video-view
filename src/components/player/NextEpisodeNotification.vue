<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="next-ep-toast"
      @mouseenter="pauseCountdown"
      @mouseleave="resumeCountdown"
    >
      <span class="icon-info">i</span>
      <span class="toast-content">{{ countdown }}秒后自动播放下一集</span>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  duration: { type: Number, default: 3 }
})
const emit = defineEmits(['update:modelValue', 'timeout'])

const visible = ref(props.modelValue)
const countdown = ref(props.duration)
let timer: number | null = null
let paused = false

watch(() => props.modelValue, (val) => {
  visible.value = val
  if (val) {
    startCountdown()
  } else {
    clearTimer()
  }
})

function startCountdown() {
  countdown.value = props.duration
  clearTimer()
  timer = window.setInterval(() => {
    if (!paused) {
      countdown.value--
      if (countdown.value <= 0) {
        clearTimer()
        visible.value = false
        emit('update:modelValue', false)
        emit('timeout')
      }
    }
  }, 1000)
}

function clearTimer() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

function pauseCountdown() {
  paused = true
}
function resumeCountdown() {
  paused = false
}

onBeforeUnmount(clearTimer)
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.next-ep-toast {
  position: fixed;
  top: 16px;
  right: 16px;
  left: auto;
  bottom: auto;
  background: rgba(30, 30, 30, 0.92);
  color: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.18);
  padding: 8px 18px 8px 14px;
  font-size: 15px;
  display: flex;
  align-items: center;
  min-width: 160px;
  z-index: 3000;
  pointer-events: auto;
}
.icon-info {
  display: inline-block;
  width: 18px;
  height: 18px;
  background: #fff3;
  color: #fff;
  border-radius: 50%;
  text-align: center;
  line-height: 18px;
  font-size: 13px;
  margin-right: 8px;
  font-style: normal;
}
.toast-content {
  flex: 1;
  white-space: nowrap;
}
@media (max-width: 600px) {
  .next-ep-toast {
    font-size: 13px;
    min-width: 120px;
    padding: 6px 10px 6px 10px;
    top: 8px;
    right: 8px;
  }
  .icon-info {
    width: 15px;
    height: 15px;
    font-size: 11px;
    line-height: 15px;
    margin-right: 6px;
  }
}
</style> 