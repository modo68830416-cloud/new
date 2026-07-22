/**
 * TASK-007 뉴스 카드 시스템의 공개 API 모음.
 *
 * 소비하는 쪽(페이지/섹션)은 항상 이 배럴을 통해 import한다:
 * `import { StandardNewsCard, NewsCardGrid } from "@/components/news";`
 */

// 타입
export * from "./news.types";

// Primitives
export { NewsImage } from "./primitives/news-image";
export { NewsTitle } from "./primitives/news-title";
export { NewsSummary } from "./primitives/news-summary";
export { NewsCardMeta } from "./primitives/news-meta";
export { NewsSourceLine } from "./primitives/news-source";
export { NewsShareAction } from "./primitives/news-actions";
export { NewsShareButton } from "./primitives/news-share-button";
export { NewsCardLink, newsCardContainerClassName } from "./primitives/news-card-link";

// Cards
export { FeaturedNewsCard, type FeaturedNewsCardProps } from "./cards/featured-news-card";
export { StandardNewsCard, type StandardNewsCardProps } from "./cards/standard-news-card";
export { HorizontalNewsCard, type HorizontalNewsCardProps } from "./cards/horizontal-news-card";
export { CompactNewsCard, type CompactNewsCardProps } from "./cards/compact-news-card";
export { BreakingNewsCard, type BreakingNewsCardProps } from "./cards/breaking-news-card";
export { PhotoNewsCard, type PhotoNewsCardProps } from "./cards/photo-news-card";
export { VideoNewsCard, type VideoNewsCardProps } from "./cards/video-news-card";
export { OpinionNewsCard, type OpinionNewsCardProps } from "./cards/opinion-news-card";
export { RankedNewsCard, type RankedNewsCardProps } from "./cards/ranked-news-card";

// Lists
export { LatestNewsList, type LatestNewsListProps } from "./lists/latest-news-list";
export { RankedNewsList, type RankedNewsListProps } from "./lists/ranked-news-list";
export { CompactNewsList, type CompactNewsListProps } from "./lists/compact-news-list";
export { NewsFeed, type NewsFeedProps } from "./lists/news-feed";

// Grids
export { NewsCardGrid, type NewsCardGridProps } from "./grids/news-card-grid";
export { PhotoNewsGrid, type PhotoNewsGridProps } from "./grids/photo-news-grid";
export { CategoryNewsGrid, type CategoryNewsGridProps } from "./grids/category-news-grid";

// Sections
export { CategorySection } from "./sections/category-section";
export { LatestNewsSection, type LatestNewsSectionProps } from "./sections/latest-news-section";
export { PopularNewsSection, type PopularNewsSectionProps } from "./sections/popular-news-section";
export { PhotoNewsSection, type PhotoNewsSectionProps } from "./sections/photo-news-section";
export { VideoNewsSection, type VideoNewsSectionProps } from "./sections/video-news-section";
export { OpinionSection, type OpinionSectionProps } from "./sections/opinion-section";

// States
export {
  FeaturedNewsCardSkeleton,
  StandardNewsCardSkeleton,
  HorizontalNewsCardSkeleton,
  CompactNewsCardSkeleton,
  type NewsCardSkeletonProps,
} from "./states/news-card-skeleton";
export {
  NewsListSkeleton,
  NewsGridSkeleton,
  type NewsListSkeletonProps,
  type NewsGridSkeletonProps,
  type NewsListSkeletonVariant,
} from "./states/news-list-skeleton";
export { NewsEmptyState, type NewsEmptyStateProps } from "./states/news-empty-state";
export { NewsErrorState, type NewsErrorStateProps } from "./states/news-error-state";
