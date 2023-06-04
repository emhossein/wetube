export interface Welcome {
  continuation?: string;
  estimatedResults?: string;
  data: WelcomeDatum[];
  msg?: string;
  refinements?: string[];
  meta?: Meta;
}

export interface WelcomeDatum {
  type?: string;
  videoId: string;
  title: string;
  channelTitle: string;
  channelId?: string;
  channelThumbnail: Thumbnail[];
  description?: string;
  viewCount?: string;
  publishedTimeText?: null | string;
  publishDate?: null | string;
  publishedAt?: string;
  lengthText?: string;
  badges?: string[];
  thumbnail: Thumbnail[];
  richThumbnail?: Thumbnail[] | null;
  data: DatumDatum[];
}

export interface Thumbnail {
  url: string;
  width?: number;
  height?: number;
}

export interface DatumDatum {
  type?: string;
  videoId?: string;
  title: string;
  viewCountText?: string;
  thumbnail: Thumbnail[];
  isOriginalAspectRatio?: boolean;
  params?: string;
  playerParams?: string;
  sequenceParams?: string;
  query: string;
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
