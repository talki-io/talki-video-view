<template>
  <div class="banner-area">
    <Swiper
      :modules="modules"
      :autoplay="{ delay: 3000, disableOnInteraction: false }"
      :loop="true"
      :pagination="{ clickable: true }"
      :effect="'coverflow'"
      :coverflow-effect="coverflowEffect"
      :space-between="16"
      :centered-slides="true"
      :slides-per-view="'auto'"
      :initial-slide="2"
      class="my-swiper"
    >
      <SwiperSlide v-for="(item, idx) in banners" :key="idx" class="banner-slide">
        <div class="banner-img-wrap">
          <ThImage :src="item.img" :alt="item.title" />
          <div class="banner-title">{{ item.title }}</div>
        </div>
      </SwiperSlide>
      <template #pagination></template>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, EffectCoverflow } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'

const modules = [Autoplay, Pagination, EffectCoverflow]

const banners = [
  { img: 'https://picsum.photos/600/340?random=100', title: '喜欢玩这种~ 沙一汀' },
  { img: 'https://picsum.photos/600/340?random=101', title: '人脉哥和沙一汀玩抽象象谁更权威？' },
  { img: 'https://picsum.photos/600/340?random=102', title: '更多精彩内容' },
  { img: 'https://picsum.photos/600/340?random=103', title: '沙雕日常，欢乐无限' },
  { img: 'https://picsum.photos/600/340?random=104', title: '爆笑瞬间大合集' },
  { img: 'https://picsum.photos/600/340?random=105', title: '今日热门推荐' },
]

const coverflowEffect = {
  rotate: 0,
  stretch: 0,
  depth: 80,
  modifier: 1,
  slideShadows: false
}
</script>

<style lang="scss" scoped>
.banner-area {
  padding: 0 12px;
  margin-bottom: 12px;

  .my-swiper {
    width: 100%;
    height: 100%;
    padding: 10px 0;
  }

  .banner-slide {
    width: 85%;
    transition: transform 0.3s;

    .banner-img-wrap {
      position: relative;
      width: 100%;
      aspect-ratio: 16/9;
      border-radius: 12px;
      overflow: hidden;
      background: #eee;
      box-shadow: 0 2px 12px rgba(0,0,0,0.08);

      .th-image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      .banner-title {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 40px 12px 12px;
        background: linear-gradient(transparent, rgba(0,0,0,0.7));
        color: #fff;
        font-size: 15px;
        line-height: 1.4;
        z-index: 2;
      }
    }
  }

  :deep(.swiper-pagination) {
    .swiper-pagination-bullet {
      width: 6px;
      height: 6px;
      background: rgba(255,255,255,0.8);
      opacity: 0.5;
      transition: all 0.3s;

      &-active {
        width: 16px;
        border-radius: 4px;
        background: #ff5c8a;
        opacity: 1;
      }
    }
  }
}

@media (max-width: 768px) {
  .banner-area {
    padding: 0 8px;
    margin-bottom: 10px;

    .banner-slide {
      width: 92%;

      .banner-img-wrap {
        border-radius: 8px;

        .banner-title {
          padding: 30px 10px 10px;
          font-size: 14px;
        }
      }
    }
  }
}
</style> 