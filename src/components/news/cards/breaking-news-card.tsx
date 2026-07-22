import { MapPin, Tag } from "lucide-react";
import { Surface } from "@/components/ui/surface";
import { BreakingBadge } from "@/components/ui/breaking-badge";
import { LiveBadge } from "@/components/ui/live-badge";
import { Badge } from "@/components/ui/badge";
import { TimeAgo } from "@/components/ui/time-ago";
import { BookmarkButton } from "@/components/personalization/bookmark-button";
import { designSystemConfig } from "@/config/design-system";
import { NewsShareButton } from "../primitives/news-share-button";
import { NewsTitle } from "../primitives/news-title";
import { NewsCardLink, newsCardContainerClassName } from "../primitives/news-card-link";
import { cn } from "@/lib/utils";
import type { BreakingNewsLevel, NewsCardBaseProps, NewsTitleLevel } from "../news.types";

export interface BreakingNewsCardProps extends NewsCardBaseProps {
  level?: BreakingNewsLevel;
  /** 선택적 위치 라벨 (예: "서울 강남구") */
  locationLabel?: string;
  /** 선택적 주제 라벨 (예: "정전") */
  topicLabel?: string;
  titleLevel?: NewsTitleLevel;
}

/**
 * 일반 카드보다 긴급성을 강조하는 속보 카드 (task-007.md 7.5).
 *
 * 카드 전체를 빨간색으로 채우지 않고, 좌측 accent 테두리 + `BreakingBadge`
 * 로만 단계를 표시한다. critical 단계의 pulse는 `BreakingBadge`(TASK-003)가
 * 이미 제한적으로(box-shadow, reduced-motion 대응 포함) 처리하므로 이 카드가
 * 별도의 반복 애니메이션을 추가하지 않는다.
 */
export function BreakingNewsCard({
  article,
  level = "normal",
  locationLabel,
  topicLabel,
  titleLevel = "h3",
  className,
}: BreakingNewsCardProps) {
  const levelStyle =
    designSystemConfig.breakingLevelStyles.find((item) => item.level === level) ??
    designSystemConfig.breakingLevelStyles[0];
  const isUpdated = Boolean(article.updatedAt);
  const timestamp = article.updatedAt ?? article.publishedAt;

  return (
    <article className={cn(newsCardContainerClassName, className)}>
      <Surface
        radius="md"
        shadow="none"
        bordered
        className="flex flex-col gap-2.5 border-l-4 p-4"
        style={{ borderLeftColor: `var(${levelStyle.borderVar})` }}
      >
        <div className="flex flex-wrap items-center gap-2">
          <BreakingBadge level={level} />
          {article.isLive && <LiveBadge />}
          {locationLabel && (
            <Badge tone="neutral" variant="outline" size="sm" icon={<MapPin size={12} aria-hidden />}>
              {locationLabel}
            </Badge>
          )}
          {topicLabel && (
            <Badge tone="neutral" variant="soft" size="sm" icon={<Tag size={12} aria-hidden />}>
              {topicLabel}
            </Badge>
          )}
          <div className="ml-auto flex items-center gap-1">
            <NewsShareButton article={article} />
            <BookmarkButton articleId={article.id} slug={article.slug} size="sm" />
          </div>
        </div>

        <NewsTitle level={titleLevel} size="md" lineClamp={2}>
          <NewsCardLink href={`/news/${article.slug}`}>{article.title}</NewsCardLink>
        </NewsTitle>

        <p className="type-metadata flex items-center gap-1.5 text-text-muted">
          {isUpdated ? "업데이트" : "발생"}
          <TimeAgo date={timestamp} />
        </p>
      </Surface>
    </article>
  );
}
