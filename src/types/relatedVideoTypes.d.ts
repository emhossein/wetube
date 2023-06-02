export interface Welcome {
  meta?: Meta;
  continuation?: string;
  data: Datum[];
  msg?: string;
}

export interface Datum {
  type?: Type;
  videoId?: string;
  title: string;
  lengthText?: string;
  viewCount?: string;
  publishedTimeText?: string;
  publishDate?: Date;
  publishedAt?: Date;
  thumbnail: Thumbnail[];
  channelTitle?: string;
  channelId?: string;
  channelThumbnail?: Thumbnail[];
}

export interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

export enum Type {
  Video = "video",
}

export interface Meta {
  videoId: string;
  title: string;
  viewCount: string;
  likeCount: string;
  superTitle: null;
  publishDate: Date;
  publishedAt: Date;
  channelId: string;
  channelTitle: string;
  channelThumbnail: Thumbnail[];
  subscriberCountText: string;
  subscriberCount: number;
  channelBadges: string[];
  description: string;
  commentCountText: string;
  commentCount: number;
}
