/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

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

declare module '@element-plus/icons-vue' {
  export const VideoPlay: any
  export const VideoPause: any
  export const Mute: any
  export const Volume: any
  export const FullScreen: any
  export const Loading: any
} 