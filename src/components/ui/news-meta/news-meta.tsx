import { forwardRef, Fragment, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CategoryBadge } from "@/components/ui/category-badge";
import { TimeAgo } from "@/components/ui/time-ago";
import { ViewCount } from "@/components/ui/view-count";
import type { NewsMetaProps } from "./news-meta.types";

/**
 * 뉴스 카드/상세 상단·하단에 반복되는 메타 정보 행
 * (카테고리 · 작성자 · 작성 시간 · 조회수).
 */
export const NewsMeta = forwardRef<HTMLDivElement, NewsMetaProps>(
  function NewsMeta(
    {
      category,
      publishedAt,
      authorName,
      viewCount,
      showCategory = true,
      className,
      ...props
    },
    ref,
  ) {
    const items: { key: string; node: ReactNode }[] = [];
    if (showCategory && category) {
      items.push({
        key: "category",
        node: <CategoryBadge category={category} size="sm" />,
      });
    }
    if (authorName) {
      items.push({ key: "author", node: <span>{authorName}</span> });
    }
    if (publishedAt) {
      items.push({ key: "time", node: <TimeAgo date={publishedAt} /> });
    }
    if (typeof viewCount === "number") {
      items.push({ key: "views", node: <ViewCount count={viewCount} /> });
    }

    return (
      <div
        ref={ref}
        className={cn(
          "type-metadata flex flex-wrap items-center gap-x-2 gap-y-1",
          className,
        )}
        {...props}
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
  },
);
