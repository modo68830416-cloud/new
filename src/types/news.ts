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
  /**
   * TASK-009에서 추가한 선택 필드 (기존 소비처를 깨뜨리지 않는다).
   * Author Card에 표시할 짧은 소개글.
   */
  bio?: string;
  /** 작성자 카드에 표시하는 Mock 누적 기사 수 */
  articleCount?: number;
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

  /**
   * 실제 뉴스 API(네이버 뉴스 검색)에서 가져온 기사의 원문 URL.
   * 값이 있으면 자체 상세 페이지(`/news/[slug]`) 대신 이 URL로 연결한다 —
   * 원문 저작권 때문에 본문을 재구성하지 않고 출처로 안내하는 방식이다.
   */
  externalUrl?: string;

  /**
   * TASK-009에서 추가한 선택 필드. 뉴스 상세 페이지(`/news/[slug]`) 전용이며
   * 값이 없어도(undefined) 카드/리스트/그리드(TASK-007) 렌더링에는 아무
   * 영향이 없다 — 실제 CMS 연동 없이 mock 데이터로만 채운다.
   */
  /** 목차·읽기 진행률의 기준이 되는 기사 본문 (H2/H3/문단/목록/인용/이미지) */
  body?: ArticleContentBlock[];
}

/**
 * 기사 본문 콘텐츠 블록 (TASK-009).
 *
 * 실제 CMS/리치 텍스트 연동 없이 mock 데이터로만 구성되는 구조화된 본문
 * 표현이다. `heading`은 목차(TOC) 생성의 기준이 되므로 `id`(앵커),
 * `level`(2|3), `text`를 갖는다.
 */
export type ArticleContentBlockType =
  | "heading"
  | "paragraph"
  | "list"
  | "quote"
  | "image";

export interface ArticleHeadingBlock {
  id: string;
  type: "heading";
  level: 2 | 3;
  text: string;
}

export interface ArticleParagraphBlock {
  id: string;
  type: "paragraph";
  text: string;
}

export interface ArticleListBlock {
  id: string;
  type: "list";
  style: "ordered" | "unordered";
  items: string[];
}

export interface ArticleQuoteBlock {
  id: string;
  type: "quote";
  text: string;
  attribution?: string;
}

/** CMS 연동 전이므로 실제 이미지가 없을 수 있다 — 없으면 fallback placeholder로 표시한다 */
export interface ArticleImageBlock {
  id: string;
  type: "image";
  src?: string;
  alt: string;
  caption?: string;
}

export type ArticleContentBlock =
  | ArticleHeadingBlock
  | ArticleParagraphBlock
  | ArticleListBlock
  | ArticleQuoteBlock
  | ArticleImageBlock;

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
