import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";
import { Stagger } from "@/components/motion/Stagger";
import { cn } from "@/lib/utils";
import { OpinionNewsCard } from "../cards/opinion-news-card";
import { NewsGridSkeleton } from "../states/news-list-skeleton";
import { NewsEmptyState } from "../states/news-empty-state";
import { NewsErrorState } from "../states/news-error-state";
import type { NewsArticle, NewsAsyncStateProps } from "../news.types";

export interface OpinionSectionProps extends NewsAsyncStateProps {
  articles: NewsArticle[];
  title?: string;
  showMoreHref?: string;
  className?: string;
}

/** 오피니언(칼럼/사설) 특화 섹션 (task-007.md 11.5) */
export function OpinionSection({
  articles,
  title = "오피니언",
  showMoreHref,
  isLoading = false,
  error = null,
  onRetry,
  className,
}: OpinionSectionProps) {
  const headingId = "opinion-section-title";

  return (
    <section className={cn("flex flex-col gap-4", className)} aria-labelledby={headingId}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 id={headingId} className="type-section-title">
          {title}
        </h2>
        {showMoreHref && (
          <LinkButton
            href={showMoreHref}
            variant="ghost"
            size="sm"
            rightIcon={<ArrowRight size={14} aria-hidden />}
          >
            더 보기
          </LinkButton>
        )}
      </div>
      {isLoading ? (
        <NewsGridSkeleton columns={2} count={4} />
      ) : error ? (
        <NewsErrorState description={error} onRetry={onRetry} />
      ) : articles.length === 0 ? (
        <NewsEmptyState />
      ) : (
        <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {articles.map((article) => (
            <OpinionNewsCard key={article.id} article={article} />
          ))}
        </Stagger>
      )}
    </section>
  );
}
