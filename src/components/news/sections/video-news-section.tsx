import { ArrowRight, Clapperboard } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/link-button";
import { Stagger } from "@/components/motion/Stagger";
import { cn } from "@/lib/utils";
import { VideoNewsCard } from "../cards/video-news-card";
import { NewsGridSkeleton } from "../states/news-list-skeleton";
import { NewsEmptyState } from "../states/news-empty-state";
import { NewsErrorState } from "../states/news-error-state";
import type { NewsArticle, NewsAsyncStateProps } from "../news.types";

export interface VideoNewsSectionProps extends NewsAsyncStateProps {
  articles: NewsArticle[];
  title?: string;
  showMoreHref?: string;
  className?: string;
}

/** 영상 뉴스 특화 섹션 (task-007.md 11.4). 실제 재생 기능은 구현하지 않는다 */
export function VideoNewsSection({
  articles,
  title = "영상 뉴스",
  showMoreHref,
  isLoading = false,
  error = null,
  onRetry,
  className,
}: VideoNewsSectionProps) {
  const headingId = "video-news-section-title";

  return (
    <section className={cn("flex flex-col gap-4", className)} aria-labelledby={headingId}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <h2 id={headingId} className="type-section-title">
            {title}
          </h2>
          <Badge tone="neutral" variant="outline" size="sm" icon={<Clapperboard size={12} aria-hidden />}>
            VIDEO
          </Badge>
        </div>
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
        <NewsGridSkeleton columns={3} />
      ) : error ? (
        <NewsErrorState description={error} onRetry={onRetry} />
      ) : articles.length === 0 ? (
        <NewsEmptyState />
      ) : (
        <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <VideoNewsCard key={article.id} article={article} />
          ))}
        </Stagger>
      )}
    </section>
  );
}
