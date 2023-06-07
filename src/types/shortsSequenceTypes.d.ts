export interface Welcome {
  continuation?: string;
  data: Datum[];
  msg?: string;
}

export interface Datum {
  type?: string;
  videoId: string;
  thumbnail?: Thumbnail[];
  isOriginalAspectRatio?: boolean;
  params?: string;
  playerParams?: string;
}

export interface Thumbnail {
  url?: string;
  width?: number;
  height?: number;
}
