<template>
  <div class="follow-update" v-if="show">
    <img class="avatar" src="https://th.bing.com/th/id/OIP.kDz5Hsbj_16vyHjnA3PnhQAAAA?rs=1&pid=ImgDetMain" />
    <div class="info">
      <div class="title">你的追番，追剧更新了 <span class="badge">{{updateCount}}</span></div>
      <div class="desc">《{{updateTitle}}》 {{updateStatus}}</div>
    </div>
    <button class="watch-btn">去观看</button>
  </div>
</template>

<script setup lang="ts">
// 控制显示隐藏
const show = true

// 更新数据
const updateCount = 7
const updateTitle = '蜡笔小新：奇异乐园大冒险'
const updateStatus = '全片'
</script>

<style lang="scss" scoped>
@use '@/assets/styles/mixins/animations.scss' as *;
@use "sass:color";

.follow-update {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 10px;
  padding: 8px 12px;
  margin: 8px 8px;
  
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    margin-right: 10px;
    object-fit: cover;
  }
  .info {
    flex: 1;
    .title {
      font-size: 14px;
      color: #333;
      margin-bottom: 2px;
      .badge {
        background: #ff5c8a;
        color: #fff;
        border-radius: 10px;
        font-size: 12px;
        padding: 1px 6px;
        margin-left: 4px;
      }
    }
    .desc {
      font-size: 12px;
      color: #888;
    }
  }
  .watch-btn {
    background: #ff5c8a;
    color: #fff;
    border: none;
    border-radius: 16px;
    padding: 4px 14px;
    font-size: 14px;
    cursor: pointer;
    margin-left: 8px;
    @include btn-press;
    
    &:hover {
      background: color.adjust(#ff5c8a, $lightness: -5%);
    }
  }
}

@media (max-width: 600px) {
  .follow-update {
    margin: 6px 6px;
    padding: 6px 10px;
    .avatar {
      width: 36px;
      height: 36px;
    }
    .info {
      .title {
        font-size: 13px;
      }
      .desc {
        font-size: 12px;
      }
    }
    .watch-btn {
      padding: 3px 12px;
      font-size: 13px;
    }
  }
}
</style> 