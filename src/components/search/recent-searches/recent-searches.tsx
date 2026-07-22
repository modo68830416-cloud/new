import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { SuggestionOptionRow } from "@/components/search/search-suggestions";
import type { SuggestionOption } from "@/data/mock-search";

export interface RecentSearchesProps {
  /** `useRecentSearches()`가 만든 옵션 목록 (id 규칙은 SearchBox가 부여) */
  options: SuggestionOption[];
  activeOptionId?: string;
  onSelect: (option: SuggestionOption) => void;
  onClearAll: () => void;
  className?: string;
}

/**
 * 최근 검색어 (TASK-010). 브라우저 로컬에 저장된 검색 기록을 콤보박스
 * 옵션으로 보여준다. "전체 삭제"는 리스트박스 바깥의 일반 버튼으로 두어
 * (옵션 안에 포커스 가능한 컨트롤을 중첩하지 않도록) ARIA 구조를 단순하게
 * 유지한다.
 */
export function RecentSearches({
  options,
  activeOptionId,
  onSelect,
  onClearAll,
  className,
}: RecentSearchesProps) {
  if (options.length === 0) return null;

  return (
    <div role="group" aria-label="최근 검색어" className={cn("flex flex-col", className)}>
      <div className="flex items-center justify-between px-3 pt-2 pb-1">
        <p className="type-caption text-text-muted">최근 검색어</p>
        <button
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={onClearAll}
          className="type-caption rounded-xs text-text-muted hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          전체 삭제
        </button>
      </div>
      {options.map((option) => (
        <SuggestionOptionRow
          key={option.id}
          option={option}
          isActive={option.id === activeOptionId}
          onSelect={onSelect}
          icon={<Clock size={14} aria-hidden />}
        />
      ))}
    </div>
  );
}
