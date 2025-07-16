<template>
  <div class="search-page">
    <SearchInputBar @search="onSearch" v-model:keyword="keyword" @input="onInput" />
    <HotSearchList v-if="!keyword && !showResult" @select="handleSelect" />
    <SearchSuggestList v-else-if="!showResult" :keyword="keyword" :recommend-list="recommendList" :text-list="textList" @select="handleSelect" />
  </div>
</template>

<script setup lang="ts">
import { ref} from 'vue'
import SearchInputBar from '@/components/search/SearchInputBar.vue'
import HotSearchList from '@/components/search/HotSearchList.vue'
import SearchSuggestList from '@/components/search/SearchSuggestList.vue'
import { useRouter } from 'vue-router'

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
const router = useRouter()

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
  showResult.value = false
  updateSuggest()
  if (val) {
    router.push({ path: '/search-result', query: { keyword: val } })
  }
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

function handleVideoSelect(video: any) {
  router.push({ path: '/play', query: { id: video.id } })
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