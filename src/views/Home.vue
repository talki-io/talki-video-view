<template>
  <div class="home">
    <HeaderBar />
    <CategoryBar @category-change="handleCategoryChange" />
    <BannerArea />
    <FollowUpdate />
    <SectionDivider :title="sectionTitle" />
    <VideoGrid />
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
  padding-bottom: 56px;
}
</style> 