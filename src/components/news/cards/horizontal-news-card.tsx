import { Card } from "@/components/ui/card";
import { CategoryBadge } from "@/components/ui/category-badge";
import { BookmarkButton } from "@/components/personalization/bookmark-button";
import { NewsImage } from "../primitives/news-image";
import { NewsTitle } from "../primitives/news-title";
import { NewsSummary } from "../primitives/news-summary";
import { NewsCardMeta } from "../primitives/news-meta";
import { NewsCardLink, newsCardContainerClassName } from "../primitives/news-card-link";
import { cn } from "@/lib/utils";
import type { NewsCardBaseProps, NewsTitleLevel } from "../news.types";

export interface HorizontalNewsCardProps extends NewsCardBaseProps {
  imagePosition?: "left" | "right";
  showSummary?: boolean;
  size?: "sm" | "md";
  titleLevel?: NewsTitleLevel;
}

const IMAGE_WIDTH_CLASSES: Record<"sm" | "md", string> = {
  sm: "w-24 xs:w-28",
  md: "w-28 xs:w-36 sm:w-44",
};

/**
 * 최신 뉴스 피드, 카테고리 리스트 등에서 사용하는 가로형 카드
 * (task-007.md 7.3). 썸네일 폭을 고정해 제목이 지나치게 압축되지
 * 않도록 한다 (남은 공간은 항상 `flex-1 min-w-0`으로 제목이 차지).
 */
export function HorizontalNewsCard({
  article,
  imagePosition = "left",
  showSummary = true,
  size = "md",
  titleLevel = "h3",
  priority = false,
  className,
}: HorizontalNewsCardProps) {
  return (
    <article className={cn(newsCardContainerClassName, className)}>
      <Card
        padding="none"
        interactive
        className={cn(
          "group flex overflow-hidden",
          imagePosition === "right" && "flex-row-reverse",
        )}
      >
        <NewsImage
          src={article.thumbnail.url}
          alt={article.thumbnail.alt}
          ratio="4:3"
          priority={priority}
          enableZoom
          sizes="160px"
          className={cn(IMAGE_WIDTH_CLASSES[size], "shrink-0")}
        />
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5 p-3 sm:p-4">
          <div className="flex items-center gap-2">
            <CategoryBadge category={article.category} size="sm" className="w-fit" />
            <BookmarkButton
              articleId={article.id}
              slug={article.slug}
              size="sm"
              className="ml-auto"
            />
          </div>
          <NewsTitle
            level={titleLevel}
            size={size === "sm" ? "sm" : "md"}
            lineClamp={2}
          >
            <NewsCardLink href={`/news/${article.slug}`}>{article.title}</NewsCardLink>
          </NewsTitle>
          {showSummary && article.summary && (
            <NewsSummary lineClamp={2} hideOnMobile className="hidden sm:block">
              {article.summary}
            </NewsSummary>
          )}
          <NewsCardMeta
            publishedAt={article.publishedAt}
            sourceName={article.source?.name}
            showCategory={false}
          />
        </div>
      </Card>
    </article>
  );
}
