import { Stagger } from "@/components/motion/Stagger";
import { cn } from "@/lib/utils";
import { PhotoNewsCard } from "../cards/photo-news-card";
import { NewsGridSkeleton } from "../states/news-list-skeleton";
import { NewsEmptyState } from "../states/news-empty-state";
import { NewsErrorState } from "../states/news-error-state";
import type { NewsArticle, NewsAsyncStateProps } from "../news.types";

export interface PhotoNewsGridProps extends NewsAsyncStateProps {
  /** 3~6개 권장 */
  articles: NewsArticle[];
  /** 첫 기사를 2x2로 크게 배치할지 여부 (기사 3개 이상일 때만 적용) */
  featuredFirst?: boolean;
  skeletonCount?: number;
  className?: string;
}

/**
 * 사진 중심 뉴스 그리드 (task-007.md 9.3). 모든 타일이 고정 종횡비를
 * 사용해 layout shift를 방지하고, 이미지 위 텍스트 대비는
 * `PhotoNewsCard`(overlay="strong")가 보장한다.
 */
export function PhotoNewsGrid({
  articles,
  featuredFirst = true,
  isLoading = false,
  error = null,
  onRetry,
  skeletonCount = 6,
  className,
}: PhotoNewsGridProps) {
  if (isLoading) {
    return <NewsGridSkeleton columns={3} count={skeletonCount} className={className} />;
  }
  if (error) {
    return <NewsErrorState description={error} onRetry={onRetry} className={className} />;
  }
  if (articles.length === 0) {
    return <NewsEmptyState className={className} />;
  }

  const showFeatured = featuredFirst && articles.length >= 3;

  return (
    <Stagger className={cn("grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3", className)}>
      {articles.map((article, index) => {
        const isFeaturedTile = showFeatured && index === 0;
        return (
          <PhotoNewsCard
            key={article.id}
            article={article}
            ratio={isFeaturedTile ? "4:3" : "1:1"}
            className={cn(isFeaturedTile && "col-span-2 lg:row-span-2")}
          />
        );
      })}
    </Stagger>
  );
}
