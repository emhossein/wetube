export interface Welcome {
  meta: Meta;
  continuation: string;
  data: WelcomeDatum[];
  msg: string;
}

export interface WelcomeDatum {
  type: FluffyType;
  videoId?: string;
  title: string;
  viewCount?: string;
  publishedTimeText?: string;
  publishDate?: Date;
  publishedAt?: Date;
  description?: string;
  subtitle?: null | string;
  data?: DatumDatum[];
}

export interface DatumDatum {
  type: PurpleType;
  videoId: string;
  title: string;
  viewCount?: string;
  publishedTimeText?: string;
  publishDate?: Date;
  publishedAt?: Date;
  lengthText?: string;
  thumbnail: Avatar[];
  channelTitle?: string;
  channelId?: string;
  channelThumbnail?: Avatar[];
  description?: string;
  richThumbnail?: Avatar[];
  viewCountText?: string;
  isOriginalAspectRatio?: boolean;
  params?: Params;
  playerParams?: PlayerParams;
  sequenceParams?: string;
}

export interface Avatar {
  url: string;
  width: number;
  height: number;
}

export enum Params {
  CBEwAg3D3D = "CBEwAg%3D%3D",
}

export enum PlayerParams {
  The8AEByAMkuAQR = "8AEByAMkuAQR",
}

export enum PurpleType {
  Shorts = "shorts",
  Video = "video",
}

export enum FluffyType {
  Player = "player",
  ShortsListing = "shorts_listing",
  VideoListing = "video_listing",
}

export interface Meta {
  channelId: string;
  title: string;
  description: string;
  channelHandle: string;
  banner: Avatar[];
  tvBanner: Avatar[];
  mobileBanner: Avatar[];
  avatar: Avatar[];
  subscriberCountText: string;
  subscriberCount: number;
  videosCountText: string;
  videosCount: number;
  isVerified: boolean;
  keywords: string[];
  isFamilySafe: boolean;
  availableCountries: string[];
  tabs: string[];
}
