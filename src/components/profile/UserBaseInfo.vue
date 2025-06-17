<template>
  <div class="user-base-info">
    <th-image
      class="avatar"
      :src="user.avatar"
      :alt="user.username"
      width="64px"
      height="64px"
      fit="cover"
      :round="true"
    />
    <div class="user-info-main">
      <div class="user-row">
        <span class="username">{{ user.username }}</span>
        <i class="iconfont icon-edit edit-icon"></i>
      </div>
      <div class="user-row user-uid">
        <span class="uid">UID: {{ user.uid }}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import ThImage from '@/components/global/ThImage.vue'
const props = defineProps<{ user: any }>()
</script>
<style scoped>
.user-base-info {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 0 24px;
  margin-top: 0;
}
.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 2px solid #f5f5f5;
  box-shadow: 0 2px 8px #f5f5f5;
}
.user-info-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.user-row {
  display: flex;
  align-items: center;
  gap: 6px;
}
.username {
  font-size: 18px;
  font-weight: 600;
  color: #e67ea5;
}
.edit-icon {
  font-size: 15px;
  color: #bbb;
  cursor: pointer;
}
.uid {
  color: #bbb;
  font-size: 12px;
}
</style> 