import { Play } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CategoryBadge } from "@/components/ui/category-badge";
import { BookmarkButton } from "@/components/personalization/bookmark-button";
import { NewsImage } from "../primitives/news-image";
import { NewsTitle } from "../primitives/news-title";
import { NewsCardMeta } from "../primitives/news-meta";
import { NewsCardLink, newsCardContainerClassName } from "../primitives/news-card-link";
import { cn } from "@/lib/utils";
import type { NewsCardBaseProps, NewsTitleLevel } from "../news.types";

export interface VideoNewsCardProps extends NewsCardBaseProps {
  /** 지정하지 않으면 `article.duration`을 사용한다 */
  duration?: string;
  titleLevel?: NewsTitleLevel;
}

/**
 * 영상 뉴스 카드 (task-007.md 7.7). 이번 Task에서는 실제 영상 재생을
 * 구현하지 않는다 — 재생 아이콘은 UI 표시 전용이며 카드 전체 링크를 통해
 * (다른 카드와 동일하게) 이동만 제공한다.
 */
export function VideoNewsCard({
  article,
  duration,
  titleLevel = "h3",
  priority = false,
  className,
}: VideoNewsCardProps) {
  const runtime = duration ?? article.duration;

  return (
    <article className={cn(newsCardContainerClassName, "h-full", className)}>
      <Card padding="none" interactive className="group flex h-full flex-col overflow-hidden">
        <NewsImage
          src={article.thumbnail.url}
          alt={article.thumbnail.alt}
          ratio="16:9"
          priority={priority}
          enableZoom
          overlay="subtle"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          overlayContent={
            <>
              <span
                role="img"
                aria-label="동영상 재생"
                className="absolute inset-0 z-content flex items-center justify-center"
              >
                <span className="flex size-12 items-center justify-center rounded-full bg-background/70 backdrop-blur-sm">
                  <Play size={22} className="ml-0.5 fill-text-primary text-text-primary" aria-hidden />
                </span>
              </span>
              {runtime && (
                <div className="absolute right-2 bottom-2 z-content">
                  <Badge tone="neutral" variant="solid" size="sm">
                    {runtime}
                  </Badge>
                </div>
              )}
            </>
          }
        />
        <div className="flex flex-1 flex-col gap-2 p-4">
          <div className="flex items-center gap-2">
            <CategoryBadge category={article.category} size="sm" className="w-fit" />
            <BookmarkButton
              articleId={article.id}
              slug={article.slug}
              size="sm"
              className="ml-auto"
            />
          </div>
          <NewsTitle level={titleLevel} size="md" lineClamp={2}>
            <NewsCardLink href={`/news/${article.slug}`}>{article.title}</NewsCardLink>
          </NewsTitle>
          <NewsCardMeta
            publishedAt={article.publishedAt}
            showCategory={false}
            className="mt-auto pt-1"
          />
        </div>
      </Card>
    </article>
  );
}
