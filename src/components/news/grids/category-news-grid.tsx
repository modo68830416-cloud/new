import { cn } from "@/lib/utils";
import { FeaturedNewsCard } from "../cards/featured-news-card";
import { StandardNewsCard } from "../cards/standard-news-card";
import { NewsErrorState } from "../states/news-error-state";
import { NewsGridSkeleton } from "../states/news-list-skeleton";
import type { NewsArticle, NewsAsyncStateProps } from "../news.types";

export interface CategoryNewsGridProps extends NewsAsyncStateProps {
  featured: NewsArticle;
  /** 보조 기사. 최대 4개까지만 사용한다 */
  items: NewsArticle[];
  className?: string;
}

/**
 * 대표 기사 1개 + 보조 기사 4개 구성의 카테고리 그리드
 * (task-007.md 9.2). 정확한 비주얼보다 정보 계층(대표 기사 강조)과
 * 반응형 안정성을 우선한다 — 모바일에서는 단순한 세로 흐름으로 전환된다.
 */
export function CategoryNewsGrid({
  featured,
  items,
  isLoading = false,
  error = null,
  onRetry,
  className,
}: CategoryNewsGridProps) {
  if (isLoading) {
    return <NewsGridSkeleton columns={4} count={5} className={className} />;
  }
  if (error) {
    return <NewsErrorState description={error} onRetry={onRetry} className={className} />;
  }

  const support = items.slice(0, 4);

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 lg:grid-cols-4 lg:grid-rows-2 lg:gap-5",
        className,
      )}
    >
      <div className="lg:col-span-2 lg:row-span-2">
        <FeaturedNewsCard article={featured} showSummary />
      </div>
      {support.map((article) => (
        <StandardNewsCard key={article.id} article={article} size="small" showSummary={false} />
      ))}
    </div>
  );
}
