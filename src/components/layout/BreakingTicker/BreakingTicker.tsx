"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { Radio } from "lucide-react";
import { MOCK_BREAKING_NEWS } from "@/data/mock-breaking-news";
import { MOCK_NEWS } from "@/data/mock-news";
import { BreakingBadge } from "@/components/ui/breaking-badge";
import { LiveBadge } from "@/components/ui/live-badge";
import { TimeAgo } from "@/components/ui/time-ago";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import type { BreakingNewsItem } from "@/types/news";

/**
 * 티커 항목이 실제로 이동할 곳을 찾는다.
 *
 * 네이버 연동 항목은 `externalUrl`(원문 링크)을 그대로 쓰고, mock 항목은
 * `articleId`로 자체 상세 페이지(`/news/[slug]`)를 찾는다. 둘 다 없는
 * 레거시 mock 항목(가상의 속보)은 이동할 곳이 없어 클릭 불가능하게 둔다.
 */
function resolveTickerHref(item: BreakingNewsItem): string | undefined {
  if (item.externalUrl) return item.externalUrl;
  if (item.articleId) {
    const article = MOCK_NEWS.find((candidate) => candidate.id === item.articleId);
    if (article) return `/news/${article.slug}`;
  }
  return undefined;
}

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
      {items.map((item, index) => {
        const href = resolveTickerHref(item);
        const isExternal = href?.startsWith("http") ?? false;
        const itemClassName = cn(
          "type-breaking-ticker flex max-w-[60vw] items-center gap-2 px-4 py-2.5 text-left text-text-primary sm:max-w-sm",
          "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
          href && "hover:text-accent-primary focus-visible:text-accent-primary",
          !href && "cursor-default",
        );

        return (
          <li key={`${item.id}-${ariaHidden ? "dup" : "src"}-${index}`} className="flex shrink-0 items-center">
            {href ? (
              <Link
                href={href}
                tabIndex={ariaHidden ? -1 : 0}
                title={item.title}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className={itemClassName}
              >
                <BreakingBadge level={item.level} iconOnly />
                <span className="truncate">{item.title}</span>
                <TimeAgo date={item.timestamp} className="hidden shrink-0 text-text-muted sm:inline" />
              </Link>
            ) : (
              <span tabIndex={ariaHidden ? -1 : 0} title={item.title} className={itemClassName}>
                <BreakingBadge level={item.level} iconOnly />
                <span className="truncate">{item.title}</span>
                <TimeAgo date={item.timestamp} className="hidden shrink-0 text-text-muted sm:inline" />
              </span>
            )}
            <span aria-hidden className="mx-1 h-1 w-1 shrink-0 rounded-full bg-border-strong" />
          </li>
        );
      })}
    </ul>
  );
}
