import { Fragment, type ReactNode } from "react";
import { TimeAgo } from "@/components/ui/time-ago";
import { ViewCount } from "@/components/ui/view-count";
import { cn } from "@/lib/utils";
import type { NewsArticle } from "@/types/news";

export interface ArticleMetaProps {
  article: NewsArticle;
  className?: string;
}

/**
 * 뉴스 상세 페이지 메타 정보 행 (TASK-009) — 작성자, 발행일, 수정일, 조회수.
 * 기존 `TimeAgo`/`ViewCount`(TASK-003)를 그대로 재사용한다.
 */
export function ArticleMeta({ article, className }: ArticleMetaProps) {
  const items: { key: string; node: ReactNode }[] = [];

  if (article.author) {
    items.push({
      key: "author",
      node: (
        <span className="font-semibold text-text-primary">
          {article.author.name}
          {article.author.role ? ` · ${article.author.role}` : ""}
        </span>
      ),
    });
  }
  if (article.source) {
    items.push({ key: "source", node: <span>{article.source.name}</span> });
  }
  items.push({
    key: "published",
    node: (
      <span>
        발행 <TimeAgo date={article.publishedAt} />
      </span>
    ),
  });
  if (article.updatedAt) {
    items.push({
      key: "updated",
      node: (
        <span>
          수정 <TimeAgo date={article.updatedAt} />
        </span>
      ),
    });
  }
  items.push({ key: "views", node: <ViewCount count={article.viewCount} /> });

  return (
    <div
      className={cn(
        "type-metadata flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-text-secondary",
        className,
      )}
    >
      {items.map((item, index) => (
        <Fragment key={item.key}>
          {index > 0 && (
            <span aria-hidden className="text-text-muted">
              ·
            </span>
          )}
          {item.node}
        </Fragment>
      ))}
    </div>
  );
}
