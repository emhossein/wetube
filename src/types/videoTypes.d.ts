export interface Welcome {
  status?: number;
  result: Result;
}

export interface Result {
  id?: string;
  title?: string;
  formats: Format[];
  thumbnails?: Thumbnail[];
  thumbnail?: string;
  description?: string;
  uploader?: string;
  uploaderID?: string;
  uploaderURL?: string;
  channelID?: string;
  channelURL?: string;
  duration?: number;
  viewCount?: number;
  ageLimit?: number;
  webpageURL?: string;
  categories?: Category[];
  tags?: any[];
  playableInEmbed?: boolean;
  liveStatus?: string;
  automaticCaptions?: { [key: string]: AutomaticCaption[] };
  subtitles: Subtitles;
  likeCount?: number;
  channel?: string;
  channelFollowerCount?: number;
  uploadDate?: UploadDate;
  availability?: string;
  webpageURLBasename?: string;
  webpageURLDomain?: string;
  extractor?: string;
  extractorKey?: string;
  displayID?: string;
  fulltitle?: string;
  durationString?: string;
  isLive?: boolean;
  wasLive?: boolean;
  format: string;
  formatID?: string;
  ext?: AudioEXTEnum;
  protocol?: string;
  formatNote?: string;
  filesizeApprox?: number;
  tbr?: number;
  width?: number;
  height?: number;
  resolution?: string;
  fps?: number;
  dynamicRange?: DynamicRange;
  vcodec?: string;
  vbr?: number;
  aspectRatio?: number;
  acodec?: Acodec;
  abr?: number;
  asr?: number;
  audioChannels?: number;
  epoch?: number;
  type?: string;
  metadataFile?: any;
}

export enum Acodec {
  Mp4A402 = "mp4a.40.2",
  Mp4A405 = "mp4a.40.5",
  None = "none",
  Opus = "opus",
}

export interface AutomaticCaption {
  ext: AutomaticCaptionEXT;
  url: string;
  name: string;
}

export enum AutomaticCaptionEXT {
  Json3 = "json3",
  Srv1 = "srv1",
  Srv2 = "srv2",
  Srv3 = "srv3",
  Ttml = "ttml",
  Vtt = "vtt",
}

export interface Category {
  title?: string;
}

export enum DynamicRange {
  SDR = "SDR",
}

export enum AudioEXTEnum {
  M4A = "m4a",
  None = "none",
  Webm = "webm",
}

export interface Format {
  asr?: number;
  filesize: number;
  formatID?: string;
  format_note: string;
  sourcePreference?: number;
  audioChannels?: number;
  quality?: number;
  hasDRM?: boolean;
  tbr?: number;
  url: string;
  languagePreference?: number;
  ext?: VideoEXTEnum;
  vcodec?: string;
  acodec?: Acodec;
  abr?: number;
  protocol?: Protocol;
  container?: Container;
  resolution?: string;
  audioEXT?: AudioEXTEnum;
  videoEXT?: VideoEXTEnum;
  format?: string;
  fps?: number;
  height?: number;
  width?: number;
  preference?: number;
  dynamicRange?: DynamicRange;
  aspectRatio?: number;
  vbr?: number;
}

export enum Container {
  M4ADash = "m4a_dash",
  Mp4Dash = "mp4_dash",
  WebmDash = "webm_dash",
}

export enum VideoEXTEnum {
  M4A = "m4a",
  Mp4 = "mp4",
  None = "none",
  The3Gp = "3gp",
  Webm = "webm",
}

export enum Protocol {
  HTTPDashSegments = "http_dash_segments",
  HTTPS = "https",
}

export interface Subtitles {
  en: AutomaticCaption[];
}

export interface Thumbnail {
  url?: string;
  preference?: number;
  id?: string;
  height?: number;
  width?: number;
  resolution?: string;
}

export interface UploadDate {
  date?: Date;
  timezoneType?: number;
  timezone?: string;
}
