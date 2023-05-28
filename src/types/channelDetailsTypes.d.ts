export interface Welcome {
  meta: Meta;
  continuation?: string;
  data: WelcomeDatum[];
  msg?: string;
}

export interface WelcomeDatum {
  type: string;
  title: string;
  subtitle?: null;
  data: DatumDatum[];
}

export interface DatumDatum {
  type: string;
  videoId?: string;
  title: string;
  channelTitle?: string;
  channelId?: string;
  channelThumbnail?: Avatar[];
  description?: string;
  viewCount?: string;
  publishedTimeText?: null | string;
  publishDate?: Date | null;
  lengthText?: string;
  isLive?: boolean;
  thumbnail?: Avatar[];
  richThumbnail?: null;
  publishedAt?: string;
  videoCount?: string;
  subscriberCount?: string;
  data: Data[];
}

export interface Avatar {
  url: string;
  width?: number;
  height?: number;
}

export enum Type {
  Channel = "channel",
  Video = "video",
}

export interface Meta {
  channelId?: string;
  title: string;
  description: string;
  channelHandle: string;
  banner: Avatar[];
  tvBanner?: Avatar[];
  mobileBanner?: Avatar[];
  avatar: Avatar[];
  subscriberCountText?: string;
  subscriberCount?: number;
  videosCountText?: string;
  videosCount?: string;
  isVerified?: boolean;
  keywords?: string[];
  isFamilySafe?: boolean;
  availableCountries?: string[];
  tabs: string[];
}

export interface Data {
  type: string;
  videoId?: string;
  title: string;
  channelTitle?: string;
  channelId?: string;
  channelThumbnail?: Thumbnail[];
  description?: string;
  viewCount?: string;
  publishedTimeText?: string | null;
  publishDate?: Date | null;
  lengthText?: string;
  isLive?: boolean;
  thumbnail: Thumbnail[];
  richThumbnail?: null;
  publishedAt?: string;
  viewCountText?: string;
}

export interface Thumbnail {
  url: string;
  width?: number;
  height?: number;
}
