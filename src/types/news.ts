export interface NewsCategory {
  id: string;
  slug: string;
  name: string;
  shortName?: string;
  description?: string;
  order: number;
  isVisible: boolean;
}

export interface NewsSource {
  id: string;
  name: string;
  url?: string;
  logoUrl?: string;
}

export interface Author {
  id: string;
  name: string;
  role?: string;
  profileImage?: string;
}

export type MediaAssetType = "image" | "video";

export interface MediaAsset {
  id: string;
  type: MediaAssetType;
  url: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
  credit?: string;
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  summary: string;
  content: string;
  category: NewsCategory;
  source: NewsSource;
  author?: Author;
  publishedAt: string;
  updatedAt?: string;
  thumbnail: MediaAsset;
  heroImage?: MediaAsset;
  isBreaking: boolean;
  isFeatured: boolean;
  isExclusive?: boolean;
  viewCount: number;
  commentCount: number;
  shareCount?: number;
  tags: string[];

  /**
   * TASK-007에서 추가한 선택 필드. 모두 optional이며 기존 데이터/사용처
   * (`FeaturedHero`, `SecondaryNewsGrid`, `BreakingTicker`, `mock-news.ts` 등)를
   * 깨뜨리지 않는다. 값이 없으면 카드/섹션은 일반 기사로 취급한다.
   */
  /** 카드 표현 유형. 기본값은 `"article"`로 취급한다 */
  contentType?: NewsContentType;
  /** 현재 라이브로 진행 중인 기사(스트리밍/특보 중계 등) 여부 */
  isLive?: boolean;
  /** 구독자 전용 등 프리미엄 콘텐츠 표시 */
  isPremium?: boolean;
  /** 영상 기사 재생 길이 표시용 (예: "03:24"). VideoNewsCard에서 사용 */
  duration?: string;
}

/**
 * 기사 유형 (TASK-007).
 *
 * `NewsArticle.contentType`은 선택 필드다 — 지정하지 않으면 카드/섹션은
 * 일반 `"article"`로 취급한다. 카테고리(`NewsCategory`)와는 별개의 축으로,
 * "어떤 형태로 표현할 카드인가"를 나타낸다 (예: 같은 society 카테고리 기사도
 * contentType에 따라 PhotoNewsCard 또는 StandardNewsCard로 표현될 수 있다).
 */
export type NewsContentType =
  | "article"
  | "breaking"
  | "photo"
  | "video"
  | "opinion"
  | "live";

export type BreakingNewsLevel = "normal" | "urgent" | "critical";

export interface BreakingNewsItem {
  id: string;
  articleId?: string;
  title: string;
  timestamp: string;
  level: BreakingNewsLevel;
  isActive: boolean;
}

export type TrendingKeywordChange = "up" | "down" | "same" | "new";

export interface TrendingKeyword {
  id: string;
  keyword: string;
  rank: number;
  previousRank?: number;
  change: TrendingKeywordChange;
  score?: number;
}
