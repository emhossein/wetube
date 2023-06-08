export interface Welcome {
  meta?: Meta;
  continuation?: string;
  data?: Datum[];
  msg?: string;
}

export interface Datum {
  type?: string;
  videoId?: string;
  title: string;
  channelTitle?: string;
  channelId?: string;
  channelThumbnail: Thumbnail[];
  description?: string;
  viewCount?: string;
  publishedTimeText?: string;
  publishDate?: string;
  publishedAt?: string;
  lengthText?: string;
  thumbnail: Thumbnail[];
  richThumbnail?: Thumbnail[] | null;
  data?: Datum[];
  badges?: string[];
  sequenceParams?: string;
  query: string;
}

export interface Thumbnail {
  url: string;
  width?: number;
  height?: number;
}

export interface Meta {
  hashtag?: string;
  hashtagInfoText?: string;
}
