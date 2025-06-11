// 视频播放器配置类型
export interface PlayerConfig {
  url: string;
  title?: string;
  poster?: string;
  volume?: number;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  vtt?: string; 
}

// 播放器状态类型
export interface PlayerState {
  playing: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  muted: boolean;
  fullscreen: boolean;
  loading: boolean;
  error: string | null;
} 