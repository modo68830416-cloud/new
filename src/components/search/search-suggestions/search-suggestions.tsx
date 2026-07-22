import { FileText, Folder, Hash, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { SuggestionOptionRow } from "./option-row";
import type { SuggestionGroup, SuggestionOption } from "@/data/mock-search";

const GROUP_ICON: Record<SuggestionGroup["type"], typeof FileText> = {
  article: FileText,
  category: Folder,
  tag: Hash,
  keyword: TrendingUp,
  recent: TrendingUp,
  popular: TrendingUp,
};

export interface SearchSuggestionsProps {
  /** 검색어 입력 중 표시되는 기사/카테고리/태그/추천 검색어 그룹 */
  groups: SuggestionGroup[];
  activeOptionId?: string;
  onSelect: (option: SuggestionOption) => void;
  className?: string;
}

/**
 * 자동완성 결과 그룹 (TASK-010, Mock 데이터 기반).
 * 기사 / 카테고리 / 태그 / 추천 검색어 4개 그룹을 표시하고, ArrowUp/ArrowDown
 * /Enter 키보드 탐색은 상위 `SearchBox`(콤보박스)가 관리한다 — 이 컴포넌트는
 * 순수 표시 + 클릭 선택만 담당한다.
 */
export function SearchSuggestions({
  groups,
  activeOptionId,
  onSelect,
  className,
}: SearchSuggestionsProps) {
  if (groups.length === 0) {
    return (
      <p className="type-caption px-3 py-4 text-center text-text-muted">
        일치하는 추천 결과가 없습니다.
      </p>
    );
  }

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {groups.map((group) => {
        const Icon = GROUP_ICON[group.type];
        return (
          <div key={group.type} role="group" aria-label={group.title} className="flex flex-col">
            <p className="type-caption px-3 pt-2 pb-1 text-text-muted">{group.title}</p>
            {group.options.map((option) => (
              <SuggestionOptionRow
                key={option.id}
                option={option}
                isActive={option.id === activeOptionId}
                onSelect={onSelect}
                icon={<Icon size={14} aria-hidden />}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}
