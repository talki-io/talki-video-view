<template>
  <div class="search-suggest-list">
    <template v-if="recommendList.length">
      <div class="suggest-recommend" v-for="item in recommendList" :key="item.id">
        <img class="cover" :src="item.cover" />
        <div class="info">
          <div class="title">
            <span v-html="highlight(item.title)"></span>
            <span class="tag">{{ item.tag }}</span>
          </div>
          <div class="desc">{{ item.desc }}</div>
        </div>
      </div>
    </template>
    <template v-if="textList.length">
      <div class="suggest-text" v-for="(item, idx) in textList" :key="idx">
        <span v-html="highlight(item)"></span>
      </div>
    </template>
    <div v-if="!recommendList.length && !textList.length" class="empty">暂无相关内容</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{
  keyword: string
  recommendList: Array<{
    id: string|number
    cover: string
    title: string
    tag: string
    desc: string
  }>
  textList: string[]
}>()

function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function highlight(text: string) {
  if (!props.keyword) return text
  // 高亮所有匹配关键词，支持特殊字符
  const reg = new RegExp(escapeRegExp(props.keyword), 'gi')
  return text.replace(reg, m => `<span class='hl'>${m}</span>`)
}
</script>

<style lang="scss" scoped>
.search-suggest-list {
  padding: 0 0 8px 0;
  .suggest-recommend {
    display: flex;
    align-items: flex-start;
    padding: 10px 16px 10px 16px;
    border-bottom: 1px solid #f2f2f2;
    .cover {
      width: 44px;
      height: 44px;
      border-radius: 8px;
      object-fit: cover;
      margin-right: 10px;
    }
    .info {
      flex: 1;
      .title {
        font-size: 16px;
        font-weight: 600;
        display: flex;
        align-items: center;
        .tag {
          background: #eaf6ff;
          color: #2196f3;
          font-size: 12px;
          border-radius: 4px;
          padding: 2px 8px;
          margin-left: 8px;
        }
      }
      .desc {
        font-size: 13px;
        color: #888;
        margin-top: 2px;
      }
    }
    .hl {
      color: #ff5c8a;
      font-weight: 600;
      background: none;
      padding: 0;
    }
  }
  .suggest-text {
    padding: 10px 16px;
    font-size: 16px;
    color: #222;
    border-bottom: 1px solid #f2f2f2;
    .hl {
      color: #ff5c8a;
    }
  }
  .empty {
    color: #aaa;
    font-size: 15px;
    text-align: center;
    padding: 32px 0 8px 0;
  }
}
</style> 