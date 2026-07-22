"use client";

import { useId } from "react";
import { SearchInput } from "@/components/ui/search-input";
import { RecentSearches } from "@/components/search/recent-searches";
import { PopularSearches } from "@/components/search/popular-searches";
import { SearchSuggestions } from "@/components/search/search-suggestions";
import { cn } from "@/lib/utils";
import { useSearchCombobox } from "./use-search-combobox";

export interface SearchBoxProps {
  id?: string;
  /** 초기 검색어 (예: `/search?q=...`에서 넘어온 값) */
  defaultValue?: string;
  autoFocus?: boolean;
  size?: "sm" | "md" | "lg";
  placeholder?: string;
  className?: string;
  containerClassName?: string;
  /** 검색 랜드마크/입력창의 접근 가능한 이름 */
  ariaLabel?: string;
  /** 지정하면 검색 실행 시 라우팅 대신 이 콜백만 호출한다 (예: /search 페이지 자체) */
  onSearch?: (query: string) => void;
}

/**
 * 검색 입력창 (TASK-010).
 *
 * - `role="search"` 랜드마크 + `role="combobox"` 입력 + `role="listbox"`
 *   드롭다운(ARIA 1.2 콤보박스 패턴, `aria-activedescendant`로 강조).
 * - ArrowUp/ArrowDown/Enter 키보드 탐색, Escape 닫기, Clear 버튼은
 *   `useSearchCombobox` 훅이 관리한다.
 * - debounce 구조를 준비해 두었지만 실제 검색 API 호출은 없다 — 자동완성은
 *   `@/data/mock-search`의 mock 데이터만 사용한다.
 * - 입력 자체는 TASK-003 `SearchInput`을 그대로 재사용한다(검색 아이콘,
 *   사이즈, Clear 버튼 렌더링은 그 컴포넌트가 이미 제공한다).
 */
export function SearchBox({
  id,
  defaultValue = "",
  autoFocus,
  size = "md",
  placeholder = "기사, 카테고리, 태그로 검색해 보세요",
  className,
  containerClassName,
  ariaLabel = "뉴스 검색",
  onSearch,
}: SearchBoxProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const listboxId = `${inputId}-listbox`;

  const {
    query,
    open,
    activeOption,
    showSuggestions,
    recentOptions,
    popularOptions,
    suggestionGroups,
    selectOption,
    handleChange,
    handleClear,
    handleFocus,
    handleKeyDown,
    handleBlur,
    clearRecent,
  } = useSearchCombobox({ initialValue: defaultValue, onSearch });

  const hasDropdownContent = showSuggestions
    ? suggestionGroups.length > 0
    : recentOptions.length > 0 || popularOptions.length > 0;

  return (
    <div role="search" aria-label={ariaLabel} className={cn("relative w-full", containerClassName)}>
      <SearchInput
        id={inputId}
        role="combobox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-autocomplete="list"
        aria-activedescendant={activeOption?.id}
        aria-label={ariaLabel}
        autoComplete="off"
        autoFocus={autoFocus}
        size={size}
        value={query}
        placeholder={placeholder}
        className={className}
        onChange={(event) => handleChange(event.target.value)}
        onClear={handleClear}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />

      {open && (
        <div
          id={listboxId}
          role="listbox"
          aria-label={ariaLabel}
          className={cn(
            "glass-strong absolute top-[calc(100%+0.5rem)] left-0 z-dropdown w-full overflow-y-auto rounded-md border border-border-default p-1 shadow-lg",
            "max-h-96",
          )}
        >
          {!hasDropdownContent && (
            <p className="type-caption px-3 py-6 text-center text-text-muted">
              {showSuggestions ? "일치하는 추천 결과가 없습니다." : "최근/인기 검색어가 없습니다."}
            </p>
          )}
          {showSuggestions ? (
            <SearchSuggestions
              groups={suggestionGroups}
              activeOptionId={activeOption?.id}
              onSelect={selectOption}
            />
          ) : (
            <>
              <RecentSearches
                options={recentOptions}
                activeOptionId={activeOption?.id}
                onSelect={selectOption}
                onClearAll={clearRecent}
              />
              <PopularSearches
                options={popularOptions}
                activeOptionId={activeOption?.id}
                onSelect={selectOption}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}
