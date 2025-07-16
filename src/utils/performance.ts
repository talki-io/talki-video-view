/**
 * 性能监控工具
 */

interface PerformanceMetrics {
  pageLoadTime: number
  domContentLoaded: number
  firstContentfulPaint?: number
  largestContentfulPaint?: number
  firstInputDelay?: number
  cumulativeLayoutShift?: number
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {
    pageLoadTime: 0,
    domContentLoaded: 0
  }

  constructor() {
    this.init()
  }

  private init() {
    // 页面加载时间
    window.addEventListener('load', () => {
      const loadTime = performance.now()
      this.metrics.pageLoadTime = loadTime
      this.logMetric('Page Load Time', loadTime)
    })

    // DOM内容加载时间
    document.addEventListener('DOMContentLoaded', () => {
      const domLoadTime = performance.now()
      this.metrics.domContentLoaded = domLoadTime
      this.logMetric('DOM Content Loaded', domLoadTime)
    })

    // 观察性能指标
    this.observePerformanceMetrics()
  }

  private observePerformanceMetrics() {
    // First Contentful Paint
    if ('PerformanceObserver' in window) {
      try {
        const paintObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === 'first-contentful-paint') {
              this.metrics.firstContentfulPaint = entry.startTime
              this.logMetric('First Contentful Paint', entry.startTime)
            }
          }
        })
        paintObserver.observe({ entryTypes: ['paint'] })
      } catch (error) {
        console.warn('Failed to observe paint metrics:', error)
      }

      // Largest Contentful Paint
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1]
          this.metrics.largestContentfulPaint = lastEntry.startTime
          this.logMetric('Largest Contentful Paint', lastEntry.startTime)
        })
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
      } catch (error) {
        console.warn('Failed to observe LCP metrics:', error)
      }

      // First Input Delay
      try {
        const fidObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const fidEntry = entry as any
            this.metrics.firstInputDelay = fidEntry.processingStart - entry.startTime
            this.logMetric('First Input Delay', this.metrics.firstInputDelay)
          }
        })
        fidObserver.observe({ entryTypes: ['first-input'] })
      } catch (error) {
        console.warn('Failed to observe FID metrics:', error)
      }

      // Cumulative Layout Shift
      try {
        const clsObserver = new PerformanceObserver((list) => {
          let clsValue = 0
          for (const entry of list.getEntries()) {
            const clsEntry = entry as any
            if (!clsEntry.hadRecentInput) {
              clsValue += clsEntry.value
            }
          }
          this.metrics.cumulativeLayoutShift = clsValue
          this.logMetric('Cumulative Layout Shift', clsValue)
        })
        clsObserver.observe({ entryTypes: ['layout-shift'] })
      } catch (error) {
        console.warn('Failed to observe CLS metrics:', error)
      }
    }
  }

  public logMetric(name: string, value: number) {
    console.log(`Performance Metric - ${name}: ${value.toFixed(2)}ms`)
    
    // 这里可以发送到分析服务
    this.sendToAnalytics(name, value)
  }

  private sendToAnalytics(name: string, value: number) {
    // 示例：发送到Google Analytics或其他分析服务
    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', 'performance_metric', {
        metric_name: name,
        metric_value: value
      })
    }
  }

  // 测量函数执行时间
  measureFunction<T extends (...args: any[]) => any>(
    name: string,
    fn: T
  ): (...args: Parameters<T>) => ReturnType<T> {
    return (...args: Parameters<T>): ReturnType<T> => {
      const start = performance.now()
      const result = fn(...args)
      const end = performance.now()
      
      this.logMetric(`Function: ${name}`, end - start)
      return result
    }
  }

  // 测量异步函数执行时间
  async measureAsyncFunction<T extends (...args: any[]) => Promise<any>>(
    name: string,
    fn: T
  ): Promise<(...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>>> {
    return async (...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> => {
      const start = performance.now()
      const result = await fn(...args)
      const end = performance.now()
      
      this.logMetric(`Async Function: ${name}`, end - start)
      return result
    }
  }

  // 获取性能指标
  getMetrics(): PerformanceMetrics {
    return { ...this.metrics }
  }

  // 重置指标
  reset() {
    this.metrics = {
      pageLoadTime: 0,
      domContentLoaded: 0
    }
  }
}

// 创建全局实例
export const performanceMonitor = new PerformanceMonitor()

// 导出装饰器
export function measure(name: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value

    descriptor.value = function (...args: any[]) {
      const start = performance.now()
      const result = originalMethod.apply(this, args)
      const end = performance.now()
      
      performanceMonitor.logMetric(`Method: ${name}`, end - start)
      return result
    }

    return descriptor
  }
}

// 导出异步装饰器
export function measureAsync(name: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value

    descriptor.value = async function (...args: any[]) {
      const start = performance.now()
      const result = await originalMethod.apply(this, args)
      const end = performance.now()
      
      performanceMonitor.logMetric(`Async Method: ${name}`, end - start)
      return result
    }

    return descriptor
  }
}

export default performanceMonitor 