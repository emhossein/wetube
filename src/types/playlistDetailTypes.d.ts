export interface Welcome {
  meta: Meta;
  continuation: string;
  data: Datum[];
  msg: string;
}

export interface Datum {
  videoId: string;
  title: string;
  index: string;
  lengthSeconds?: string;
  lengthText?: string;
  thumbnail: Avatar[];
  videoOwnerChannelTitle?: string;
  videoOwnerChannelId?: string;
  channelTitle?: string;
  channelId?: string;
  isPlayable?: boolean;
  videoInfo?: string;
  viewCountText?: string;
  viewCount?: number;
  publishedTimeText?: string;
  publishDate?: Date;
  publishedAt?: Date;
}

export interface Avatar {
  url: string;
  width?: number;
  height?: number;
}

export interface Meta {
  playlistId?: string;
  title: string;
  description?: null;
  thumbnail: Avatar[];
  videoCount?: string;
  videoCountText?: string;
  viewCount?: string;
  viewCountText?: string;
  lastUpdated?: string;
  avatar?: Avatar[];
  channelTitle?: string;
  channelId?: string;
  isEditable?: boolean;
  privacy?: string;
}
