import { TimeAgo } from "@/components/ui/time-ago";
import { cn } from "@/lib/utils";
import { LatestNewsList } from "../lists/latest-news-list";
import type { NewsArticle, NewsAsyncStateProps } from "../news.types";

export interface LatestNewsSectionProps extends NewsAsyncStateProps {
  articles: NewsArticle[];
  title?: string;
  /** 마지막 업데이트 시각. 실제 자동 갱신은 구현하지 않는다 */
  lastUpdated?: string;
  showMoreHref?: string;
  className?: string;
}

/** 최신 뉴스 특화 섹션 (task-007.md 11.1) */
export function LatestNewsSection({
  articles,
  title = "최신 뉴스",
  lastUpdated,
  showMoreHref,
  isLoading,
  error,
  onRetry,
  className,
}: LatestNewsSectionProps) {
  const headingId = "latest-news-section-title";

  return (
    <section className={cn("flex flex-col gap-4", className)} aria-labelledby={headingId}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 id={headingId} className="type-section-title">
          {title}
        </h2>
        {lastUpdated && (
          <p className="type-metadata flex items-center gap-1.5 text-text-muted">
            마지막 업데이트 <TimeAgo date={lastUpdated} />
          </p>
        )}
      </div>
      <LatestNewsList
        articles={articles}
        groupByDate
        showMoreHref={showMoreHref}
        isLoading={isLoading}
        error={error}
        onRetry={onRetry}
      />
    </section>
  );
}
