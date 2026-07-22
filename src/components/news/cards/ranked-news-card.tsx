import { CategoryBadge } from "@/components/ui/category-badge";
import { ViewCount } from "@/components/ui/view-count";
import { TrendingIndicator } from "@/components/ui/trending-indicator";
import { BookmarkButton } from "@/components/personalization/bookmark-button";
import { NewsImage } from "../primitives/news-image";
import { NewsTitle } from "../primitives/news-title";
import { NewsCardLink, newsCardContainerClassName } from "../primitives/news-card-link";
import { cn } from "@/lib/utils";
import type { NewsCardBaseProps, NewsTitleLevel, TrendingKeywordChange } from "../news.types";

export interface RankedNewsCardProps extends NewsCardBaseProps {
  rank: number;
  /** 순위 변화. 없으면 표시하지 않는다 */
  change?: TrendingKeywordChange;
  /** change가 up/down일 때의 변동 폭 */
  delta?: number;
  showThumbnail?: boolean;
  showViewCount?: boolean;
  titleLevel?: NewsTitleLevel;
}

/**
 * 인기 뉴스 순위 카드 (task-007.md 7.9).
 *
 * 순위 숫자는 `type-data-number`(tabular-nums, mono)를 사용하고, 상승/하락은
 * `TrendingIndicator`(TASK-003)를 그대로 재사용해 아이콘 + 스크린 리더
 * 텍스트로 색상 없이도 구분되게 한다.
 */
export function RankedNewsCard({
  article,
  rank,
  change,
  delta,
  showThumbnail = false,
  showViewCount = true,
  titleLevel = "h4",
  priority = false,
  className,
}: RankedNewsCardProps) {
  return (
    <article className={cn(newsCardContainerClassName, className)}>
      <div className="group flex touch-target items-center gap-3 py-2.5">
        <span
          className="type-data-number w-7 shrink-0 text-center text-lg text-text-secondary"
          aria-hidden
        >
          {rank}
        </span>
        <span className="sr-only">{rank}위</span>

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
          <CategoryBadge category={article.category} size="sm" className="mb-1 w-fit" />
          <NewsTitle level={titleLevel} size="sm" lineClamp={2}>
            <NewsCardLink href={`/news/${article.slug}`}>{article.title}</NewsCardLink>
          </NewsTitle>
          {showViewCount && typeof article.viewCount === "number" && (
            <ViewCount count={article.viewCount} className="mt-1 text-text-muted" />
          )}
        </div>

        {change && (
          <TrendingIndicator change={change} delta={delta} className="shrink-0" />
        )}

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
