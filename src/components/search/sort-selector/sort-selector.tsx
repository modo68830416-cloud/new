import { Select } from "@/components/ui/select";
import { SEARCH_SORT_OPTIONS, type SearchSortOption } from "@/data/mock-search";

export interface SortSelectorProps {
  value: SearchSortOption;
  onChange: (value: SearchSortOption) => void;
  size?: "sm" | "md" | "lg";
  className?: string;
  id?: string;
  /** 라벨을 표시하지 않고 aria-label로만 제공한다 (인라인 배치용) */
  hideLabel?: boolean;
}

/**
 * 정렬 선택 (TASK-010). 최신순 / 인기순 / 조회순 / 관련도(Mock) 4가지를
 * 지원하며, TASK-003 `Select`를 그대로 재사용한다.
 */
export function SortSelector({
  value,
  onChange,
  size = "sm",
  className,
  id,
  hideLabel = false,
}: SortSelectorProps) {
  return (
    <Select
      id={id}
      label={hideLabel ? undefined : "정렬"}
      aria-label="검색 결과 정렬"
      size={size}
      value={value}
      onChange={(event) => onChange(event.target.value as SearchSortOption)}
      options={SEARCH_SORT_OPTIONS.map((option) => ({ value: option.value, label: option.label }))}
      containerClassName={className}
    />
  );
}
