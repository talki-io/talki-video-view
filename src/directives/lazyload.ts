import type { Directive, DirectiveBinding } from 'vue'

interface LoadingOptions {
  loading?: string
  error?: string
}

const defaultOptions: LoadingOptions = {
  loading: '@/assets/images/icon/Loading-animation.gif',
  error: '@/assets/images/icon/error.png'
}

const loadImage = (el: HTMLImageElement, src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      el.src = src
      resolve()
    }
    img.onerror = reject
    img.src = src
  })
}

const lazyload: Directive = {
  mounted(el: HTMLImageElement, binding: DirectiveBinding) {
    const options: LoadingOptions = {
      ...defaultOptions,
      ...(binding.value || {})
    }

    // 设置加载中的图片
    el.src = options.loading!

    // 保存原始图片地址
    const src = el.getAttribute('data-src')
    if (!src) return

    // 创建 IntersectionObserver 实例
    const observer = new IntersectionObserver(async (entries) => {
      const entry = entries[0]
      if (entry.isIntersecting) {
        observer.unobserve(el)
        try {
          await loadImage(el, src)
        } catch (e) {
          el.src = options.error!
        }
      }
    })

    // 开始观察元素
    observer.observe(el)
  }
}

export default lazyload 