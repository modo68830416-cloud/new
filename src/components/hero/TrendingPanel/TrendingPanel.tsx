import { Fragment } from "react";
import { Flame } from "lucide-react";
import { Card } from "@/components/ui/card";
import { LiveBadge } from "@/components/ui/live-badge";
import { TrendingIndicator } from "@/components/ui/trending-indicator";
import { Stagger } from "@/components/motion/Stagger";
import { MOCK_TRENDING_KEYWORDS } from "@/data/mock-trending-keywords";
import { cn } from "@/lib/utils";
import type { TrendingPanelProps } from "./TrendingPanel.types";

/**
 * 실시간 인기 검색어 Top 10 패널(Trending Panel).
 *
 * 순위 · 상승/하락/신규 아이콘 · 순위 변화 폭 · Live 표시를 제공한다.
 * TASK-001 `mock-trending-keywords` 데이터를 사용하며, 항목은 Card
 * Stagger로 순차 등장한다.
 *
 * 이 컴포넌트가 미리보기 페이지 등에서 같은 페이지에 여러 번 렌더링될 수
 * 있으므로 heading에는 고정 id를 부여하지 않는다 (중복 id 방지). 랜드마크
 * 역할은 상위(`HeroSection`)의 `<section aria-label>`이 담당한다.
 */
export function TrendingPanel({ keywords, className }: TrendingPanelProps) {
  const items = (keywords ?? MOCK_TRENDING_KEYWORDS)
    .slice()
    .sort((a, b) => a.rank - b.rank)
    .slice(0, 10);

  return (
    <div className={cn("flex flex-col", className)}>
      <Card className="flex h-full flex-col">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="type-card-title flex items-center gap-2 text-text-primary">
            <Flame size={18} className="text-accent-primary" aria-hidden />
            실시간 인기 검색어
          </h2>
          <LiveBadge />
        </div>

        <Stagger
          className="flex flex-col divide-y divide-border-subtle"
          itemClassName="flex items-center justify-between gap-3 py-2.5 first:pt-0 last:pb-0"
        >
          {items.map((keyword) => {
            const delta =
              keyword.previousRank !== undefined
                ? Math.abs(keyword.previousRank - keyword.rank)
                : undefined;

            return (
              <Fragment key={keyword.id}>
                <div className="flex min-w-0 items-center gap-3">
                  <span className="type-data-number w-5 shrink-0 text-text-muted">
                    {keyword.rank}
                  </span>
                  <span className="type-body truncate text-text-primary">
                    {keyword.keyword}
                  </span>
                </div>
                <TrendingIndicator change={keyword.change} delta={delta} className="shrink-0" />
              </Fragment>
            );
          })}
        </Stagger>
      </Card>
    </div>
  );
}
