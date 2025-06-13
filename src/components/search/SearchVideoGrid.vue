<template>
  <div class="search-video-grid">
    <div class="video-grid">
      <div class="video-card" v-for="video in videos" :key="video.id" @click="$emit('select', video)" style="cursor:pointer">
        <div class="thumb-wrap">
          <ThImage :src="video.cover" :alt="video.title" />
          <div class="episode-count">全{{ video.episodes }}集</div>
          <div class="video-info-bar">
            <span class="info-item">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="#fff">
                <path d="M3,3 L21,3 L21,21 L3,21 L3,3 Z M5,5 L5,19 L19,19 L19,5 L5,5 Z M9,8 L16,12 L9,16 L9,8 Z"/>
              </svg>
              {{ video.views }}
            </span>
            <span class="info-item time">{{ video.duration }}</span>
          </div>
        </div>
        <div class="video-title">{{ video.title }}</div>
        <div class="video-meta">
          <span class="up">UP · {{ video.up }}</span>
          <span class="cat" :style="{ color: video.catColor, background: video.catBg }">{{ video.cat }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ThImage from '@/components/global/ThImage.vue'

const props = defineProps<{
  keyword: string
  videos: Array<{
    id: string|number
    cover: string
    title: string
    up: string
    cat: string
    catColor?: string
    catBg?: string
    episodes: number
    views: string
    duration: string
  }>
}>()
</script>

<style lang="scss" scoped>
.search-video-grid {
  width: 100%;
  // max-width: 700px;
  margin: 0 auto;
  padding: 0 10px;
  box-sizing: border-box;
  .video-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 14px 10px;
    @media (max-width: 600px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 8px 4px;
    }
    .video-card {
      background: #fff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 12px rgba(0,0,0,0.08);
      display: flex;
      flex-direction: column;
      .thumb-wrap {
        position: relative;
        width: 100%;
        aspect-ratio: 16/9;
        background: #eee;
        .thumb {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .episode-count {
          position: absolute;
          top: 8px;
          right: 8px;
          background: rgba(0,0,0,0.7);
          color: #fff;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 13px;
        }
        .video-info-bar {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          padding: 0 8px 8px 8px;
          font-size: 13px;
          color: #fff;
          text-shadow: 0 2px 8px rgba(0,0,0,0.18);
          .info-item {
            display: flex;
            align-items: center;
            gap: 3px;
            svg {
              margin-right: 1px;
              opacity: 0.9;
            }
          }
          .time {
            margin-left: auto;
            font-size: 12px;
            background: rgba(0,0,0,0.45);
            border-radius: 4px;
            padding: 0 4px;
          }
        }
      }
      .video-title {
        padding: 8px 10px 0 10px;
        font-size: 15px;
        color: #222;
        font-weight: 500;
        width: 100%;
        line-height: 1.3;
      }
      .video-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px 10px 10px;
        font-size: 13px;
        color: #888;
        .up {
          font-weight: 400;
        }
        .cat {
          background: #f5f5f5;
          border-radius: 6px;
          padding: 2px 8px;
          font-size: 12px;
          margin-left: 8px;
        }
      }
    }
  }
  @media (max-width: 600px) {
    max-width: 100vw;
    padding: 0 4px;
  }
}
</style> 