<template>
  <div class="section-divider">
    <div class="divider-content">
      <span class="title">{{ title }}</span>
      <slot name="extra"></slot>
    </div>
    <div class="divider-line"></div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
.section-divider {
  padding: 16px 12px 8px;
  
  .divider-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;

    .title {
      font-size: 16px;
      font-weight: 600;
      color: #333;
      position: relative;
      padding-left: 12px;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 4px;
        height: 16px;
        background: #ff5c8a;
        border-radius: 2px;
      }
    }
  }

  .divider-line {
    height: 1px;
    background: #f0f0f0;
    margin-top: 8px;
  }
}

@media (max-width: 600px) {
  .section-divider {
    padding: 12px 10px 6px;

    .divider-content {
      margin-bottom: 6px;
      
      .title {
        font-size: 15px;
        
        &::before {
          height: 14px;
        }
      }
    }
  }
}
</style> 