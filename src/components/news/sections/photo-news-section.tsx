import { ArrowRight, Camera } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/link-button";
import { cn } from "@/lib/utils";
import { PhotoNewsGrid } from "../grids/photo-news-grid";
import type { NewsArticle, NewsAsyncStateProps } from "../news.types";

export interface PhotoNewsSectionProps extends NewsAsyncStateProps {
  articles: NewsArticle[];
  title?: string;
  showMoreHref?: string;
  className?: string;
}

/** 사진 중심 뉴스 특화 섹션 (task-007.md 11.3) */
export function PhotoNewsSection({
  articles,
  title = "사진으로 보는 뉴스",
  showMoreHref,
  isLoading,
  error,
  onRetry,
  className,
}: PhotoNewsSectionProps) {
  const headingId = "photo-news-section-title";

  return (
    <section className={cn("flex flex-col gap-4", className)} aria-labelledby={headingId}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <h2 id={headingId} className="type-section-title">
            {title}
          </h2>
          <Badge tone="neutral" variant="outline" size="sm" icon={<Camera size={12} aria-hidden />}>
            PHOTO
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
      <PhotoNewsGrid articles={articles} isLoading={isLoading} error={error} onRetry={onRetry} />
    </section>
  );
}
