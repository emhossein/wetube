export interface Welcome {
  commentsCount?: string;
  continuation?: string;
  data: Datum[];
  msg?: string;
}

export interface Datum {
  commentId?: string;
  authorText?: string;
  authorChannelId: string;
  authorThumbnail: AuthorThumbnail[];
  textDisplay: string;
  publishedTimeText?: string;
  publishDate?: string;
  publishedAt?: string;
  likesCount?: string;
  replyCount?: number;
  replyToken?: string;
  authorIsChannelOwner?: boolean;
}

export interface AuthorThumbnail {
  url: string;
  width?: number;
  height?: number;
}
