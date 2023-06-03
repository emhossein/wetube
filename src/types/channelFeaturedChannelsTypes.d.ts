export interface Welcome {
  meta?: Meta;
  continuation?: string;
  data?: Datum[];
  msg?: string;
}

export interface Datum {
  type?: string;
  channelId?: string;
  title: string;
  videoCount?: string;
  subscriberCount?: string;
  thumbnail: Avatar[];
}

export interface Avatar {
  url: string;
  width?: number;
  height?: number;
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
  videosCount?: number;
  isVerified?: boolean;
  keywords?: string[];
  isFamilySafe?: boolean;
  availableCountries?: string[];
  tabs?: string[];
}
