<template>
  <div class="episode-header">
    <div class="title">选集<span v-if="total">（{{ total }}）</span></div>
    <div class="status" @click="showPopup = true">
      <span class="status-text">{{ status }}</span>
      <span v-if="total" class="total">，全{{ total }}话</span>
      <svg class="arrow" viewBox="0 0 24 24" width="16" height="16"><path d="M9 6l6 6-6 6" stroke="#bbb" stroke-width="2" fill="none" stroke-linecap="round"/></svg>
    </div>
    <PlayEpisodePopup v-if="showPopup" :total="total" :status="status" :seasons="seasons" :episodes="episodes" :active-season="activeSeason" @close="showPopup = false" @select="onSelect" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PlayEpisodePopup from './PlayEpisodePopup.vue'

interface Episode {
  title: string
  vip: boolean
  available: boolean
}

const props = defineProps<{
  status?: string
  total?: number
  seasons?: string[]
  episodes?: Episode[][]
  activeSeason?: number
}>()

const emit = defineEmits(['select'])
const showPopup = ref(false)

function onSelect(e: any) {
  emit('select', e)
}
</script>

<style lang="scss" scoped>
.episode-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 4px 8px 4px;
  .title {
    font-size: 16px;
    color: #222;
    font-weight: 500;
  }
  .status {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #bbb;
    .status-text {
      color: #bbb;
    }
    .total {
      color: #bbb;
      margin-left: 2px;
    }
    .arrow {
      margin-left: 2px;
      vertical-align: middle;
    }
  }
}
</style> 