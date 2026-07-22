import { Fragment, type ReactNode } from "react";
import { Clock, MessageCircle } from "lucide-react";
import { CategoryBadge } from "@/components/ui/category-badge";
import { LiveBadge } from "@/components/ui/live-badge";
import { TimeAgo } from "@/components/ui/time-ago";
import { ViewCount } from "@/components/ui/view-count";
import { cn } from "@/lib/utils";
import type { NewsCardMetaProps } from "../news.types";

/**
 * 뉴스 카드 전용 메타데이터 행 (TASK-007 6.4).
 *
 * TASK-003의 `NewsMeta`(카테고리·작성자·시간·조회수)보다 넓은 필드 집합
 * (언론사, 수정 시각, 댓글 수, 영상 길이, Live 상태)을 지원해야 해서
 * 별도 컴포넌트로 두지만, 실제 표시 로직은 새로 만들지 않고 기존
 * `TimeAgo` / `ViewCount` / `LiveBadge` / `CategoryBadge`를 그대로
 * 조합한다. 전달된 필드만 표시하므로 카드마다 필요한 정보만 골라 넘긴다.
 */
export function NewsCardMeta({
  category,
  showCategory = true,
  sourceName,
  authorName,
  publishedAt,
  updatedAt,
  viewCount,
  commentCount,
  duration,
  isLive,
  className,
}: NewsCardMetaProps) {
  const items: { key: string; node: ReactNode }[] = [];

  if (showCategory && category) {
    items.push({
      key: "category",
      node: <CategoryBadge category={category} size="sm" />,
    });
  }
  if (isLive) {
    items.push({ key: "live", node: <LiveBadge /> });
  }
  if (sourceName) {
    items.push({
      key: "source",
      node: <span className="max-w-[10rem] truncate sm:max-w-[14rem]">{sourceName}</span>,
    });
  }
  if (authorName) {
    items.push({ key: "author", node: <span className="truncate">{authorName}</span> });
  }
  if (updatedAt) {
    items.push({
      key: "updated",
      node: (
        <span className="inline-flex items-center gap-1">
          수정 <TimeAgo date={updatedAt} />
        </span>
      ),
    });
  } else if (publishedAt) {
    items.push({ key: "published", node: <TimeAgo date={publishedAt} /> });
  }
  if (duration) {
    items.push({
      key: "duration",
      node: (
        <span className="inline-flex items-center gap-1">
          <Clock size={12} aria-hidden />
          {duration}
        </span>
      ),
    });
  }
  if (typeof viewCount === "number") {
    items.push({ key: "views", node: <ViewCount count={viewCount} /> });
  }
  if (typeof commentCount === "number") {
    items.push({
      key: "comments",
      node: (
        <span className="inline-flex items-center gap-1">
          <MessageCircle size={12} aria-hidden />
          <span className="sr-only">댓글</span>
          <span className="type-data-number">{commentCount.toLocaleString("ko-KR")}</span>
        </span>
      ),
    });
  }

  if (items.length === 0) return null;

  return (
    <div
      className={cn(
        "type-metadata flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1",
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
