<template>
  <div class="category-bar">
    <div class="category-list" ref="categoryList">
      <div 
        v-for="(item, index) in categories" 
        :key="index"
        class="category-item"
        :class="{ active: activeIdx === index }"
        @click="handleCategoryClick(index)"
      >
        {{ item }}
      </div>
      <div class="active-bar" :style="{ left: activeBarLeft + 'px' }"></div>
    </div>
    <div class="menu-btn" @click="showAllCategories = true">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </div>

    <CategoryPopup
      v-model="showAllCategories"
      :sections="categorySections"
      :active-main-index="activeIdx"
      :active-sub-index="activeSubIdx"
      @select="handleCategorySelect"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from 'vue'
import CategoryPopup from '@/components/common/CategoryPopup.vue'

interface CategoryItem {
  name: string
  subCategories: string[]
}

const categoryDetails = ref<CategoryItem[]>([
  {
    name: '推荐',
    subCategories: ['热门推荐']
  },
  {
    name: '电影',
    subCategories: ['动作片', '喜剧片', '爱情片', '科幻片', '恐怖片', '剧情片', '战争片', '纪录片']
  },
  {
    name: '电视剧',
    subCategories: ['国产剧', '港台剧', '日韩剧', '欧美剧', '海外剧', '古装剧', '偶像剧', '谍战剧']
  },
  {
    name: '综艺',
    subCategories: ['选秀', '情感', '访谈', '播报', '旅游', '音乐', '美食', '纪实']
  },
  {
    name: '动漫',
    subCategories: ['国创', '日漫', '美漫', '新番', '剧场版', '热血', '奇幻', '治愈']
  },
  {
    name: '纪录片',
    subCategories: ['人文', '自然', '历史', '科技', '探索', '军事', '社会', '传记']
  },
  {
    name: '少儿',
    subCategories: ['动画片', '益智', '早教', '童话', '英语', '冒险', '儿歌', '手工']
  },
  {
    name: '体育',
    subCategories: ['足球', '篮球', '网球', '排球', '羽毛球', '台球', '棋牌', '格斗']
  },
  {
    name: '音乐',
    subCategories: ['流行', '摇滚', '民谣', '电子', '说唱', '古典', '爵士', '乡村']
  }
])

const categorySections = computed(() => {
  return [
    {
      title: '推荐',
      items: categoryDetails.value[0].subCategories
    },
    {
      title: '电影',
      items: categoryDetails.value[1].subCategories
    },
    {
      title: '电视剧',
      items: categoryDetails.value[2].subCategories
    },
    {
      title: '综艺',
      items: categoryDetails.value[3].subCategories
    },
    {
      title: '动漫',
      items: categoryDetails.value[4].subCategories
    },
    {
      title: '纪录片',
      items: categoryDetails.value[5].subCategories
    }
  ]
})

const categories = ref(categoryDetails.value.map(item => item.name))
const activeIdx = ref(0)
const activeSubIdx = ref(-1)
const activeBarLeft = ref(0)
const categoryList = ref<HTMLElement | null>(null)
const showAllCategories = ref(false)

const emit = defineEmits<{
  (e: 'category-change', category: string, subCategory?: string): void
}>()

const handleCategoryClick = (index: number) => {
  activeIdx.value = index
  const categoryName = categories.value[index]
  emit('category-change', categoryName)
  nextTick(() => {
    updateActiveBarPosition()
  })
}

const handleCategorySelect = (mainIndex: number, subIndex: number, item: string) => {
  activeIdx.value = mainIndex
  activeSubIdx.value = subIndex
  const mainCategory = categories.value[mainIndex]
  emit('category-change', mainCategory, item)
  nextTick(() => {
    updateActiveBarPosition()
  })
}

const updateActiveBar = async () => {
  await nextTick()
  if (categoryList.value) {
    const items = categoryList.value.getElementsByClassName('category-item')
    if (items[activeIdx.value]) {
      const item = items[activeIdx.value] as HTMLElement
      activeBarLeft.value = item.offsetLeft + (item.offsetWidth - 20) / 2
    }
  }
}

const updateActiveBarPosition = () => {
  updateActiveBar()
}

onMounted(() => {
  updateActiveBar()
})
</script>

<style lang="scss" scoped>
.category-bar {
  position: relative;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  
  .category-list {
    position: relative;
    display: flex;
    overflow-x: auto;
    padding: 0 40px 0 12px;
    scrollbar-width: none;
    -ms-overflow-style: none;
    
    &::-webkit-scrollbar {
      display: none;
    }
    
    .category-item {
      padding: 12px 16px;
      font-size: 15px;
      color: #666;
      white-space: nowrap;
      cursor: pointer;
      transition: all 0.3s;
      
      &.active {
        color: #ff5c8a;
        font-weight: 600;
      }
    }
    
    .active-bar {
      position: absolute;
      bottom: 0;
      width: 20px;
      height: 3px;
      background: #ff5c8a;
      border-radius: 2px;
      transition: left 0.3s;
    }
  }
  
  .menu-btn {
    position: absolute;
    right: 0;
    top: 0;
    width: 40px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(90deg, rgba(255,255,255,0) 0%, #fff 30%);
    cursor: pointer;
    color: #666;
    transition: color 0.2s;
    
    svg {
      transition: transform 0.2s;
    }

    &:hover {
      color: #ff5c8a;
      
      svg {
        transform: scale(1.1);
      }
    }
  }
}

@media (max-width: 600px) {
  .category-bar {
    .category-list {
      .category-item {
        padding: 10px 14px;
        font-size: 14px;
      }
    }
  }
}
</style> 