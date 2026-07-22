import { Stagger } from "@/components/motion/Stagger";
import { cn } from "@/lib/utils";
import { StandardNewsCard } from "../cards/standard-news-card";
import { NewsGridSkeleton } from "../states/news-list-skeleton";
import { NewsEmptyState } from "../states/news-empty-state";
import { NewsErrorState } from "../states/news-error-state";
import type {
  NewsArticle,
  NewsAsyncStateProps,
  NewsCardSize,
  NewsGridColumns,
} from "../news.types";

export interface NewsCardGridProps extends NewsAsyncStateProps {
  articles: NewsArticle[];
  /** 데스크톱(lg 이상) 최대 열 수. 모바일 1열 → 태블릿(sm) 2열은 항상 고정 */
  columns?: NewsGridColumns;
  cardSize?: NewsCardSize;
  skeletonCount?: number;
  className?: string;
}

const COLUMN_CLASSES: Record<NewsGridColumns, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

/**
 * 일반 뉴스 카드 그리드 (task-007.md 9.1).
 * 모바일 1열 → 태블릿 2열 → 데스크톱 최대 `columns`열로 반응형 전환된다.
 */
export function NewsCardGrid({
  articles,
  columns = 3,
  cardSize = "medium",
  isLoading = false,
  error = null,
  onRetry,
  skeletonCount,
  className,
}: NewsCardGridProps) {
  if (isLoading) {
    return (
      <NewsGridSkeleton
        columns={columns}
        count={skeletonCount ?? columns * 2}
        className={className}
      />
    );
  }
  if (error) {
    return <NewsErrorState description={error} onRetry={onRetry} className={className} />;
  }
  if (articles.length === 0) {
    return <NewsEmptyState className={className} />;
  }

  return (
    <Stagger
      className={cn("grid grid-cols-1 gap-4 sm:gap-5", COLUMN_CLASSES[columns], className)}
    >
      {articles.map((article) => (
        <StandardNewsCard key={article.id} article={article} size={cardSize} />
      ))}
    </Stagger>
  );
}
