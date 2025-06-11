<template>
  <div class="episode-panel">
    <PlayEpisodeHeader
      :status="status"
      :total="total"
      :seasons="seasons"
      :episodes="episodes"
      :active-season="activeSeason"
      @select="onSelect"
      @season-change="(val: number) => emit('season-change', val)"
    />
    <div class="season-tabs">
      <div v-for="(season, idx) in seasons" :key="season + '-' + idx" :class="['season-tab', {active: idx===activeSeason}]" @click="$emit('season-change', idx)">{{ season }}</div>
    </div>
    <div class="episode-list">
      <div v-for="(ep, idx) in episodes[activeSeason]" :key="'ep-' + idx" :class="['episode-item', {active: idx===activeEpisode}]" @click="$emit('episode-change', idx)">{{ ep.title }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PlayEpisodeHeader from './PlayEpisodeHeader.vue'

interface Episode {
  title: string
  vip: boolean
  available: boolean
}

const props = defineProps<{
  seasons: string[]
  episodes: { title: string; vip: boolean; available: boolean; }[][]
  activeSeason: number
  activeEpisode: number
  status?: string
  total?: number
  categories?: any[][]
}>()

const emit = defineEmits(['season-change', 'episode-change'])

function onSelect({ rowIdx, epIdx }: { rowIdx: number; epIdx: number }) {
  emit('season-change', rowIdx)
  emit('episode-change', epIdx)
}
</script>

<style lang="scss" scoped>
.episode-panel {
  background: #fff;
  padding: 12px 10px 8px 10px;
  .season-tabs {
    display: flex;
    gap: 12px;
    margin-bottom: 10px;
    overflow-x: auto;
    white-space: nowrap;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
    .season-tab {
      padding: 4px 16px;
      border-radius: 16px;
      background: #f5f5f5;
      color: #888;
      font-size: 14px;
      cursor: pointer;
      &.active {
        background: #ff5c8a;
        color: #fff;
      }
    }
  }
  .episode-list {
    display: flex;
    flex-wrap: nowrap;
    gap: 8px 10px;
    overflow-x: auto;
    white-space: nowrap;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
    .episode-item {
      padding: 6px 16px;
      border-radius: 8px;
      background: #f5f5f5;
      color: #333;
      font-size: 14px;
      cursor: pointer;
      &.active {
        background: #ff5c8a;
        color: #fff;
      }
    }
  }
}
.season-tab, .episode-item {
  transition: background 0.25s cubic-bezier(.55,0,.1,1), color 0.25s cubic-bezier(.55,0,.1,1);
}
</style> 