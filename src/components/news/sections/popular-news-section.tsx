import { LinkButton } from "@/components/ui/link-button";
import { cn } from "@/lib/utils";
import { RankedNewsList } from "../lists/ranked-news-list";
import type { NewsAsyncStateProps, RankedNewsListItem } from "../news.types";

export interface PopularNewsSectionProps extends NewsAsyncStateProps {
  items: RankedNewsListItem[];
  title?: string;
  showMoreHref?: string;
  className?: string;
}

/** 인기 뉴스 Top 10 특화 섹션 (task-007.md 11.2) */
export function PopularNewsSection({
  items,
  title = "인기 뉴스",
  showMoreHref,
  isLoading,
  error,
  onRetry,
  className,
}: PopularNewsSectionProps) {
  const headingId = "popular-news-section-title";

  return (
    <section className={cn("flex flex-col gap-4", className)} aria-labelledby={headingId}>
      <h2 id={headingId} className="type-section-title">
        {title}
      </h2>
      <RankedNewsList items={items} limit={10} isLoading={isLoading} error={error} onRetry={onRetry} />
      {showMoreHref && (
        <LinkButton href={showMoreHref} variant="outline" size="sm" className="self-center">
          더 보기
        </LinkButton>
      )}
    </section>
  );
}
