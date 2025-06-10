<template>
  <div class="search-input-bar">
    <button class="back-btn" @click="goBack">
      <svg width="22" height="22" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#888" stroke-width="2" fill="none" stroke-linecap="round"/></svg>
    </button>
    <div class="input-wrap">
      <i class="icon-search">
        <svg viewBox="0 0 24 24" width="18" height="18">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="#999"/>
        </svg>
      </i>
      <input type="text" v-model="inputVal" :placeholder="placeholder" @input="handleInput" @keyup.enter="onSearch" />
    </div>
    <button class="search-btn" @click="onSearch">搜索</button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{ placeholder?: string; keyword?: string }>()
const emit = defineEmits(['search', 'update:keyword', 'input'])
const inputVal = ref(props.keyword || '')
const router = useRouter()

watch(() => props.keyword, val => {
  if (val !== inputVal.value) inputVal.value = val || ''
})

const goBack = () => router.back()
const onSearch = () => emit('search', inputVal.value)
const handleInput = (e: Event) => {
  emit('update:keyword', inputVal.value)
  emit('input', inputVal.value)
}
</script>

<style lang="scss" scoped>
.search-input-bar {
  display: flex;
  align-items: center;
  padding: 12px 12px 8px 12px;
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 10;
  .back-btn {
    background: none;
    border: none;
    margin-right: 8px;
    padding: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  .input-wrap {
    flex: 1;
    background: #f5f5f5;
    border-radius: 18px;
    display: flex;
    align-items: center;
    padding: 0 12px;
    .icon-search {
      margin-right: 6px;
      display: flex;
      align-items: center;
    }
    input {
      width: 100%;
      border: none;
      outline: none;
      background: transparent;
      font-size: 16px;
      padding: 8px 0;
    }
  }
  .search-btn {
    background: none;
    border: none;
    color: #ff5c8a;
    font-size: 16px;
    margin-left: 8px;
    cursor: pointer;
    font-weight: 600;
  }
}
</style> 