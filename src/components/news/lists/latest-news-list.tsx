import { Divider } from "@/components/ui/divider";
import { LinkButton } from "@/components/ui/link-button";
import { Stagger } from "@/components/motion/Stagger";
import { formatAbsoluteDate } from "@/lib/format-date";
import { cn } from "@/lib/utils";
import { HorizontalNewsCard } from "../cards/horizontal-news-card";
import { NewsListSkeleton } from "../states/news-list-skeleton";
import { NewsEmptyState } from "../states/news-empty-state";
import { NewsErrorState } from "../states/news-error-state";
import type { NewsArticle, NewsAsyncStateProps } from "../news.types";

export interface LatestNewsListProps extends NewsAsyncStateProps {
  articles: NewsArticle[];
  /**
   * 발행 날짜별로 구분선을 넣는다. `articles`가 최신순으로 이미 정렬되어
   * 있다고 가정하고, 같은 날짜가 연속될 때만 하나의 그룹으로 묶는다
   * (실행 시점의 "지금"에 의존하지 않으므로 서버/클라이언트 렌더링 결과가
   * 항상 같다).
   */
  groupByDate?: boolean;
  showMoreHref?: string;
  showMoreLabel?: string;
  skeletonCount?: number;
  className?: string;
}

interface DateGroup {
  label: string | null;
  items: NewsArticle[];
}

function groupByPublishedDate(articles: NewsArticle[]): DateGroup[] {
  const groups: DateGroup[] = [];
  for (const article of articles) {
    const label = formatAbsoluteDate(article.publishedAt);
    const last = groups[groups.length - 1];
    if (last && last.label === label) {
      last.items.push(article);
    } else {
      groups.push({ label, items: [article] });
    }
  }
  return groups;
}

/**
 * 최신순 뉴스 리스트 (task-007.md 8.1). 실제 서버 페이지네이션은 구현하지
 * 않고, `showMoreHref`가 있을 때만 "더 보기" 링크를 노출한다.
 */
export function LatestNewsList({
  articles,
  groupByDate = false,
  showMoreHref,
  showMoreLabel = "더 보기",
  isLoading = false,
  error = null,
  onRetry,
  skeletonCount = 5,
  className,
}: LatestNewsListProps) {
  if (isLoading) {
    return <NewsListSkeleton variant="horizontal" count={skeletonCount} className={className} />;
  }
  if (error) {
    return <NewsErrorState description={error} onRetry={onRetry} className={className} />;
  }
  if (articles.length === 0) {
    return <NewsEmptyState className={className} />;
  }

  const groups: DateGroup[] = groupByDate
    ? groupByPublishedDate(articles)
    : [{ label: null, items: articles }];

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {groups.map((group, groupIndex) => (
        <div key={group.label ?? groupIndex} className="flex flex-col gap-3">
          {group.label && <Divider label={group.label} />}
          <Stagger className="flex flex-col gap-3">
            {group.items.map((article) => (
              <HorizontalNewsCard key={article.id} article={article} />
            ))}
          </Stagger>
        </div>
      ))}
      {showMoreHref && (
        <LinkButton href={showMoreHref} variant="outline" size="sm" className="self-center">
          {showMoreLabel}
        </LinkButton>
      )}
    </div>
  );
}
