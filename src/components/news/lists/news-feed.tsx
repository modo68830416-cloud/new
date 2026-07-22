import { Stagger } from "@/components/motion/Stagger";
import { cn } from "@/lib/utils";
import { HorizontalNewsCard } from "../cards/horizontal-news-card";
import { StandardNewsCard } from "../cards/standard-news-card";
import { NewsCardGrid } from "../grids/news-card-grid";
import { NewsGridSkeleton, NewsListSkeleton } from "../states/news-list-skeleton";
import { NewsEmptyState } from "../states/news-empty-state";
import { NewsErrorState } from "../states/news-error-state";
import type {
  NewsArticle,
  NewsAsyncStateProps,
  NewsFeedLayout,
  NewsGridColumns,
} from "../news.types";

export interface NewsFeedProps extends NewsAsyncStateProps {
  articles: NewsArticle[];
  layout?: NewsFeedLayout;
  /** grid/mixed 레이아웃에서 사용하는 열 수 */
  columns?: NewsGridColumns;
  className?: string;
}

/**
 * 여러 카드 variant를 조합하는 피드 컨테이너 (task-007.md 8.4).
 * 외부 masonry 라이브러리 없이 CSS Grid/Flexbox만으로 list/grid/mixed
 * 세 가지 레이아웃을 지원한다.
 */
export function NewsFeed({
  articles,
  layout = "grid",
  columns = 3,
  isLoading = false,
  error = null,
  onRetry,
  className,
}: NewsFeedProps) {
  if (isLoading) {
    return layout === "list" ? (
      <NewsListSkeleton variant="horizontal" className={className} />
    ) : (
      <NewsGridSkeleton columns={columns} className={className} />
    );
  }
  if (error) {
    return <NewsErrorState description={error} onRetry={onRetry} className={className} />;
  }
  if (articles.length === 0) {
    return <NewsEmptyState className={className} />;
  }

  if (layout === "list") {
    return (
      <Stagger className={cn("flex flex-col gap-3", className)}>
        {articles.map((article) => (
          <HorizontalNewsCard key={article.id} article={article} />
        ))}
      </Stagger>
    );
  }

  if (layout === "mixed") {
    const [first, ...rest] = articles;
    return (
      <div className={cn("flex flex-col gap-5", className)}>
        {first && <StandardNewsCard article={first} size="large" />}
        {rest.length > 0 && <NewsCardGrid articles={rest} columns={columns} cardSize="medium" />}
      </div>
    );
  }

  return <NewsCardGrid articles={articles} columns={columns} className={className} />;
}
