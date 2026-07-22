import { TimeAgo } from "@/components/ui/time-ago";
import { BookmarkButton } from "@/components/personalization/bookmark-button";
import { NewsImage } from "../primitives/news-image";
import { NewsTitle } from "../primitives/news-title";
import { NewsCardLink, newsCardContainerClassName } from "../primitives/news-card-link";
import { cn } from "@/lib/utils";
import type { NewsCardBaseProps, NewsTitleLevel } from "../news.types";

export interface CompactNewsCardProps extends NewsCardBaseProps {
  /** 선택적 순번 (1부터 시작). 없으면 표시하지 않는다 */
  index?: number;
  showThumbnail?: boolean;
  titleLevel?: NewsTitleLevel;
}

/**
 * 사이드바, 관련 뉴스, 실시간 업데이트 등 압축 목록에 쓰는 카드
 * (task-007.md 7.4). 요약은 표시하지 않는다.
 */
export function CompactNewsCard({
  article,
  index,
  showThumbnail = false,
  titleLevel = "h4",
  priority = false,
  className,
}: CompactNewsCardProps) {
  return (
    <article className={cn(newsCardContainerClassName, className)}>
      <div className="group flex touch-target items-center gap-3 py-2.5">
        {typeof index === "number" && (
          <span
            aria-hidden
            className="type-data-number w-5 shrink-0 text-center text-text-muted"
          >
            {index}
          </span>
        )}
        {showThumbnail && (
          <NewsImage
            src={article.thumbnail.url}
            alt={article.thumbnail.alt}
            ratio="1:1"
            priority={priority}
            sizes="56px"
            className="w-14 shrink-0 rounded-sm"
          />
        )}
        <div className="min-w-0 flex-1">
          <NewsTitle level={titleLevel} size="xs" lineClamp={2}>
            <NewsCardLink href={`/news/${article.slug}`}>{article.title}</NewsCardLink>
          </NewsTitle>
          <TimeAgo date={article.publishedAt} className="mt-1 block text-text-muted" />
        </div>
        <BookmarkButton
          articleId={article.id}
          slug={article.slug}
          size="sm"
          className="shrink-0"
        />
      </div>
    </article>
  );
}
