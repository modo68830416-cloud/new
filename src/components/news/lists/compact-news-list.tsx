import { Divider } from "@/components/ui/divider";
import { Stagger } from "@/components/motion/Stagger";
import { cn } from "@/lib/utils";
import { CompactNewsCard } from "../cards/compact-news-card";
import { NewsListSkeleton } from "../states/news-list-skeleton";
import { NewsEmptyState } from "../states/news-empty-state";
import { NewsErrorState } from "../states/news-error-state";
import type { NewsArticle, NewsAsyncStateProps } from "../news.types";

export interface CompactNewsListProps extends NewsAsyncStateProps {
  articles: NewsArticle[];
  showThumbnail?: boolean;
  /** 5~8개 정도의 압축 리스트로 사용하도록 기본값을 8로 제한한다 */
  limit?: number;
  skeletonCount?: number;
  className?: string;
}

/**
 * 사이드바/관련 뉴스용 압축 리스트 (task-007.md 8.3). 구분선과
 * `touch-target`(CompactNewsCard 내부)로 터치 영역을 확보한다.
 */
export function CompactNewsList({
  articles,
  showThumbnail = false,
  limit = 8,
  isLoading = false,
  error = null,
  onRetry,
  skeletonCount = 6,
  className,
}: CompactNewsListProps) {
  if (isLoading) {
    return <NewsListSkeleton variant="compact" count={skeletonCount} className={className} />;
  }
  if (error) {
    return <NewsErrorState description={error} onRetry={onRetry} className={className} />;
  }

  const visible = articles.slice(0, limit);
  if (visible.length === 0) {
    return <NewsEmptyState className={className} />;
  }

  return (
    <Stagger className={cn("flex flex-col", className)}>
      {visible.map((article, index) => (
        <div key={article.id}>
          <CompactNewsCard article={article} showThumbnail={showThumbnail} />
          {index < visible.length - 1 && <Divider />}
        </div>
      ))}
    </Stagger>
  );
}
