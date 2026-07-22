import { LiveBadge } from "@/components/ui/live-badge";
import { TimeAgo } from "@/components/ui/time-ago";
import { Stagger } from "@/components/motion/Stagger";
import {
  BreakingNewsCard,
  NewsEmptyState,
  NewsErrorState,
  NewsListSkeleton,
} from "@/components/news";
import { cn } from "@/lib/utils";
import type { BreakingCenterItem, BreakingCenterProps } from "./breaking-center.types";

function itemTimestamp(item: BreakingCenterItem): number {
  const raw = item.article.updatedAt ?? item.article.publishedAt;
  const parsed = new Date(raw).getTime();
  return Number.isNaN(parsed) ? 0 : parsed;
}

/**
 * 실시간 속보 센터 (task-008.md "Breaking Center").
 *
 * 카드 렌더링은 TASK-007의 `BreakingNewsCard`를 그대로 재사용한다 — 이
 * 컴포넌트는 최신순 정렬, 헤더(Live Badge + 업데이트 시각), 로딩/빈/오류
 * 상태 처리만 담당한다. 중요도 색상 구분은 `BreakingNewsCard` 내부의
 * `BreakingBadge`(TASK-003, 아이콘 + 라벨 조합)가 이미 처리한다.
 */
export function BreakingCenter({
  items,
  title = "실시간 속보 센터",
  lastUpdatedAt,
  limit,
  isLoading = false,
  error = null,
  onRetry,
  className,
}: BreakingCenterProps) {
  const headingId = "breaking-center-title";

  const sorted = [...items].sort((a, b) => itemTimestamp(b) - itemTimestamp(a));
  const visible = typeof limit === "number" ? sorted.slice(0, limit) : sorted;
  const latestTimestamp =
    lastUpdatedAt ?? sorted[0]?.article.updatedAt ?? sorted[0]?.article.publishedAt;

  return (
    <section className={cn("flex flex-col gap-4", className)} aria-labelledby={headingId}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <LiveBadge />
          <h2 id={headingId} className="type-card-title">
            {title}
          </h2>
        </div>
        {latestTimestamp && (
          <p className="type-metadata flex items-center gap-1.5 text-text-muted">
            업데이트
            <TimeAgo date={latestTimestamp} />
          </p>
        )}
      </div>

      {isLoading ? (
        <NewsListSkeleton variant="horizontal" count={4} />
      ) : error ? (
        <NewsErrorState description={error} onRetry={onRetry} />
      ) : visible.length === 0 ? (
        <NewsEmptyState
          title="현재 진행 중인 속보가 없습니다."
          description="새로운 속보가 발생하면 이곳에 실시간으로 표시됩니다."
        />
      ) : (
        <div aria-live="polite" aria-atomic="false">
          <Stagger className="flex flex-col gap-3">
            {visible.map((item) => (
              <BreakingNewsCard
                key={item.article.id}
                article={item.article}
                level={item.level}
                locationLabel={item.locationLabel}
                topicLabel={item.topicLabel}
              />
            ))}
          </Stagger>
        </div>
      )}
    </section>
  );
}
