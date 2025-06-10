<template>
  <teleport to="body">
    <div class="category-popup" v-if="modelValue" @click.self="close">
      <div class="popup-content">
        <div class="popup-header">
          <h3>全部分类</h3>
          <div class="close-btn" @click="close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
        </div>
        <div class="category-sections">
          <div 
            v-for="(section, index) in sections" 
            :key="index"
            class="category-section"
          >
            <div class="section-title">{{ section.title }}</div>
            <div class="section-items">
              <div 
                v-for="(item, itemIndex) in section.items" 
                :key="itemIndex"
                class="category-item"
                :class="{ active: activeMainIndex === index && activeSubIndex === itemIndex }"
                @click="handleItemClick(index, itemIndex, item)"
              >
                {{ item }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
interface CategorySection {
  title: string
  items: string[]
}

interface Props {
  modelValue: boolean
  activeMainIndex?: number
  activeSubIndex?: number
  sections: CategorySection[]
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'select', mainIndex: number, subIndex: number, item: string): void
}

const props = withDefaults(defineProps<Props>(), {
  activeMainIndex: -1,
  activeSubIndex: -1
})

const emit = defineEmits<Emits>()

const close = () => {
  emit('update:modelValue', false)
}

const handleItemClick = (mainIndex: number, subIndex: number, item: string) => {
  emit('select', mainIndex, subIndex, item)
  close()
}
</script>

<style lang="scss" scoped>
.category-popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  animation: fadeIn 0.2s ease-out;

  .popup-content {
    position: relative;
    width: 100%;
    height: 100vh;
    background: #fff;
    overflow-y: auto;
    animation: slideDown 0.3s ease-out;

    .popup-header {
      position: sticky;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      background: #fff;
      border-bottom: 1px solid #f0f0f0;
      padding: 0 16px;
      z-index: 1;

      h3 {
        font-size: 16px;
        font-weight: 600;
        color: #333;
      }

      .close-btn {
        position: absolute;
        right: 16px;
        top: 50%;
        transform: translateY(-50%);
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border-radius: 50%;
        transition: all 0.2s;
        color: #666;

        &:hover {
          background-color: #f5f5f5;
          color: #ff5c8a;
          
          svg {
            transform: scale(1.1);
          }
        }

        svg {
          transition: transform 0.2s;
        }
      }
    }

    .category-sections {
      padding: 16px;

      .category-section {
        margin-bottom: 24px;

        &:last-child {
          margin-bottom: 0;
        }

        .section-title {
          font-size: 16px;
          font-weight: 600;
          color: #333;
          margin-bottom: 16px;
          padding-left: 12px;
          border-left: 4px solid #ff5c8a;
        }

        .section-items {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;

          .category-item {
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f8f8f8;
            border-radius: 6px;
            font-size: 14px;
            color: #666;
            cursor: pointer;
            transition: all 0.2s;

            &:hover {
              color: #ff5c8a;
              background: #fff2f6;
            }

            &.active {
              color: #fff;
              background: #ff5c8a;
            }
          }
        }
      }
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideDown {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .category-popup {
    .popup-content {
      .category-sections {
        .category-section {
          .section-items {
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;

            .category-item {
              height: 36px;
              font-size: 13px;
            }
          }
        }
      }
    }
  }
}
</style> 