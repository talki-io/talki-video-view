<template>
  <div class="episode-popup-mask" @click.self="$emit('close')">
    <div class="episode-popup">
      <div class="popup-header">
        <div class="popup-bar"></div>
        <div class="popup-title">选集 <span v-if="total">（{{ total }}）</span></div>
        <svg class="popup-close" viewBox="0 0 24 24" width="22" height="22" @click="$emit('close')"><path d="M6 6l12 12M18 6l-12 12" stroke="#bbb" stroke-width="2" fill="none" stroke-linecap="round"/></svg>
      </div>
      <div class="popup-seasons">
        <div v-for="(season, idx) in seasons" :key="season" :class="['season-tab', {active: idx === innerActiveSeason}]" @click="selectSeason(idx)">{{ season }}</div>
      </div>
      <div class="popup-status">{{ status }}，全{{ total }}话</div>
      <div class="popup-list">
        <div class="popup-ep" v-for="(ep, idx) in currentEpisodes" :key="'ep-' + idx" @click="selectEpisode(idx)">
          <div class="ep-title">{{ ep.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

interface Episode {
  title: string
  vip: boolean
  available: boolean
}

const props = defineProps<{
  total?: number
  status?: string
  seasons?: string[]
  episodes?: Episode[][]
  activeSeason?: number
}>()

const emit = defineEmits(['close', 'select', 'season-change'])
const innerActiveSeason = ref(props.activeSeason ?? 0)

watch(() => props.activeSeason, val => {
  if (val !== undefined) innerActiveSeason.value = val
})

const seasons = computed(() => props.seasons || [])
const currentEpisodes = computed(() => (props.episodes && props.episodes[innerActiveSeason.value]) || [])

function selectSeason(idx: number) {
  innerActiveSeason.value = idx
  emit('season-change', idx)
}

function selectEpisode(epIdx: number) {
  emit('select', { rowIdx: innerActiveSeason.value, epIdx })
  emit('season-change', innerActiveSeason.value)
  emit('close')
}
</script>

<style lang="scss" scoped>
.episode-popup-mask {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.18);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.episode-popup {
  width: 100vw;
  background: #fff;
  border-radius: 18px 18px 0 0;
  box-shadow: 0 -2px 24px rgba(0,0,0,0.10);
  padding-bottom: env(safe-area-inset-bottom, 16px);
  animation: popupIn 0.25s cubic-bezier(.55,0,.1,1);
  height: 72vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
@keyframes popupIn {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}
.popup-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px 0 16px;
  position: relative;
}
.popup-bar {
  position: absolute;
  top: 6px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 4px;
  background: #e5e5e5;
  border-radius: 2px;
}
.popup-title {
  font-size: 17px;
  color: #222;
  font-weight: 600;
  flex: 1;
  text-align: center;
}
.popup-close {
  cursor: pointer;
}
.popup-seasons {
  display: flex;
  gap: 12px;
  padding: 12px 16px 8px 16px;
  .season-tab {
    padding: 6px 18px;
    border-radius: 16px;
    background: #f5f5f5;
    color: #888;
    font-size: 15px;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
    &.active {
      background: #ff5c8a;
      color: #fff;
    }
  }
}
.popup-status {
  color: #bbb;
  font-size: 14px;
  padding: 4px 16px 8px 16px;
}
.popup-list {
  overflow-y: auto;
  padding: 0 16px max(40px, env(safe-area-inset-bottom, 24px)) 16px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px 14px;
}
.popup-ep {
  background: #f7f8fa;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  padding: 18px 0 18px 0;
  display: flex;
  align-items: center;
  font-size: 17px;
  color: #222;
  min-width: 0;
  justify-content: center;
  position: relative;
  cursor: pointer;
  transition: box-shadow 0.18s, background 0.18s, color 0.18s;
  .ep-title {
    font-weight: 500;
    font-size: 17px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    letter-spacing: 1px;
  }
  &:hover {
    background: #fff0f6;
    box-shadow: 0 4px 16px rgba(255,92,138,0.10);
    color: #ff5c8a;
  }
  &.active {
    background: #ff5c8a;
    color: #fff;
    box-shadow: 0 6px 20px rgba(255,92,138,0.18);
  }
}
</style> 