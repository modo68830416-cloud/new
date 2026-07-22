import { NewsCardGrid } from "@/components/news";
import { cn } from "@/lib/utils";
import type { NewsArticle } from "@/types/news";

export interface RelatedNewsProps {
  articles: NewsArticle[];
  title?: string;
  className?: string;
}

/**
 * 관련 기사 섹션 (TASK-009) — 같은 카테고리 + 최신 기사를 mock으로 구성한다.
 * 카드 렌더링은 TASK-007의 `NewsCardGrid`/`StandardNewsCard`를 그대로
 * 재사용하고 새로 만들지 않는다.
 */
export function RelatedNews({ articles, title = "관련 기사", className }: RelatedNewsProps) {
  if (articles.length === 0) return null;

  const headingId = "related-news-title";

  return (
    <section aria-labelledby={headingId} className={cn("flex flex-col gap-4", className)}>
      <h2 id={headingId} className="type-section-title">
        {title}
      </h2>
      <NewsCardGrid articles={articles} columns={4} cardSize="small" />
    </section>
  );
}
