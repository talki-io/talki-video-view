<template>
  <div class="video-grid">
    <!-- Banner区域 -->
    <div class="banner">
      <div class="thumb-wrap">
        <ThImage :src="bannerData.poster" :alt="bannerData.title" />
        <div class="episode-count">全{{ bannerData.episodes }}集</div>
        <div class="recommend-tag" v-if="bannerData.isRecommend">
          <span class="icon">✦</span>
          <span class="text">推荐</span>
        </div>
        <div class="video-info-bar">
          <span class="info-item">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="#fff">
              <path d="M3,3 L21,3 L21,21 L3,21 L3,3 Z M5,5 L5,19 L19,19 L19,5 L5,5 Z M9,8 L16,12 L9,16 L9,8 Z"/>
            </svg>
            {{ bannerData.views }}
          </span>
          <span class="info-item time">{{ bannerData.duration }}</span>
        </div>
      </div>
      <div class="banner-title">{{bannerData.title}}</div>
      <div class="video-meta">
        <span class="up">UP · {{ bannerData.up }}</span>
        <span class="cat">{{ bannerData.cat }}</span>
      </div>
    </div>
    
    <!-- 视频列表区域 -->
    <div class="grid-list">
      <div v-for="(video, idx) in videos" :key="idx" class="video-card">
        <div class="thumb-wrap">
          <ThImage :src="video.poster" :alt="video.title" />
          <div class="episode-count">全{{ video.episodes }}集</div>
          <div class="recommend-tag" v-if="video.isRecommend">
            <span class="icon">✦</span>
            <span class="text">推荐</span>
          </div>
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
        <div class="video-title text-ellipsis">{{video.title}}</div>
        <div class="video-meta">
          <span class="up">UP · {{ video.up }}</span>
          <span class="cat">{{ video.cat }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ThImage from '@/components/global/ThImage.vue'

// Banner数据
const bannerData = {
  title: '示例视频Banner',
  poster: 'https://picsum.photos/600/340?random=0',
  views: '25.5万',
  duration: '2:18',
  up: '懂一点人情世故',
  cat: '人文',
  episodes: 24,
  isRecommend: true
}

// 视频列表数据
const videos = Array.from({length:8}).map((_,i)=>({
  title: `示例视频${i+1}`,
  poster: `https://picsum.photos/600/340?random=${i+1}`,
  views: `${(Math.random()*50+1).toFixed(1)}万`,
  duration: `${Math.floor(Math.random()*4+1)}:${(Math.random()*60|0).toString().padStart(2,'0')}`,
  up: ['沙雕UP主','搞笑日常','动漫菌','科技宅','美食家','音乐人','游戏咖','生活家'][i%8],
  cat: ['趣味','搞笑','动漫','科技','美食','音乐','游戏','生活'][i%8],
  episodes: Math.floor(Math.random() * 20) + 10,
  isRecommend: 0
}))
</script>

<style lang="scss" scoped>
@use '@/assets/styles/mixins/animations.scss' as *;

.video-grid {
  padding: 10px 12px;
  background: #f7f7f7;
  
  // Banner样式
  .banner {
    width: 100%;
    border-radius: 16px;
    background: #fff;
    box-shadow: 0 2px 12px rgba(0,0,0,0.08);
    overflow: hidden;
    margin-bottom: 14px;
    
    .thumb-wrap {
      position: relative;
      width: 100%;
      aspect-ratio: 16/9;
      background: #eee;
      
      .th-image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      .episode-count {
        position: absolute;
        top: 6px;
        right: 6px;
        background: rgba(0, 0, 0, 0.6);
        color: #fff;
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 12px;
        z-index: 2;
      }

      .recommend-tag {
        position: absolute;
        left: 8px;
        top: 8px;
        background: linear-gradient(135deg, #ff9a9e 0%, #ff5c8a 100%);
        color: #fff;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 13px;
        display: flex;
        align-items: center;
        gap: 2px;
        box-shadow: 0 2px 8px rgba(255, 92, 138, 0.3);
        z-index: 2;
        
        .icon {
          font-size: 14px;
        }
        .text {
          font-weight: 500;
          letter-spacing: 0.5px;
        }
        &::after {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%);
          border-radius: 4px;
        }
      }

      .video-info-bar {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        padding: 0 8px 6px 8px;
        font-size: 13px;
        color: #fff;
        text-shadow: 0 2px 8px rgba(0,0,0,0.18);
        z-index: 2;
        
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
    .banner-title {
      padding: 10px 12px 4px 12px;
      font-size: 17px;
      color: #222;
      font-weight: 500;
      line-height: 1.3;
    }
    .video-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 12px 12px 12px;
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
        color: #ff5c8a;
      }
    }
  }

  // 视频列表样式
  .grid-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
    
    .video-card {
      background: #fff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 2px 12px rgba(0,0,0,0.08);
      display: flex;
      flex-direction: column;
      
      .thumb-wrap {
        position: relative;
        width: 100%;
        aspect-ratio: 16/9;
        background: #eee;
        
        .th-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        
        .episode-count {
          position: absolute;
          top: 6px;
          right: 6px;
          background: rgba(0, 0, 0, 0.6);
          color: #fff;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 12px;
          z-index: 2;
        }
        
        .recommend-tag {
          position: absolute;
          left: 8px;
          top: 8px;
          background: linear-gradient(135deg, #ff9a9e 0%, #ff5c8a 100%);
          color: #fff;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 13px;
          display: flex;
          align-items: center;
          gap: 2px;
          box-shadow: 0 2px 8px rgba(255, 92, 138, 0.3);
          z-index: 2;
          
          .icon {
            font-size: 14px;
          }
          .text {
            font-weight: 500;
            letter-spacing: 0.5px;
          }
          &::after {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%);
            border-radius: 4px;
          }
        }
        
        .video-info-bar {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          padding: 0 8px 6px 8px;
          font-size: 13px;
          color: #fff;
          text-shadow: 0 2px 8px rgba(0,0,0,0.18);
          z-index: 2;
          
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
          color: #ff5c8a;
        }
      }
    }
  }
}

// 平板端布局
@media (max-width: 850px) {
  .video-grid {
    padding: 12px;
    .grid-list {
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
      .video-card {
        .video-title {
          font-size: 14px;
          padding: 8px 10px 4px 10px;
        }
        .video-meta {
          padding: 0 10px 10px 10px;
          font-size: 12px;
          .cat {
            padding: 2px 8px;
            font-size: 12px;
          }
        }
      }
    }
  }
}

// 移动端布局
@media (max-width: 600px) {
  .video-grid {
    padding: 8px;
    .banner {
      margin-bottom: 12px;
      border-radius: 12px;
      .banner-title {
        font-size: 15px;
        padding: 8px 10px 4px 10px;
      }
      .video-meta {
        padding: 0 10px 8px 10px;
        font-size: 12px;
        .cat {
          padding: 2px 8px;
          font-size: 12px;
        }
      }
    }
    .grid-list {
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
      .video-card {
        border-radius: 8px;
        .thumb-wrap {
          .video-info-bar {
            padding: 0 6px 6px 6px;
            font-size: 12px;
            .info-item svg {
              width: 14px;
              height: 14px;
            }
            .time {
              font-size: 11px;
              padding: 1px 4px;
            }
          }
        }
        .video-title {
          font-size: 13px;
          padding: 6px 8px 4px 8px;
          line-height: 1.3;
        }
        .video-meta {
          padding: 0 8px 8px 8px;
          font-size: 12px;
          .cat {
            padding: 2px 6px;
            font-size: 11px;
          }
        }
      }
    }
    .banner, .video-card {
      .thumb-wrap {
        .episode-count {
          top: 4px;
          right: 4px;
          padding: 1px 4px;
          font-size: 11px;
        }
        .recommend-tag {
          left: 6px;
          top: 6px;
          padding: 2px 6px;
          font-size: 12px;
          .icon {
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style> 