import { Card } from "@/components/ui/card";
import { CategoryBadge } from "@/components/ui/category-badge";
import { TimeAgo } from "@/components/ui/time-ago";
import { NewsTitle } from "../primitives/news-title";
import { NewsSummary } from "../primitives/news-summary";
import { NewsSourceLine } from "../primitives/news-source";
import { NewsCardLink, newsCardContainerClassName } from "../primitives/news-card-link";
import { cn } from "@/lib/utils";
import type { NewsCardBaseProps, NewsTitleLevel } from "../news.types";

export interface OpinionNewsCardProps extends NewsCardBaseProps {
  /** 지정하지 않으면 `article.author.role`을 사용한다 */
  authorTitle?: string;
  showSummary?: boolean;
  titleLevel?: NewsTitleLevel;
}

/**
 * 칼럼/사설용 카드 (task-007.md 7.8). 일반 뉴스와는 시각적으로 구분하되
 * (필자 정보를 하단에 별도 행으로 분리) 과도한 인물 카드 스타일은
 * 피한다 — 아바타는 36px 이니셜 fallback 정도로 작게 유지한다.
 */
export function OpinionNewsCard({
  article,
  authorTitle,
  showSummary = true,
  titleLevel = "h3",
  className,
}: OpinionNewsCardProps) {
  return (
    <article className={cn(newsCardContainerClassName, "h-full", className)}>
      <Card padding="md" interactive className="group flex h-full flex-col gap-3">
        <CategoryBadge category={article.category} size="sm" className="w-fit" />

        <NewsTitle level={titleLevel} size="md" lineClamp={3}>
          <NewsCardLink href={`/news/${article.slug}`}>{article.title}</NewsCardLink>
        </NewsTitle>

        {showSummary && article.summary && (
          <NewsSummary lineClamp={2} hideOnMobile>
            {article.summary}
          </NewsSummary>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-border-subtle pt-3">
          <NewsSourceLine author={article.author} source={article.source} authorRole={authorTitle} />
          <TimeAgo date={article.publishedAt} className="shrink-0 text-text-muted" />
        </div>
      </Card>
    </article>
  );
}
