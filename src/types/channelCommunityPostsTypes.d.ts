export interface Welcome {
  meta: Meta;
  continuation: string;
  data: Datum[];
  msg: string;
}

export interface Datum {
  type: Type;
  postId: string;
  authorText: Title;
  authorChannelId: ChannelId;
  authorThumbnail: Avatar[];
  contentText: string;
  publishedTimeText: string;
  publishDate: Date;
  publishedAt?: Date;
  voteCountText?: string;
  voteStatus?: VoteStatus;
  replyCount?: string;
  attachment?: Attachment | undefined;
}

export interface Attachment {
  type: string;
  image: any;
  totalVotes?: string;
  choices?: string[];
}

export interface Image {
  url: string;
  width?: number;
  height?: number;
}

export interface Avatar {
  url: string;
  width?: number;
  height?: number;
}

export enum Type {
  Post = "post",
}

export enum VoteStatus {
  Indifferent = "INDIFFERENT",
}

export interface Meta {
  channelId?: string;
  title?: string;
  description?: string;
  channelHandle?: string;
  banner?: Avatar[];
  tvBanner?: Avatar[];
  mobileBanner?: Avatar[];
  avatar?: Avatar[];
  subscriberCountText?: string;
  subscriberCount?: number;
  videosCountText?: string;
  videosCount?: string;
  isVerified?: boolean;
  keywords?: string[];
  isFamilySafe?: boolean;
  availableCountries?: string[];
  tabs?: string[];
}
