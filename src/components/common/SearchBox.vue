<template>
  <div class="search-box">
    <div class="search-input-wrap" @click="goSearchPage">
      <i class="icon-search">
        <svg viewBox="0 0 24 24" width="18" height="18">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="#999"/>
        </svg>
      </i>
      <input 
        type="text" 
        :placeholder="placeholder"
        v-model="searchText"
        @input="handleInput"
        @focus="goSearchPage"
        @blur="handleBlur"
        readonly
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

interface Props {
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '4点的海棠花未眠'
})

const emit = defineEmits<{
  (e: 'search', value: string): void
}>()

const searchText = ref('')
const router = useRouter()

const goSearchPage = () => {
  router.push('/search')
}

const handleInput = () => {
  emit('search', searchText.value)
}

const handleBlur = () => {
  // TODO: 处理失焦事件
}
</script>

<style lang="scss" scoped>
.search-box {
  width: 100%;
  
  .search-input-wrap {
    display: flex;
    align-items: center;
    background: #f5f5f5;
    border-radius: 20px;
    padding: 8px 12px;
    transition: all 0.3s ease;
    
    &:focus-within {
      background: #fff;
      box-shadow: 0 0 0 2px rgba(255, 92, 138, 0.2);
    }
    
    .icon-search {
      margin-right: 6px;
      display: flex;
      align-items: center;
    }
    
    input {
      flex: 1;
      border: none;
      outline: none;
      background: transparent;
      font-size: 15px;
      color: #333;
      
      &::placeholder {
        color: #999;
        font-size: 14px;
      }
    }
  }
}
</style> 