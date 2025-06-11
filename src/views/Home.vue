<template>
  <div class="home">
    <HeaderBar />
    <CategoryBar @category-change="handleCategoryChange" />
    <BannerArea />
    <FollowUpdate />
    <SectionDivider :title="sectionTitle" />
    <VideoGrid :videos="videos" :loading="loading" :hasMore="hasMore" @load-more="loadMore" />
    <BottomNav />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HeaderBar from '@/components/layout/HeaderBar.vue'
import CategoryBar from '@/components/layout/CategoryBar.vue'
import BannerArea from '@/components/layout/BannerArea.vue'
import FollowUpdate from '@/components/layout/FollowUpdate.vue'
import VideoGrid from '@/components/layout/VideoGrid.vue'
import BottomNav from '@/components/layout/BottomNav.vue'
import SectionDivider from '@/components/common/SectionDivider.vue'

const sectionTitle = ref('推荐内容')

// 视频数据与加载逻辑
type VideoItem = {
  title: string
  poster: string
  views: string
  duration: string
  up: string
  cat: string
  episodes: number
  isRecommend: number
}
const allVideos = ref<VideoItem[]>([])
const videos = ref<VideoItem[]>([])
const loading = ref(false)
const hasMore = ref(true)
const PAGE_SIZE = 8
const MAX_TOTAL = 30

function fakeVideo(idx: number): VideoItem {
  return {
    title: `示例视频${idx+1}`,
    poster: `https://picsum.photos/600/340?random=${idx+1}`,
    views: `${(Math.random()*50+1).toFixed(1)}万`,
    duration: `${Math.floor(Math.random()*4+1)}:${(Math.random()*60|0).toString().padStart(2,'0')}`,
    up: ['沙雕UP主','搞笑日常','动漫菌','科技宅','美食家','音乐人','游戏咖','生活家'][idx%8],
    cat: ['趣味','搞笑','动漫','科技','美食','音乐','游戏','生活'][idx%8],
    episodes: Math.floor(Math.random() * 20) + 10,
    isRecommend: 0
  }
}

function initVideos() {
  allVideos.value = Array.from({length: PAGE_SIZE * 2}).map((_,i)=>fakeVideo(i))
  videos.value = allVideos.value.slice(0, PAGE_SIZE)
  hasMore.value = videos.value.length < MAX_TOTAL
}
initVideos()

function loadMore() {
  if (loading.value || !hasMore.value) return
  loading.value = true
  setTimeout(() => {
    // 动态生成新数据
    const currentLen = allVideos.value.length
    if (currentLen < MAX_TOTAL) {
      const toAdd = Math.min(PAGE_SIZE, MAX_TOTAL - currentLen)
      for (let i = 0; i < toAdd; i++) {
        allVideos.value.push(fakeVideo(currentLen + i))
      }
    }
    const next = videos.value.length + PAGE_SIZE
    videos.value = allVideos.value.slice(0, next)
    hasMore.value = videos.value.length < MAX_TOTAL
    loading.value = false
  }, 600)
}

const handleCategoryChange = (category: string, subCategory?: string) => {
  if (category === '推荐') {
    sectionTitle.value = '推荐内容'
  } else if (subCategory) {
    sectionTitle.value = `${category}.${subCategory}`
  } else {
    sectionTitle.value = `${category}内容`
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--background-color);
  padding-top: 108px;
  padding-bottom: 56px;
}

@media (max-width: 600px) {
  .home {
    padding-top: 96px;
  }
}
</style> 