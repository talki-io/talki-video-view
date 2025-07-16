<template>
  <div class="search-result-page">
    <div class="fixed-header">
      <SearchInputBar v-model:keyword="keyword" @search="onSearch" @input="onInput" />
      <div v-if="keyword && !showResult" class="suggest-area">
        <SearchSuggestList :keyword="keyword" :recommend-list="recommendList" :text-list="textList" @select="handleSuggestSelect" />
      </div>
      <div v-if="keyword && showResult" class="search-keyword-tip">
        与 <span class="highlight">{{ keyword }}</span> 相关的内容
      </div>
    </div>
    <div class="content-area">
      <InfiniteScroll v-if="showResult" :loading="loading" :has-more="hasMore" @loadMore="loadMore">
        <SearchVideoGrid :keyword="keyword" :videos="displayVideos" @select="handleVideoSelect" />
      </InfiniteScroll>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SearchInputBar from '@/components/search/SearchInputBar.vue'
import SearchVideoGrid from '@/components/search/SearchVideoGrid.vue'
import InfiniteScroll from '@/components/common/InfiniteScroll.vue'
import SearchSuggestList from '@/components/search/SearchSuggestList.vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const keyword = ref(route.query.keyword as string || '')
const displayVideos = ref<any[]>([])
const loading = ref(false)
const hasMore = ref(true)
const PAGE_SIZE = 10
const MAX_TOTAL = 40
const showResult = ref(true)
const recommendList = ref<any[]>([])
const textList = ref<string[]>([])

const allRecommend = [
  {
    id: 1,
    cover: 'https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200rb0xufo1745377997565/0',
    title: '我的后半生',
    tag: '电视剧',
    desc: '2025 · 张国立 佟大为'
  },
  {
    id: 2,
    cover: 'https://vcover-vt-pic.puui.qpic.cn/vcover_vt_pic/0/mzc00200rb0xufo1745377997565/0',
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
  resetResult()
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
function handleSuggestSelect(val: string) {
  keyword.value = val
  showResult.value = true
  resetResult()
}

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

function resetResult() {
  displayVideos.value = []
  hasMore.value = true
  loadMore()
}

function loadMore() {
  if (loading.value || !hasMore.value) return
  loading.value = true
  setTimeout(() => {
    const currentLen = displayVideos.value.length
    const toAdd = Math.min(PAGE_SIZE, MAX_TOTAL - currentLen)
    for (let i = 0; i < toAdd; i++) {
      displayVideos.value.push(fakeVideo(currentLen + i))
    }
    hasMore.value = displayVideos.value.length < MAX_TOTAL
    loading.value = false
  }, 600)
}

function handleVideoSelect(video: any) {
  router.push({ path: '/play', query: { id: video.id } })
}

onMounted(() => {
  updateSuggest()
  resetResult()
})
</script>

<style lang="scss" scoped>
.search-result-page {
  width: 100%;
  min-height: 100vh;
  background: #fff;
  box-sizing: border-box;
}
.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  background: #fff;
  box-sizing: border-box;
  /* 你可以根据实际高度调整 */
  padding-bottom: 0;
}
.content-area {
  padding-top: 96px; /* 这里的高度要等于.fixed-header的实际高度 */
}
.search-keyword-tip {
  color: #222;
  font-size: 15px;
  margin: 10px 0 8px 12px;
  .highlight {
    font-weight: 600;
    color: #ff5c8a;
  }
}
</style> 