import { Camera } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BookmarkButton } from "@/components/personalization/bookmark-button";
import { NewsImage } from "../primitives/news-image";
import { NewsTitle } from "../primitives/news-title";
import { NewsCardLink, newsCardContainerClassName } from "../primitives/news-card-link";
import { cn } from "@/lib/utils";
import type { NewsCardBaseProps, NewsImageRatio, NewsTitleLevel } from "../news.types";

export interface PhotoNewsCardProps extends NewsCardBaseProps {
  ratio?: NewsImageRatio;
  titleLevel?: NewsTitleLevel;
}

/**
 * 사진이 핵심인 기사용 카드 (task-007.md 7.6). 이미지 위 텍스트 대비를
 * 확보하기 위해 `overlay="strong"`(어두운 그라데이션)을 항상 사용한다.
 */
export function PhotoNewsCard({
  article,
  ratio = "4:3",
  titleLevel = "h3",
  priority = false,
  className,
}: PhotoNewsCardProps) {
  return (
    <article className={cn(newsCardContainerClassName, "h-full", className)}>
      <div className="group h-full overflow-hidden rounded-lg border border-border-default">
        <NewsImage
          src={article.thumbnail.url}
          alt={article.thumbnail.alt}
          ratio={ratio}
          priority={priority}
          enableZoom
          overlay="strong"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="h-full rounded-[inherit]"
          overlayContent={
            <>
              <div className="absolute top-3 left-3 z-content">
                <Badge tone="neutral" variant="solid" size="sm" icon={<Camera size={12} aria-hidden />}>
                  사진
                </Badge>
              </div>
              <BookmarkButton
                articleId={article.id}
                slug={article.slug}
                size="sm"
                className="absolute top-3 right-3"
              />
              <div className="absolute inset-x-0 bottom-0 z-content flex flex-col gap-1 p-4">
                <span className="type-metadata text-text-secondary">
                  {article.category.name}
                  {article.source?.name ? ` · ${article.source.name}` : ""}
                </span>
                <NewsTitle level={titleLevel} size="md" lineClamp={2}>
                  <NewsCardLink href={`/news/${article.slug}`}>{article.title}</NewsCardLink>
                </NewsTitle>
              </div>
            </>
          }
        />
      </div>
    </article>
  );
}
