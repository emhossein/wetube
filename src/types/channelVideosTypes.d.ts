export interface Welcome {
  meta: Meta;
  continuation: string;
  data: Datum[];
  msg: string;
}

export interface Datum {
  type: Type;
  videoId: string;
  title: string;
  description?: string;
  viewCount?: string;
  publishedTimeText?: string;
  publishDate?: Date;
  publishedAt?: Date;
  lengthText?: string;
  thumbnail: Avatar[];
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

export enum Type {
  Video = "video",
  Shorts = "shorts",
}

export interface Meta {
  channelId: string;
  title: string;
  description: string;
  channelHandle?: string;
  banner?: Avatar[];
  tvBanner?: Avatar[];
  mobileBanner?: Avatar[];
  avatar: Avatar[];
  subscriberCountText?: string;
  subscriberCount?: number;
  videosCountText?: string;
  videosCount?: number;
  isVerified?: boolean;
  keywords?: string[];
  isFamilySafe?: boolean;
  availableCountries?: string[];
  tabs?: string[];
}
