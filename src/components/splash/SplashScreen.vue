<template>
  <div class="splash-screen" :class="{ 'fade-out': isFading }">
    <div class="splash-countdown">{{ countdown }}s 跳过</div>
    <div class="splash-content">
      <template v-if="type === 'video'">
        <video
          class="splash-media"
          :src="src"
          autoplay
          muted
          loop
          playsinline
        />
      </template>
      <template v-else>
        <img class="splash-media" :src="src" alt="Splash" />
      </template>
      <div class="splash-title">{{ title }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import startImg from '@/assets/images/icon/start.png'

const props = defineProps<{
  type?: 'image' | 'video' | 'gif'
  src?: string
  title?: string
}>()

const router = useRouter()
const isFading = ref(false)
const countdown = ref(3)

const type = props.type || 'image'
const src = props.src || startImg
const title = props.title || 'Thincell Video'

onMounted(() => {
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
    }
  }, 1000)
  setTimeout(() => {
    isFading.value = true
  }, 2500)
  setTimeout(() => {
    router.push('/home')
  }, 3000)
})
</script>

<style lang="scss" scoped>
.splash-screen {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  transition: opacity 0.5s ease;

  &.fade-out {
    opacity: 0;
  }
}

.splash-countdown {
  position: absolute;
  top: 24px;
  right: 32px;
  color: #fff;
  font-size: 1.1rem;
  font-weight: bold;
  background: rgba(0,0,0,0.35);
  padding: 6px 16px;
  border-radius: 16px;
  letter-spacing: 1px;
  z-index: 10001;
}

.splash-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  justify-content: center;
}

.splash-media {
  width: 100vw;
  height: 100vh;
  max-width: 100vw;
  max-height: 100vh;
  object-fit: cover;
  border-radius: 0;
  background: #222;
  box-shadow: none;
  display: block;
}

.splash-title {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 48px;
  font-size: 2.2rem;
  color: #fff;
  font-weight: bold;
  text-shadow: 0 2px 8px rgba(0,0,0,0.4);
  text-align: center;
}

@media (max-width: 600px) {
  .splash-title {
    font-size: 1.2rem;
    bottom: 16px;
  }
  .splash-countdown {
    top: 8px;
    right: 12px;
    font-size: 0.9rem;
    padding: 4px 10px;
  }
}
</style> 