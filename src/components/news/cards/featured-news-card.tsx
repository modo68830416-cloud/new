import { ArrowRight } from "lucide-react";
import { Surface } from "@/components/ui/surface";
import { CategoryBadge } from "@/components/ui/category-badge";
import { BreakingBadge } from "@/components/ui/breaking-badge";
import { LiveBadge } from "@/components/ui/live-badge";
import { LinkButton } from "@/components/ui/link-button";
import { BookmarkButton } from "@/components/personalization/bookmark-button";
import { NewsShareButton } from "../primitives/news-share-button";
import { NewsImage } from "../primitives/news-image";
import { NewsTitle } from "../primitives/news-title";
import { NewsSummary } from "../primitives/news-summary";
import { NewsCardMeta } from "../primitives/news-meta";
import { NewsCardLink, newsCardContainerClassName } from "../primitives/news-card-link";
import { cn } from "@/lib/utils";
import type { NewsCardBaseProps, NewsTitleLevel } from "../news.types";

export interface FeaturedNewsCardProps extends NewsCardBaseProps {
  /** 요약 노출 여부. 기본 true */
  showSummary?: boolean;
  /** 선택적 CTA 링크(예: 카테고리 더 보기). 없으면 CTA를 렌더링하지 않는다 */
  ctaHref?: string;
  ctaLabel?: string;
  titleLevel?: NewsTitleLevel;
}

/**
 * 카테고리 대표 기사 / 주요 기획 기사용 대형 카드 (task-007.md 7.1).
 *
 * 데스크톱에서는 이미지와 콘텐츠를 좌우로 분할하고, 모바일에서는 이미지가
 * 위, 텍스트가 아래에 오는 세로 흐름으로 전환된다.
 */
export function FeaturedNewsCard({
  article,
  showSummary = true,
  ctaHref,
  ctaLabel = "자세히 보기",
  titleLevel = "h3",
  priority = false,
  className,
}: FeaturedNewsCardProps) {
  return (
    <article className={cn(newsCardContainerClassName, "h-full", className)}>
      <Surface
        radius="lg"
        shadow="sm"
        className="group flex h-full flex-col overflow-hidden md:flex-row"
      >
        <NewsImage
          src={article.thumbnail.url}
          alt={article.thumbnail.alt}
          ratio="16:9"
          priority={priority}
          enableZoom
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="md:w-1/2"
        />
        <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <CategoryBadge category={article.category} />
            {article.isBreaking && <BreakingBadge level="urgent" />}
            {article.isLive && <LiveBadge />}
            {article.isExclusive && (
              <span className="type-label border-exclusive text-exclusive rounded-full border px-2.5 py-1">
                단독
              </span>
            )}
            <div className="ml-auto flex items-center gap-1">
              <NewsShareButton article={article} />
              <BookmarkButton articleId={article.id} slug={article.slug} size="sm" />
            </div>
          </div>

          <NewsTitle level={titleLevel} size="xl" lineClamp={3}>
            <NewsCardLink href={`/news/${article.slug}`}>{article.title}</NewsCardLink>
          </NewsTitle>

          {showSummary && article.summary && (
            <NewsSummary lineClamp={3} hideOnMobile className="max-w-2xl">
              {article.summary}
            </NewsSummary>
          )}

          <NewsCardMeta
            sourceName={article.source?.name}
            authorName={article.author?.name}
            publishedAt={article.publishedAt}
            viewCount={article.viewCount}
            className="mt-auto pt-1"
          />

          {ctaHref && (
            <div className="relative z-content pt-2">
              <LinkButton
                href={ctaHref}
                variant="secondary"
                size="sm"
                rightIcon={<ArrowRight size={14} aria-hidden />}
              >
                {ctaLabel}
              </LinkButton>
            </div>
          )}
        </div>
      </Surface>
    </article>
  );
}
