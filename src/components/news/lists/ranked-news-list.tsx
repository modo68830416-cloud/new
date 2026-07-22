import { Divider } from "@/components/ui/divider";
import { Stagger } from "@/components/motion/Stagger";
import { cn } from "@/lib/utils";
import { RankedNewsCard } from "../cards/ranked-news-card";
import { NewsListSkeleton } from "../states/news-list-skeleton";
import { NewsEmptyState } from "../states/news-empty-state";
import { NewsErrorState } from "../states/news-error-state";
import type { NewsAsyncStateProps, RankedNewsListItem } from "../news.types";

export interface RankedNewsListProps extends NewsAsyncStateProps {
  items: RankedNewsListItem[];
  /** 상위 몇 개까지 표시할지. 기본 10 (1위~10위) */
  limit?: number;
  showThumbnail?: boolean;
  skeletonCount?: number;
  className?: string;
}

/**
 * 인기 뉴스 Top N 리스트 (task-007.md 8.2). 데스크톱 사이드바 또는 모바일
 * 독립 섹션 어디에서도 쓸 수 있도록 폭을 강제하지 않는다.
 */
export function RankedNewsList({
  items,
  limit = 10,
  showThumbnail = false,
  isLoading = false,
  error = null,
  onRetry,
  skeletonCount = 8,
  className,
}: RankedNewsListProps) {
  if (isLoading) {
    return <NewsListSkeleton variant="compact" count={skeletonCount} className={className} />;
  }
  if (error) {
    return <NewsErrorState description={error} onRetry={onRetry} className={className} />;
  }

  const visible = items.slice(0, limit);
  if (visible.length === 0) {
    return <NewsEmptyState className={className} />;
  }

  return (
    <Stagger className={cn("flex flex-col", className)}>
      {visible.map((item, index) => (
        <div key={item.article.id}>
          <RankedNewsCard
            article={item.article}
            rank={item.rank}
            change={item.change}
            delta={item.delta}
            showThumbnail={showThumbnail}
          />
          {index < visible.length - 1 && <Divider />}
        </div>
      ))}
    </Stagger>
  );
}
