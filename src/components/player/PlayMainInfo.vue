<template>
  <div class="main-info">
    <div class="title-row">
      <span class="tag">国创</span>
      <span class="title">{{ title }}</span>
      <span class="type">{{ type }}</span>
      <span class="follow-btn">追番</span>
    </div>
    <div class="meta-row">
      <span class="meta-item">{{ playCount }}<span class="meta-label">播放</span></span>
      <span class="meta-item">{{ favCount }}<span class="meta-label">收藏</span></span>
      <span class="meta-item">{{ onlineCount }}<span class="meta-label">正在看</span></span>
      <span class="meta-item score">{{ score }}分</span>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  title: string
  type: string
  playCount: string
  favCount: string
  onlineCount: string
  score: string
}>()
</script>
<style lang="scss" scoped>
.main-info {
  padding: 16px 16px 8px 16px;
  .title-row {
    display: flex;
    align-items: center;
    gap: 8px;
    .tag {
      background: #ffe4ef;
      color: #ff5c8a;
      font-size: 13px;
      border-radius: 4px;
      padding: 2px 8px;
      font-weight: 500;
    }
    .title {
      font-size: 18px;
      font-weight: 600;
      color: #222;
      margin-right: 6px;
    }
    .type {
      font-size: 13px;
      color: #2196f3;
      background: #eaf6ff;
      border-radius: 4px;
      padding: 2px 8px;
      margin-right: 8px;
    }
    .follow-btn {
      margin-left: auto;
      color: #ff5c8a;
      font-size: 15px;
      font-weight: 600;
      background: #fff0f6;
      border-radius: 16px;
      padding: 2px 18px;
      cursor: pointer;
      border: 1px solid #ff5c8a;
      transition: background 0.2s;
      &:active {
        background: #ffe4ef;
      }
    }
  }
  .meta-row {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-top: 8px;
    .meta-item {
      color: #888;
      font-size: 14px;
      .meta-label {
        font-size: 12px;
        color: #bbb;
        margin-left: 2px;
      }
      &.score {
        color: #ff5c8a;
        font-weight: 600;
        font-size: 15px;
      }
    }
  }
}
</style> 