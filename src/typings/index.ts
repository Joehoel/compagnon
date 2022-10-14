export interface RedditResponse {
  kind: string;
  data: RedditData;
}

export interface RedditData {
  modhash: string;
  dist: number;
  children: Child[];
  after: string;
  before: null;
}

export interface Child {
  kind: Kind;
  data: Post;
}

export interface Post {
  approved_at_utc: null;
  subreddit: Subreddit;
  selftext: string;
  author_fullname: string;
  saved: boolean;
  mod_reason_title: null;
  gilded: number;
  clicked: boolean;
  title: string;
  link_flair_richtext: FlairRichtext[];
  subreddit_name_prefixed: string;
  hidden: boolean;
  pwls: number;
  link_flair_css_class: LinkFlairCSSClass | null;
  downs: number;
  thumbnail_height: number;
  top_awarded_type: null;
  hide_score: boolean;
  name: string;
  quarantine: boolean;
  link_flair_text_color: FlairTextColor;
  upvote_ratio: number;
  author_flair_background_color: null | string;
  subreddit_type: SubredditType;
  ups: number;
  total_awards_received: number;
  media_embed: MediaEmbed;
  thumbnail_width: number;
  author_flair_template_id: null | string;
  is_original_content: boolean;
  user_reports: any[];
  secure_media: null;
  is_reddit_media_domain: boolean;
  is_meta: boolean;
  category: null;
  secure_media_embed: MediaEmbed;
  link_flair_text: null | string;
  can_mod_post: boolean;
  score: number;
  approved_by: null;
  author_premium: boolean;
  thumbnail: string;
  edited: boolean;
  author_flair_css_class: null | string;
  author_flair_richtext: FlairRichtext[];
  gildings: Gildings;
  post_hint: PostHint;
  content_categories: null;
  is_self: boolean;
  mod_note: null;
  created: number;
  link_flair_type: FlairType;
  wls: number;
  removed_by_category: null;
  banned_by: null;
  author_flair_type: FlairType;
  domain: Domain;
  allow_live_comments: boolean;
  selftext_html: null;
  likes: null;
  suggested_sort: SuggestedSort;
  banned_at_utc: null;
  url_overridden_by_dest: string;
  view_count: null;
  archived: boolean;
  no_follow: boolean;
  is_crosspostable: boolean;
  pinned: boolean;
  over_18: boolean;
  preview: Preview;
  all_awardings: AllAwarding[];
  awarders: any[];
  media_only: boolean;
  can_gild: boolean;
  spoiler: boolean;
  locked: boolean;
  author_flair_text: null | string;
  treatment_tags: any[];
  visited: boolean;
  removed_by: null;
  num_reports: null;
  distinguished: null | string;
  subreddit_id: SubredditID;
  mod_reason_by: null;
  removal_reason: null;
  link_flair_background_color: string;
  id: string;
  is_robot_indexable: boolean;
  report_reasons: null;
  author: string;
  discussion_type: null;
  num_comments: number;
  send_replies: boolean;
  whitelist_status: WhitelistStatus;
  contest_mode: boolean;
  mod_reports: any[];
  author_patreon_flair: boolean;
  author_flair_text_color: FlairTextColor | null;
  permalink: string;
  parent_whitelist_status: WhitelistStatus;
  stickied: boolean;
  url: string;
  subreddit_subscribers: number;
  created_utc: number;
  num_crossposts: number;
  media: null;
  is_video: boolean;
  collections?: Collection[];
  link_flair_template_id?: string;
}

export interface AllAwarding {
  giver_coin_reward: number | null;
  subreddit_id: null;
  is_new: boolean;
  days_of_drip_extension: number;
  coin_price: number;
  id: ID;
  penny_donate: number | null;
  award_sub_type: AwardSubType;
  coin_reward: number;
  icon_url: string;
  days_of_premium: number;
  tiers_by_required_awardings: null;
  resized_icons: ResizedIcon[];
  icon_width: number;
  static_icon_width: number;
  start_date: null;
  is_enabled: boolean;
  awardings_required_to_grant_benefits: null;
  description: Description;
  end_date: null;
  subreddit_coin_reward: number;
  count: number;
  static_icon_height: number;
  name: Name;
  resized_static_icons: ResizedIcon[];
  icon_format: IconFormat | null;
  icon_height: number;
  penny_price: number | null;
  award_type: AwardType;
  static_icon_url: string;
}

export interface ResizedIcon {
  url: string;
  width: number;
  height: number;
}

export interface FlairRichtext {
  e: E;
  t?: string;
  a?: string;
  u?: string;
}

export enum E {
  Emoji = "emoji",
  Text = "text",
}

export enum FlairType {
  Richtext = "richtext",
  Text = "text",
}

export interface Collection {
  permalink: string;
  link_ids: string[];
  description: string;
  title: string;
  created_at_utc: number;
  subreddit_id: SubredditID;
  author_name: string;
  collection_id: string;
  author_id: string;
  last_update_utc: number;
  display_layout: string;
}

export enum SubredditID {
  T52Zmfe = "t5_2zmfe",
}

export enum Domain {
  IImgurCOM = "i.imgur.com",
  IReddIt = "i.redd.it",
}

export interface Gildings {
  gid_1?: number;
}

export enum LinkFlairCSSClass {
  Empty = "",
  Normie = "normie",
  Pulse = "pulse",
}

export enum WhitelistStatus {
  NoAds = "no_ads",
}

export enum PostHint {
  Image = "image",
  Link = "link",
}

export interface Preview {
  images: Image[];
  enabled: boolean;
  reddit_video_preview?: RedditVideoPreview;
}

export interface Image {
  source: ResizedIcon;
  resolutions: ResizedIcon[];
  variants: Variants;
  id: string;
}

export interface Variants {
  gif?: GIF;
  mp4?: GIF;
}

export interface GIF {
  source: ResizedIcon;
  resolutions: ResizedIcon[];
}

export interface RedditVideoPreview {
  bitrate_kbps: number;
  fallback_url: string;
  height: number;
  width: number;
  scrubber_media_url: string;
  dash_url: string;
  duration: number;
  hls_url: string;
  is_gif: boolean;
  transcoding_status: string;
}

export enum SubredditType {
  Public = "public",
}

export enum SuggestedSort {
  Top = "top",
}

export enum Kind {
  T3 = "t3",
}

export type Event = (
  client: Client,
  message: Message | PartialMessage | MessageReaction,
  user?: User | PartialUser
) => Promise<any>;
