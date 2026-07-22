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
}

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
