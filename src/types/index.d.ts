export interface PlayerConfig {
  url: string;
  title?: string;
  poster?: string;
  volume?: number;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  vtt?: string; // VTT 缩略图地址
}

declare module 'artplayer-plugin-vtt-thumbnail';