<template>
  <div class="user-tab-bar">
    <div
      class="action-item"
      v-for="item in actions"
      :key="item.label"
      :class="{ active: modelValue === item.key }"
      @click="$emit('update:modelValue', item.key)"
    >
      <img v-if="item.icon && (item.icon.endsWith('.png') || item.icon.endsWith('.svg'))" :src="item.icon" class="action-img" alt="icon" />
      <i v-else :class="item.icon"></i>
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{ actions: any[], modelValue: string }>()
const emit = defineEmits(['update:modelValue'])
</script>
<style scoped>
.user-tab-bar {
  display: flex;
  justify-content: space-between;
  margin: 0 24px;
  padding: 18px 0 0 0;
}
.action-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  color: #666;
  cursor: pointer;
}
.action-img {
  width: 24px;
  height: 24px;
  display: block;
  margin: 0 auto 4px auto;
}
.action-item.active {
  color: #e67ea5;
  font-weight: 600;
  position: relative;
}

.action-item.active span::after {
  content: '';
  display: block;
  margin: 4px auto 0 auto;
  width: 32px;
  height: 3px;
  border-radius: 2px;
  background: #e67ea5;
}
</style> 