"use client";

import { useId, useState, type KeyboardEvent } from "react";
import { Surface } from "@/components/ui/surface";
import { RankedNewsList } from "@/components/news";
import { cn } from "@/lib/utils";
import type { TrendingHubProps, TrendingHubTabId } from "./trending-hub.types";

/**
 * 트렌드 허브 (task-008.md "Trending Hub") — 인기 Top10 / 많이 본 기사 /
 * 많이 공유된 기사(UI만) / 급상승 기사를 탭으로 전환한다.
 *
 * 카드/리스트 렌더링은 TASK-007의 `RankedNewsList`를 그대로 재사용한다 —
 * 이 컴포넌트는 `role="tablist"` 탭 전환 UI와 키보드 탐색(←/→/Home/End)만
 * 담당한다.
 */
export function TrendingHub({
  tabs,
  title = "트렌드 허브",
  defaultTabId,
  isLoading = false,
  error = null,
  onRetry,
  className,
}: TrendingHubProps) {
  const headingId = useId();
  const [activeTabId, setActiveTabId] = useState<TrendingHubTabId | undefined>(
    defaultTabId ?? tabs[0]?.id,
  );

  const activeIndex = Math.max(
    tabs.findIndex((tab) => tab.id === activeTabId),
    0,
  );
  const activeTab = tabs[activeIndex];

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (tabs.length === 0) return;
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight") nextIndex = (activeIndex + 1) % tabs.length;
    else if (event.key === "ArrowLeft") nextIndex = (activeIndex - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = tabs.length - 1;

    if (nextIndex !== null) {
      event.preventDefault();
      const nextTab = tabs[nextIndex];
      setActiveTabId(nextTab.id);
      document.getElementById(`trending-hub-tab-${nextTab.id}`)?.focus();
    }
  };

  return (
    <Surface
      as="section"
      radius="md"
      bordered
      className={cn("flex flex-col gap-4 p-5", className)}
      aria-labelledby={headingId}
    >
      <h2 id={headingId} className="type-card-title">
        {title}
      </h2>

      <div
        role="tablist"
        aria-label={title}
        className="flex flex-wrap gap-1.5"
        onKeyDown={handleKeyDown}
      >
        {tabs.map((tab) => {
          const selected = tab.id === activeTab?.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`trending-hub-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`trending-hub-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveTabId(tab.id)}
              className={cn(
                "touch-target rounded-full px-3.5 py-1.5 type-label transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
                selected
                  ? "bg-accent-primary text-text-inverse"
                  : "bg-surface-elevated text-text-secondary hover:bg-surface-overlay",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab && (
        <div
          role="tabpanel"
          id={`trending-hub-panel-${activeTab.id}`}
          aria-labelledby={`trending-hub-tab-${activeTab.id}`}
          tabIndex={0}
        >
          <RankedNewsList
            items={activeTab.items}
            limit={10}
            isLoading={isLoading}
            error={error}
            onRetry={onRetry}
          />
        </div>
      )}
    </Surface>
  );
}
