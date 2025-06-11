<script setup lang="ts">
import { ref, watch } from 'vue'
import { ElNotification } from 'element-plus'

const props = defineProps<{
  modelValue: boolean
  duration?: number
}>()

const emit = defineEmits(['update:modelValue', 'timeout'])

const countdown = ref(props.duration || 3)
let timer: any = null

watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    // 弹出通知
    ElNotification.success({
      title: '成功',
      message: '即将自动播放下一集',
      duration: 3000,
      showClose: true,
      position: 'bottom-right'
    })
    countdown.value = props.duration || 3
    startCountdown()
  } else {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }
})

const startCountdown = () => {
  timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      if (timer) {
        clearInterval(timer)
        timer = null
      }
      emit('timeout')
      emit('update:modelValue', false)
    }
  }, 1000)
}
</script> 