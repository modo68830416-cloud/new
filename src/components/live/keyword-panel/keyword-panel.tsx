"use client";

import { useId } from "react";
import { Hash, RotateCw } from "lucide-react";
import { Surface } from "@/components/ui/surface";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { Button } from "@/components/ui/button";
import { TrendingIndicator } from "@/components/ui/trending-indicator";
import { TimeAgo } from "@/components/ui/time-ago";
import { cn } from "@/lib/utils";
import type { TrendingKeyword } from "@/types/news";
import type { KeywordPanelProps } from "./keyword-panel.types";

/** rank/previousRank 차이로 순위 변화 폭을 계산한다 (상승이면 양수) */
function computeDelta(keyword: Pick<TrendingKeyword, "rank" | "previousRank">): number | undefined {
  if (typeof keyword.previousRank !== "number") return undefined;
  return keyword.previousRank - keyword.rank;
}

/**
 * 실시간 검색어 패널 (task-008.md "Keyword Panel").
 *
 * 상승/하락/신규/순위 변화는 `TrendingIndicator`(TASK-003)를 재사용해
 * 아이콘 + 스크린 리더 텍스트로 표시한다 — 색상만으로 상태를 표현하지
 * 않는다.
 */
export function KeywordPanel({
  keywords,
  title = "실시간 검색어",
  updatedAt,
  limit = 10,
  isLoading = false,
  error = null,
  onRetry,
  className,
}: KeywordPanelProps) {
  const headingId = useId();
  const visible = keywords.slice(0, limit);

  return (
    <Surface
      as="section"
      radius="md"
      bordered
      className={cn("flex flex-col gap-4 p-5", className)}
      aria-labelledby={headingId}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id={headingId} className="type-card-title">
          {title}
        </h2>
        {updatedAt && (
          <p className="type-metadata flex items-center gap-1.5 text-text-muted">
            갱신
            <TimeAgo date={updatedAt} />
          </p>
        )}
      </div>

      {isLoading ? (
        <ul className="flex flex-col gap-3">
          {Array.from({ length: Math.min(limit, 6) }, (_, index) => (
            <li key={index} className="flex items-center gap-3">
              <Skeleton width={20} height={16} />
              <Skeleton height={16} className="flex-1" />
            </li>
          ))}
        </ul>
      ) : error ? (
        <ErrorState
          description={error}
          action={
            onRetry ? (
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<RotateCw size={14} aria-hidden />}
                onClick={onRetry}
              >
                다시 시도
              </Button>
            ) : undefined
          }
        />
      ) : visible.length === 0 ? (
        <EmptyState
          icon={<Hash size={28} />}
          title="실시간 검색어가 없습니다."
          description="잠시 후 다시 확인해 주세요."
        />
      ) : (
        <ol aria-live="polite" aria-atomic="false" className="flex flex-col gap-3">
          {visible.map((keyword) => {
            const delta = computeDelta(keyword);
            return (
              <li key={keyword.id} className="flex items-center gap-3">
                <span
                  className="type-data-number w-6 shrink-0 text-center text-text-secondary"
                  aria-hidden
                >
                  {keyword.rank}
                </span>
                <span className="sr-only">{keyword.rank}위</span>
                <span className="type-body flex-1 truncate text-text-primary">{keyword.keyword}</span>
                <TrendingIndicator change={keyword.change} delta={delta} />
              </li>
            );
          })}
        </ol>
      )}
    </Surface>
  );
}
