"use client";

import { useState, type CSSProperties } from "react";
import { Radio } from "lucide-react";
import { MOCK_BREAKING_NEWS } from "@/data/mock-breaking-news";
import { BreakingBadge } from "@/components/ui/breaking-badge";
import { LiveBadge } from "@/components/ui/live-badge";
import { TimeAgo } from "@/components/ui/time-ago";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import type { BreakingNewsItem } from "@/types/news";

export interface BreakingTickerProps {
  items?: BreakingNewsItem[];
  className?: string;
}

const SECONDS_PER_ITEM = 6;
const MIN_DURATION_SECONDS = 22;

/**
 * 헤더 아래에 위치하는 속보 티커.
 *
 * - Auto Scroll(무한 가로 스크롤) + Hover/Keyboard Focus 시 일시정지
 * - 긴 제목은 말줄임(truncate) 처리
 * - Live/Breaking(단계별) 배지 사용
 * - TASK-001 `mock-breaking-news` 데이터를 사용한다 (실제 API 없음)
 *
 * 스크린 리더 사용자는 중복 렌더링된 두 번째 사본을 만나지 않도록
 * `aria-hidden` + `tabIndex={-1}` 처리한다.
 */
export function BreakingTicker({ items, className }: BreakingTickerProps) {
  const [paused, setPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const activeItems = items ?? MOCK_BREAKING_NEWS.filter((item) => item.isActive);

  if (activeItems.length === 0) {
    return null;
  }

  const durationSeconds = Math.max(
    activeItems.length * SECONDS_PER_ITEM,
    MIN_DURATION_SECONDS,
  );
  const isAnimating = !prefersReducedMotion && !paused;

  return (
    <section
      aria-label="속보 뉴스"
      className={cn(
        "relative z-sticky flex items-stretch border-b border-border-subtle bg-background-secondary",
        className,
      )}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="flex shrink-0 items-center gap-2 border-r border-border-subtle bg-breaking/10 px-3 py-2.5 sm:px-4">
        <LiveBadge />
        <span className="type-label hidden items-center gap-1 text-breaking sm:inline-flex">
          <Radio size={12} aria-hidden />
          속보
        </span>
      </div>

      <div className="relative flex-1 overflow-hidden">
        <div
          className={cn("flex w-max items-center", isAnimating && "animate-ticker-scroll")}
          style={
            {
              "--ticker-duration": `${durationSeconds}s`,
              animationPlayState: isAnimating ? "running" : "paused",
            } as CSSProperties
          }
        >
          <TickerTrack items={activeItems} />
          <TickerTrack items={activeItems} ariaHidden />
        </div>
      </div>
    </section>
  );
}

function TickerTrack({
  items,
  ariaHidden = false,
}: {
  items: BreakingNewsItem[];
  ariaHidden?: boolean;
}) {
  return (
    <ul className="flex items-center" aria-hidden={ariaHidden || undefined}>
      {items.map((item, index) => (
        <li key={`${item.id}-${ariaHidden ? "dup" : "src"}-${index}`} className="flex shrink-0 items-center">
          <button
            type="button"
            tabIndex={ariaHidden ? -1 : 0}
            title={item.title}
            className={cn(
              "type-breaking-ticker flex max-w-[60vw] items-center gap-2 px-4 py-2.5 text-left text-text-primary sm:max-w-sm",
              "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
              "hover:text-accent-primary focus-visible:text-accent-primary",
            )}
          >
            <BreakingBadge level={item.level} iconOnly />
            <span className="truncate">{item.title}</span>
            <TimeAgo date={item.timestamp} className="hidden shrink-0 text-text-muted sm:inline" />
          </button>
          <span aria-hidden className="mx-1 h-1 w-1 shrink-0 rounded-full bg-border-strong" />
        </li>
      ))}
    </ul>
  );
}
