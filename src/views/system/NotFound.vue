<template>
  <div class="not-found">
    <div class="not-found__container">
      <div class="not-found__content">
        <div class="not-found__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </div>
        <h1 class="not-found__title">404</h1>
        <p class="not-found__subtitle">页面不存在</p>
        <p class="not-found__description">
          抱歉，您访问的页面不存在或已被删除
        </p>
        <div class="not-found__actions">
          <el-button type="primary" @click="goHome">
            返回首页
          </el-button>
          <el-button @click="goBack">
            返回上页
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/home')
}

const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/home')
  }
}
</script>

<style lang="scss" scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--background-color);
  padding: 20px;
}

.not-found__container {
  text-align: center;
  max-width: 500px;
}

.not-found__content {
  background: white;
  border-radius: var(--border-radius-large);
  padding: var(--spacing-xxl);
  box-shadow: var(--box-shadow-light);
}

.not-found__icon {
  width: 80px;
  height: 80px;
  margin: 0 auto var(--spacing-lg);
  color: var(--danger-color);
  
  svg {
    width: 100%;
    height: 100%;
  }
}

.not-found__title {
  font-size: 72px;
  font-weight: var(--font-weight-bold);
  color: var(--theme-color);
  margin: 0 0 var(--spacing-sm);
  line-height: 1;
}

.not-found__subtitle {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--text-color);
  margin: 0 0 var(--spacing-md);
}

.not-found__description {
  font-size: var(--font-size-md);
  color: var(--text-color-secondary);
  margin: 0 0 var(--spacing-xl);
  line-height: var(--line-height-normal);
}

.not-found__actions {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: $breakpoint-sm) {
  .not-found__content {
    padding: var(--spacing-xl);
  }
  
  .not-found__title {
    font-size: 48px;
  }
  
  .not-found__subtitle {
    font-size: var(--font-size-lg);
  }
  
  .not-found__actions {
    flex-direction: column;
    align-items: center;
  }
}
</style> 