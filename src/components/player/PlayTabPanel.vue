<template>
  <div class="tab-panel">
    <div class="tab-bar">
      <div v-for="(tab, idx) in tabs" :key="tab" :class="['tab-btn', {active: idx===activeTab}]" @click="$emit('tab-change', idx)">{{ tab }}</div>
    </div>
    <div class="tab-content">
      <slot :name="tabs[activeTab]" />
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  tabs: string[]
  activeTab: number
}>()
const emit = defineEmits(['tab-change'])
</script>
<style lang="scss" scoped>
.tab-panel {
  padding: 0;
  .tab-bar {
    display: flex;
    border-bottom: 1px solid #f2f2f2;
    background: #fff;
    .tab-btn {
      flex: 1;
      text-align: center;
      padding: 12px 0 8px 0;
      font-size: 15px;
      color: #888;
      cursor: pointer;
      font-weight: 500;
      border-bottom: 2px solid transparent;
      &.active {
        color: #ff5c8a;
        border-bottom: 2px solid #ff5c8a;
        background: #fff;
      }
      transition: color 0.25s cubic-bezier(.55,0,.1,1), border-bottom-color 0.25s cubic-bezier(.55,0,.1,1), background 0.25s cubic-bezier(.55,0,.1,1);
    }
  }
  .tab-content {
    background: #fff !important;
    min-height: 60px;
    padding: 12px 16px 0 16px;
    font-size: 15px;
    color: #222;
  }
}
</style> 