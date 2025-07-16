<template>
  <div v-if="error" class="error-boundary">
    <div class="error-boundary__content">
      <div class="error-boundary__icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      </div>
      <h2 class="error-boundary__title">出错了</h2>
      <p class="error-boundary__message">{{ error.message || '组件加载失败' }}</p>
      <div class="error-boundary__actions">
        <el-button type="primary" @click="handleRetry">
          重试
        </el-button>
        <el-button @click="handleReport">
          报告问题
        </el-button>
      </div>
      <details v-if="error.stack" class="error-boundary__details">
        <summary>错误详情</summary>
        <pre class="error-boundary__stack">{{ error.stack }}</pre>
      </details>
    </div>
  </div>
  <slot v-else />
</template>

<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue'

interface Props {
  fallback?: (error: Error) => any
}

const props = withDefaults(defineProps<Props>(), {
  fallback: (error: Error) => undefined
})

const error = ref<Error | null>(null)

onErrorCaptured((err: Error) => {
  error.value = err
  console.error('ErrorBoundary caught error:', err)
  
  // 如果有自定义fallback，使用它
  if (props.fallback) {
    return props.fallback(err)
  }
  
  // 阻止错误继续传播
  return false
})

const handleRetry = () => {
  error.value = null
}

const handleReport = () => {
  // 这里可以添加错误上报逻辑
  console.log('Reporting error:', error.value)
  
  // 可以发送到错误监控服务
  if (error.value) {
    // 示例：发送到Sentry或其他错误监控服务
    // Sentry.captureException(error.value)
  }
}
</script>

<style lang="scss" scoped>
.error-boundary {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  padding: var(--spacing-xl);
  background: var(--background-color-light);
  border-radius: var(--border-radius-large);
  border: 1px solid var(--border-color-light);
}

.error-boundary__content {
  text-align: center;
  max-width: 400px;
}

.error-boundary__icon {
  width: 64px;
  height: 64px;
  margin: 0 auto var(--spacing-lg);
  color: var(--danger-color);
  
  svg {
    width: 100%;
    height: 100%;
  }
}

.error-boundary__title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--text-color);
  margin: 0 0 var(--spacing-md);
}

.error-boundary__message {
  font-size: var(--font-size-md);
  color: var(--text-color-secondary);
  margin: 0 0 var(--spacing-xl);
  line-height: var(--line-height-normal);
}

.error-boundary__actions {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
  margin-bottom: var(--spacing-lg);
}

.error-boundary__details {
  text-align: left;
  margin-top: var(--spacing-lg);
  
  summary {
    cursor: pointer;
    color: var(--primary-color);
    font-weight: var(--font-weight-medium);
    margin-bottom: var(--spacing-sm);
    
    &:hover {
      color: var(--theme-color);
    }
  }
}

.error-boundary__stack {
  background: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  padding: var(--spacing-md);
  font-size: var(--font-size-xs);
  color: var(--text-color-secondary);
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-all;
  max-height: 200px;
  overflow-y: auto;
}

@media (max-width: $breakpoint-sm) {
  .error-boundary {
    padding: var(--spacing-lg);
  }
  
  .error-boundary__actions {
    flex-direction: column;
    align-items: center;
  }
}
</style> 