<template>
  <div class="history-list">
    <div class="section-title-row">
      <span class="section-title">历史记录</span>
      <button v-if="history.length" class="clear-btn" @click="clearHistory">清空</button>
    </div>
    <div v-if="history.length" class="history-items">
      <div class="history-item" v-for="(item, idx) in history" :key="item">
        <span class="text" @click="$emit('select', item)" style="cursor:pointer">{{ item }}</span>
        <span class="delete-btn" @click="remove(idx)">×</span>
      </div>
    </div>
    <div v-else class="empty">暂无历史记录</div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['select'])
const history = ref([
  '生化危机8',
  '四点的海棠花未眠',
  '好听的歌',
  '林俊杰',
  '黑马程序员骗局',
  '不潮不花钱'
])

function remove(idx: number) {
  history.value.splice(idx, 1)
}
function clearHistory() {
  history.value = []
}
</script>

<style lang="scss" scoped>
.history-list {
  padding: 8px 16px 0 16px;
  .section-title-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
    .section-title {
      font-size: 15px;
      font-weight: 600;
      color: #222;
    }
    .clear-btn {
      background: none;
      border: none;
      color: #ff5c8a;
      font-size: 13px;
      cursor: pointer;
      padding: 2px 8px;
      border-radius: 6px;
      transition: background 0.2s;
      &:hover {
        background: #ffe4ef;
      }
    }
  }
  .history-items {
    display: flex;
    flex-wrap: wrap;
    gap: 10px 14px;
    .history-item {
      display: flex;
      align-items: center;
      background: #f5f5f5;
      border-radius: 8px;
      padding: 7px 12px 7px 14px;
      font-size: 14px;
      color: #333;
      .delete-btn {
        margin-left: 6px;
        color: #bbb;
        font-size: 15px;
        cursor: pointer;
        transition: color 0.2s;
        &:hover {
          color: #ff5c8a;
        }
      }
    }
  }
  .empty {
    color: #aaa;
    font-size: 14px;
    padding: 16px 0 8px 0;
    text-align: center;
  }
}
</style> 