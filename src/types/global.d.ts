// 全局类型声明

// ArtPlayer插件类型声明
declare module 'artplayer-plugin-vtt-thumbnail' {
  const plugin: any
  export default plugin
}

// Element Plus 类型声明
declare module 'element-plus/dist/locale/zh-cn.mjs' {
  const zhCn: any
  export default zhCn
}

// 其他第三方库类型声明
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.svg' {
  const content: string
  export default content
}

declare module '*.png' {
  const content: string
  export default content
}

declare module '*.jpg' {
  const content: string
  export default content
}

declare module '*.jpeg' {
  const content: string
  export default content
}

declare module '*.gif' {
  const content: string
  export default content
}

declare module '*.webp' {
  const content: string
  export default content
}

// ArtPlayer 类型声明
declare module 'artplayer' {
  export default class ArtPlayer {
    constructor(options: any)
    on(event: string, callback: Function): void
    destroy(): void
    play(): void
    pause(): void
    get playing(): boolean
    get currentTime(): number
    set currentTime(time: number): void
    get duration(): number
    get volume(): number
    set volume(volume: number): void
    get muted(): boolean
    set muted(muted: boolean): void
    get fullscreen(): boolean
    set fullscreen(fullscreen: boolean): void
    notice: {
      show: string
    }
    switchUrl(url: string): void
  }
}

// Element Plus Icons 类型声明
declare module '@element-plus/icons-vue' {
  export const VideoPlay: any
  export const VideoPause: any
  export const Mute: any
  export const Volume: any
  export const FullScreen: any
  export const Loading: any
}

// 全局变量声明
declare global {
  interface Window {
    __VUE_APP_VERSION__: string
    __VUE_APP_ENV__: string
  }
}