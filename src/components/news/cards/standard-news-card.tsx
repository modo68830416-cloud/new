import { Card } from "@/components/ui/card";
import { CategoryBadge } from "@/components/ui/category-badge";
import { Badge } from "@/components/ui/badge";
import { BookmarkButton } from "@/components/personalization/bookmark-button";
import { NewsShareButton } from "../primitives/news-share-button";
import { NewsImage } from "../primitives/news-image";
import { NewsTitle } from "../primitives/news-title";
import { NewsSummary } from "../primitives/news-summary";
import { NewsCardMeta } from "../primitives/news-meta";
import { NewsCardLink, newsCardContainerClassName } from "../primitives/news-card-link";
import { cn } from "@/lib/utils";
import type { NewsCardBaseProps, NewsCardSize, NewsTitleLevel } from "../news.types";

export interface StandardNewsCardProps extends NewsCardBaseProps {
  size?: NewsCardSize;
  /** 지정하지 않으면 size에 맞는 기본값을 사용한다 (small: false, medium/large: true) */
  showSummary?: boolean;
  showViewCount?: boolean;
  titleLevel?: NewsTitleLevel;
}

const TITLE_SIZE_BY_CARD_SIZE = { small: "sm", medium: "md", large: "lg" } as const;
const DEFAULT_SUMMARY_BY_SIZE: Record<NewsCardSize, boolean> = {
  small: false,
  medium: true,
  large: true,
};
const PADDING_BY_SIZE: Record<NewsCardSize, string> = {
  small: "gap-2 p-3",
  medium: "gap-2.5 p-4",
  large: "gap-3 p-5",
};

/**
 * 가장 일반적으로 쓰이는 뉴스 카드 (task-007.md 7.2).
 * 카드 크기(small/medium/large)에 따라 정보 밀도를 조절한다.
 */
export function StandardNewsCard({
  article,
  size = "medium",
  showSummary,
  showViewCount = true,
  titleLevel = "h3",
  priority = false,
  className,
}: StandardNewsCardProps) {
  const resolvedShowSummary = showSummary ?? DEFAULT_SUMMARY_BY_SIZE[size];

  return (
    <article className={cn(newsCardContainerClassName, "h-full", className)}>
      <Card
        padding="none"
        interactive
        className="group flex h-full flex-col overflow-hidden"
      >
        <NewsImage
          src={article.thumbnail.url}
          alt={article.thumbnail.alt}
          ratio="16:9"
          priority={priority}
          enableZoom
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
        <div className={cn("flex flex-1 flex-col", PADDING_BY_SIZE[size])}>
          <div className="flex flex-wrap items-center gap-2">
            <CategoryBadge category={article.category} size="sm" />
            {article.isPremium && (
              <Badge tone="warning" variant="outline" size="sm">
                프리미엄
              </Badge>
            )}
            <div className="ml-auto flex items-center gap-1">
              <NewsShareButton article={article} />
              <BookmarkButton articleId={article.id} slug={article.slug} size="sm" />
            </div>
          </div>

          <NewsTitle level={titleLevel} size={TITLE_SIZE_BY_CARD_SIZE[size]} lineClamp={2}>
            <NewsCardLink href={`/news/${article.slug}`}>{article.title}</NewsCardLink>
          </NewsTitle>

          {resolvedShowSummary && article.summary && (
            <NewsSummary lineClamp={2}>{article.summary}</NewsSummary>
          )}

          <NewsCardMeta
            publishedAt={article.publishedAt}
            viewCount={showViewCount ? article.viewCount : undefined}
            showCategory={false}
            className="mt-auto pt-1"
          />
        </div>
      </Card>
    </article>
  );
}
