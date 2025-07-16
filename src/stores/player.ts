import { defineStore } from 'pinia'
// 播放器状态类型
interface PlayerState {
  playing: boolean
  currentTime: number
  duration: number
  volume: number
  muted: boolean
  fullscreen: boolean
  loading: boolean
  error: string | null
}

export const usePlayerStore = defineStore('player', {
  state: (): PlayerState => ({
    playing: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    muted: false,
    fullscreen: false,
    loading: false,
    error: null
  }),

  actions: {
    setPlaying(playing: boolean) {
      this.playing = playing
    },
    setCurrentTime(time: number) {
      this.currentTime = time
    },
    setDuration(duration: number) {
      this.duration = duration
    },
    setVolume(volume: number) {
      this.volume = volume
    },
    setMuted(muted: boolean) {
      this.muted = muted
    },
    setFullscreen(fullscreen: boolean) {
      this.fullscreen = fullscreen
    },
    setLoading(loading: boolean) {
      this.loading = loading
    },
    setError(error: string | null) {
      this.error = error
    },
    reset() {
      this.playing = false
      this.currentTime = 0
      this.duration = 0
      this.volume = 1
      this.muted = false
      this.fullscreen = false
      this.loading = false
      this.error = null
    }
  }
}) 