import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { TrendingIndicator } from "@/components/ui/trending-indicator";
import { SuggestionOptionRow } from "@/components/search/search-suggestions";
import type { SuggestionOption } from "@/data/mock-search";

export interface PopularSearchesProps {
  /** `getPopularSearchKeywords()` 기반 옵션 목록 (rank/change 포함) */
  options: SuggestionOption[];
  activeOptionId?: string;
  onSelect: (option: SuggestionOption) => void;
  className?: string;
}

/**
 * 인기 검색어 (TASK-010, Mock 트렌딩 키워드 기반).
 * 검색어 미입력 상태에서 최근 검색어와 함께 노출되는 콤보박스 옵션이다.
 */
export function PopularSearches({
  options,
  activeOptionId,
  onSelect,
  className,
}: PopularSearchesProps) {
  if (options.length === 0) return null;

  return (
    <div role="group" aria-label="인기 검색어" className={cn("flex flex-col", className)}>
      <p className="type-caption px-3 pt-2 pb-1 text-text-muted">인기 검색어</p>
      {options.map((option) => (
        <SuggestionOptionRow
          key={option.id}
          option={option}
          isActive={option.id === activeOptionId}
          onSelect={onSelect}
          icon={
            typeof option.rank === "number" ? (
              <span className="type-data-number w-4 shrink-0 text-center text-accent-primary">
                {option.rank}
              </span>
            ) : (
              <Flame size={14} aria-hidden />
            )
          }
          trailing={option.change && <TrendingIndicator change={option.change} />}
        />
      ))}
    </div>
  );
}
