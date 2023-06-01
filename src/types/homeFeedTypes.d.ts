export interface Welcome {
  filters?: Filter[];
  continuation: string;
  data: WelcomeDatum[];
  msg: string;
}

export interface WelcomeDatum {
  type?: FluffyType;
  title?: string;
  subtitle?: null;
  data?: DatumDatum[];
  videoId?: string;
  channelTitle?: string;
  channelId?: string;
  channelThumbnail?: Thumbnail[];
  description?: string;
  viewCount?: string;
  publishedTimeText?: null | string;
  publishDate?: Date | null;
  publishedAt?: Date;
  lengthText?: string;
  thumbnail?: Thumbnail[];
  richThumbnail?: Thumbnail[] | null;
  isLive?: boolean;
  badges?: string[];
}

export interface Thumbnail {
  url: string;
  width?: number;
  height?: number;
}

export interface DatumDatum {
  type?: PurpleType;
  videoId?: string;
  title: string;
  viewCountText?: string;
  thumbnail: Thumbnail[];
  isOriginalAspectRatio?: boolean;
  params?: Params;
  playerParams?: PlayerParams;
  sequenceParams?: string;
  channelTitle?: string;
  channelId?: string;
  channelThumbnail?: Thumbnail[];
  description?: string;
  viewCount?: string;
  publishedTimeText?: string;
  publishDate?: Date;
  publishedAt?: Date;
  lengthText?: string;
  richThumbnail?: Thumbnail[] | null;
}

export enum Params {
  CAUwAg3D3D = "CAUwAg%3D%3D",
}

export enum PlayerParams {
  The8AEBoAMByAMkuAQF = "8AEBoAMByAMkuAQF",
}

export enum PurpleType {
  Shorts = "shorts",
  Video = "video",
}

export enum FluffyType {
  ShortsListing = "shorts_listing",
  Video = "video",
  VideoListing = "video_listing",
}

export interface Filter {
  filter?: string;
  continuation?: string;
}
