"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { SortSelector } from "@/components/search/sort-selector";
import { VISIBLE_CATEGORIES } from "@/constants/categories";
import {
  SEARCH_CONTENT_TYPES,
  type SearchFilterState,
  type SearchSortOption,
} from "@/data/mock-search";
import type { NewsContentType } from "@/types/news";
import { cn } from "@/lib/utils";

export interface FilterPanelContentProps {
  filters: SearchFilterState;
  onFiltersChange: (next: SearchFilterState) => void;
  sort: SearchSortOption;
  onSortChange: (sort: SearchSortOption) => void;
  onReset: () => void;
  className?: string;
}

function toggleValue<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

/**
 * Filter Panel의 실제 필드 UI (TASK-010) — 카테고리 / 콘텐츠 유형 / 날짜 /
 * 정렬 / 속보만 / Live만. 데스크톱 사이드바(`FilterPanel`)와 모바일
 * 드로어(`FilterDrawer`)가 이 컴포넌트를 그대로 공유한다.
 */
export function FilterPanelContent({
  filters,
  onFiltersChange,
  sort,
  onSortChange,
  onReset,
  className,
}: FilterPanelContentProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div>
        <SortSelector value={sort} onChange={onSortChange} />
      </div>

      <Divider />

      <fieldset className="flex flex-col gap-3">
        <legend className="type-caption mb-1 text-text-secondary">카테고리</legend>
        <div className="flex flex-col gap-2">
          {VISIBLE_CATEGORIES.map((category) => (
            <Checkbox
              key={category.slug}
              label={category.name}
              checked={filters.categorySlugs.includes(category.slug)}
              onChange={() =>
                onFiltersChange({
                  ...filters,
                  categorySlugs: toggleValue(filters.categorySlugs, category.slug),
                })
              }
            />
          ))}
        </div>
      </fieldset>

      <Divider />

      <fieldset className="flex flex-col gap-3">
        <legend className="type-caption mb-1 text-text-secondary">콘텐츠 유형</legend>
        <div className="flex flex-col gap-2">
          {SEARCH_CONTENT_TYPES.map((type) => (
            <Checkbox
              key={type.value}
              label={type.label}
              checked={filters.contentTypes.includes(type.value)}
              onChange={() =>
                onFiltersChange({
                  ...filters,
                  contentTypes: toggleValue<NewsContentType>(filters.contentTypes, type.value),
                })
              }
            />
          ))}
        </div>
      </fieldset>

      <Divider />

      <fieldset className="flex flex-col gap-3">
        <legend className="type-caption mb-1 text-text-secondary">날짜 범위</legend>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="date"
            label="시작일"
            size="sm"
            value={filters.dateFrom ?? ""}
            onChange={(event) =>
              onFiltersChange({ ...filters, dateFrom: event.target.value || undefined })
            }
          />
          <Input
            type="date"
            label="종료일"
            size="sm"
            value={filters.dateTo ?? ""}
            onChange={(event) =>
              onFiltersChange({ ...filters, dateTo: event.target.value || undefined })
            }
          />
        </div>
      </fieldset>

      <Divider />

      <div className="flex flex-col gap-3">
        <Switch
          label="속보만 보기"
          checked={filters.breakingOnly}
          onCheckedChange={(checked) => onFiltersChange({ ...filters, breakingOnly: checked })}
        />
        <Switch
          label="Live만 보기"
          checked={filters.liveOnly}
          onCheckedChange={(checked) => onFiltersChange({ ...filters, liveOnly: checked })}
        />
      </div>

      <Button variant="ghost" size="sm" onClick={onReset} className="self-start">
        필터 초기화
      </Button>
    </div>
  );
}
