<template>
  <InfiniteScroll
    :loading="loadingMore"
    :has-more="hasMore"
    :enable-pull-refresh="true"
    :error="error"
    :error-message="errorMessage"
    @load-more="loadMore"
    @refresh="refresh"
    @retry="retry"
  >
    <div class="search-page">
      <SearchInputBar @search="onSearch" v-model:keyword="keyword" @input="onInput" />
      <HotSearchList v-if="!keyword && !showResult" @select="handleSelect" />
      <SearchSuggestList v-else-if="!showResult" :keyword="keyword" :recommend-list="recommendList" :text-list="textList" @select="handleSelect" />
      <SearchVideoGrid v-if="showResult" :keyword="keyword" :videos="displayVideos" />
    </div>
  </InfiniteScroll>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import SearchInputBar from '@/components/search/SearchInputBar.vue'
import HotSearchList from '@/components/search/HotSearchList.vue'
import SearchSuggestList from '@/components/search/SearchSuggestList.vue'
import SearchVideoGrid from '@/components/search/SearchVideoGrid.vue'
import InfiniteScroll from '@/components/common/InfiniteScroll.vue'

const keyword = ref('')
const recommendList = ref<any[]>([])
const textList = ref<string[]>([])
const showResult = ref(false)
const videoList = ref<any[]>([])
const displayVideos = ref<any[]>([])
const loadingMore = ref(false)
const hasMore = ref(true)
const error = ref(false)
const errorMessage = ref('')
const PAGE_SIZE = 9
let allVideos: any[] = []

function fakeVideo(idx: number) {
  const cats = [
    { name: '趣味', color: '#ff5c8a', bg: '#ffe4ef' },
    { name: '搞笑', color: '#ffb300', bg: '#fff6e0' },
    { name: '动漫', color: '#2196f3', bg: '#eaf6ff' },
    { name: '科技', color: '#4caf50', bg: '#eaffea' },
    { name: '美食', color: '#e91e63', bg: '#ffe4f0' },
    { name: '音乐', color: '#3f51b5', bg: '#eaeaff' },
    { name: '游戏', color: '#9c27b0', bg: '#f5eaff' },
    { name: '生活', color: '#ff9800', bg: '#fff3e0' }
  ]
  const cat = cats[idx % cats.length]
  return {
    id: idx + 1,
    cover: `https://picsum.photos/400/220?random=${idx + 1}`,
    title: `示例视频${idx + 1}`,
    up: ['沙雕UP主','搞笑日常','动漫菌','科技宅','美食家','音乐人','游戏咖','生活家'][idx % 8],
    cat: cat.name,
    catColor: cat.color,
    catBg: cat.bg,
    episodes: Math.floor(Math.random() * 15) + 10,
    views: `${(Math.random() * 100 + 1).toFixed(1)}万`,
    duration: `${Math.floor(Math.random()*4+1)}:${(Math.random()*60|0).toString().padStart(2,'0')}`
  }
}

function genAllVideos() {
  allVideos = Array.from({length: 60}).map((_, i) => fakeVideo(i))
}

genAllVideos()

const allRecommend = [
  {
    id: 1,
    cover: 'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2880070276.webp',
    title: '我的后半生',
    tag: '电视剧',
    desc: '2025 · 张国立 佟大为'
  },
  {
    id: 2,
    cover: 'https://img2.doubanio.com/view/photo/s_ratio_poster/public/p2455050536.webp',
    title: '我的前半生',
    tag: '电视剧',
    desc: '2017 · 斓东 马伊琍'
  }
]
const allText = [
  '我的前半生第二部电视剧全',
  '我的团长我的团',
  '我的人间烟火',
  '我的世界大电影',
  '我的二哥二嫂电视剧全部40集',
  '我的阿勒泰'
]

function onInput(val: string) {
  keyword.value = val
  showResult.value = false
  updateSuggest()
}
function onSearch(val: string) {
  keyword.value = val
  showResult.value = true
  // 优化：无关键词或无匹配时展示全部伪造数据
  if (!keyword.value) {
    videoList.value = allVideos.slice()
  } else {
    videoList.value = allVideos.filter(v => v.title.includes(keyword.value) || v.up.includes(keyword.value) || v.cat.includes(keyword.value))
    if (videoList.value.length === 0) {
      videoList.value = allVideos.slice()
    }
  }
  displayVideos.value = videoList.value.slice(0, PAGE_SIZE)
  hasMore.value = displayVideos.value.length < videoList.value.length
}
function updateSuggest() {
  if (!keyword.value) {
    recommendList.value = []
    textList.value = []
    return
  }
  recommendList.value = allRecommend.filter(item => item.title.includes(keyword.value))
  textList.value = allText.filter(item => item.includes(keyword.value))
}

function loadMore() {
  if (error.value) return
  loadingMore.value = true
  error.value = false
  
  setTimeout(() => {
    try {
      const next = displayVideos.value.length + PAGE_SIZE
      displayVideos.value = videoList.value.slice(0, next)
      hasMore.value = displayVideos.value.length < videoList.value.length
    } catch (e) {
      error.value = true
      errorMessage.value = '加载失败，请重试'
    } finally {
      loadingMore.value = false
    }
  }, 600)
}

function refresh() {
  error.value = false
  errorMessage.value = ''
  onSearch(keyword.value)
}

function retry() {
  error.value = false
  errorMessage.value = ''
  loadMore()
}

function handleSelect(val: string) {
  keyword.value = val
  onSearch(val)
}
</script>

<style lang="scss" scoped>
.search-page {
  width: 100%;
  min-height: 100vh;
  background: #fff;
  padding-bottom: 16px;
  box-sizing: border-box;
}
</style> 