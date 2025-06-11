<template>
  <div class="play-page">
    <!-- 视频区域 -->
    <div class="video-section">
      <VideoPlayer :config="videoConfig" @ended="handleVideoEnded" />
    </div>
    <!-- 下方内容聚合在一个卡片内 -->
    <div class="main-card">
      <div class="main-info-section">
        <PlayMainInfo
          title="少年歌行"
          type="出品"
          playCount="2.3亿"
          favCount="527.2万"
          onlineCount="1"
          score="9.5"
        />
      </div>
      <div class="episode-section">
        <PlayEpisodePanel
          :seasons="seasonList"
          :episodes="allEpisodes"
          :active-season="activeSeasonIndex"
          :active-episode="activeEpisodeIndex"
          @season-change="onSeasonChange"
          @episode-change="onEpisodeChange"
          status="已完结"
          :total="currentTotalEpisodes"
        />
      </div>
      <div class="tab-section">
        <PlayTabPanel :tabs="tabs" :active-tab="activeTab" @tab-change="val => activeTab = val">
          <template #简介>
            <div>《少年歌行》是一部国创动画，讲述初入江湖的故事...</div>
          </template>
          <template #评论>
            <div>评论区（可集成评论组件）</div>
          </template>
          <template #弹幕>
            <div>弹幕区（可集成弹幕组件）</div>
          </template>
        </PlayTabPanel>
      </div>
    </div>
    <NextEpisodeNotification
      v-model="showNextEpisodeNotification"
      :duration="3"
      @timeout="handleNextEpisodeTimeout"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import VideoPlayer from '@/components/player/VideoPlayer.vue'
import PlayMainInfo from '@/components/player/PlayMainInfo.vue'
import PlayEpisodePanel from '@/components/player/PlayEpisodePanel.vue'
import PlayTabPanel from '@/components/player/PlayTabPanel.vue'
import NextEpisodeNotification from '@/components/player/NextEpisodeNotification.vue'
import { ElNotification } from 'element-plus'

// 推荐数据结构，便于API对接
const seasonsData = [
  {
    seasonId: 1,
    seasonTitle: '第一季',
    episodes: [
      { episodeId: 101, title: '第1话 初入江湖', url: 'https://www.w3schools.com/html/mov_bbb.mp4', vip: false, cover: 'https://img1.baidu.com/it/u=1234567890,1234567890&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=800', available: true },
      { episodeId: 102, title: '第2话 雪夜杀机', url: 'https://www.w3schools.com/html/movie.mp4', vip: false, cover: 'https://img1.baidu.com/it/u=2234567890,2234567890&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=800', available: true },
      { episodeId: 103, title: '第3话 美人三顾', url: 'https://www.w3schools.com/html/horse.mp4', vip: true, cover: 'https://img1.baidu.com/it/u=3234567890,3234567890&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=800', available: true }
    ]
  },
  {
    seasonId: 2,
    seasonTitle: '第二季',
    episodes: [
      { episodeId: 201, title: '第1话', url: 'https://www.w3schools.com/html/mov_bbb.mp4', vip: false, cover: 'https://img1.baidu.com/it/u=4234567890,4234567890&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=800', available: true },
      { episodeId: 202, title: '第2话', url: 'https://www.w3schools.com/html/movie.mp4', vip: true, cover: 'https://img1.baidu.com/it/u=5234567890,5234567890&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=800', available: false }
    ]
  }
]

const seasonList = seasonsData.map(s => s.seasonTitle)
const activeSeasonIndex = ref(0)
const activeEpisodeIndex = ref(0)
const showNextEpisodeNotification = ref(false)
const tabs = ['简介', '评论', '弹幕']
const activeTab = ref(0)

// 选集面板数据
const allEpisodes = computed(() =>
  seasonsData.map(season =>
    season.episodes.map(ep => ({
      title: ep.title,
      vip: ep.vip,
      available: ep.available
    }))
  )
)

function getCurrentEpisode(seasonIdx: number, episodeIdx: number) {
  const season = seasonsData[seasonIdx]
  if (!season) return null
  const episode = season.episodes[episodeIdx]
  if (!episode || !episode.url || episode.available === false) return null
  return episode
}

const videoConfig = ref({
  url: getCurrentEpisode(0, 0)?.url || '',
  title: '少年歌行',
  poster: getCurrentEpisode(0, 0)?.cover || '',
  volume: 1,
  autoplay: false,
  muted: false,
  loop: false
})

// 监听季和集的变化
watch([activeSeasonIndex, activeEpisodeIndex], () => {
  const ep = getCurrentEpisode(activeSeasonIndex.value, activeEpisodeIndex.value)
  if (ep) {
    videoConfig.value = {
      ...videoConfig.value,
      url: ep.url,
      poster: ep.cover,
      autoplay: true
    }
  } else {
    ElNotification.warning({
      title: '提示',
      message: '该集暂不可用',
      duration: 2000
    })
  }
}, { immediate: true })

// 切换季时重置集数索引
watch(activeSeasonIndex, () => {
  activeEpisodeIndex.value = 0
})

const handleVideoEnded = () => {
  const currentSeason = seasonsData[activeSeasonIndex.value].episodes
  if (activeEpisodeIndex.value < currentSeason.length - 1) {
    showNextEpisodeNotification.value = true
  } else if (activeSeasonIndex.value < seasonsData.length - 1) {
    showNextEpisodeNotification.value = true
  } else {
    ElNotification.info({
      title: '提示',
      message: '已播放到最后一集',
      duration: 2000
    })
  }
}

const handleNextEpisodeTimeout = () => {
  let nextSeason = activeSeasonIndex.value
  let nextEpisode = activeEpisodeIndex.value
  const currentSeason = seasonsData[activeSeasonIndex.value].episodes
  if (activeEpisodeIndex.value < currentSeason.length - 1) {
    nextEpisode++
  } else if (activeSeasonIndex.value < seasonsData.length - 1) {
    nextSeason++
    nextEpisode = 0
  } else {
    ElNotification.info({
      title: '提示',
      message: '已播放到最后一集',
      duration: 2000
    })
    return
  }
  const ep = getCurrentEpisode(nextSeason, nextEpisode)
  if (ep) {
    activeSeasonIndex.value = nextSeason
    activeEpisodeIndex.value = nextEpisode
    videoConfig.value = {
      ...videoConfig.value,
      url: ep.url,
      poster: ep.cover,
      autoplay: true
    }
  } else {
    ElNotification.warning({
      title: '提示',
      message: '该集暂不可用',
      duration: 2000
    })
  }
}

const currentTotalEpisodes = computed(() => {
  return seasonsData[activeSeasonIndex.value]?.episodes.length || 0
})

function onSeasonChange(val: number) {
  if (val !== activeSeasonIndex.value) {
    activeSeasonIndex.value = val
    activeEpisodeIndex.value = 0
  }
}
function onEpisodeChange(val: number) {
  activeEpisodeIndex.value = val
}
</script>

<style lang="scss" scoped>
.play-page {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  background: #fff;
  flex-direction: column;
  align-items: center;
  padding-bottom: 16px;
}
.video-section {
  width: 100vw;
  max-width: 800px;
  aspect-ratio: 16/9;
  margin: 0 auto;
  background: #000;
  border-radius: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.main-card {
  width: 100%;
  background: #fff;
  border-radius: 18px;
  margin: 0 auto 0 auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow: hidden;
  padding: 0 0 16px 0;
  @media (max-width: 600px) {
    border-radius: 12px;
    padding: 0 0 10px 0;
  }
}
.main-info-section, .episode-section, .tab-section {
  width: 100%;
  background: #fff;
  box-sizing: border-box;
  border-radius: 0;
  margin: 0;
  box-shadow: none;
}
.tab-section {
  background: #fff !important;
}

.popup-list {
  flex: 1 1 auto;
  overflow-y: auto;
  max-height: 60vh;
}
</style> 