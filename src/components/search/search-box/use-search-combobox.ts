"use client";

import { useMemo, useState, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useRecentSearches } from "@/components/search/recent-searches";
import {
  getAutocompleteSuggestions,
  getPopularSearchKeywords,
  type SuggestionGroup,
  type SuggestionOption,
} from "@/data/mock-search";

export interface UseSearchComboboxOptions {
  initialValue?: string;
  /** 지정하면 검색 실행 시 라우팅 대신 이 콜백만 호출한다 (예: /search 페이지 자체) */
  onSearch?: (query: string) => void;
}

/**
 * SearchBox의 콤보박스 상태/키보드 탐색 로직 (TASK-010).
 *
 * - 검색어 debounce 구조를 준비한다(`useDebouncedValue`) — 실제 API 호출은
 *   없지만, mock 자동완성 계산에 그대로 적용해 추후 API 연동 시 구조를
 *   재사용할 수 있다.
 * - 검색어가 비어 있으면 최근 검색어 + 인기 검색어를, 입력 중이면 자동완성
 *   그룹(기사/카테고리/태그/추천 검색어)을 하나의 평탄화된 옵션 목록으로
 *   합쳐 ArrowUp/ArrowDown/Enter 키보드 탐색을 지원한다.
 */
export function useSearchCombobox({ initialValue = "", onSearch }: UseSearchComboboxOptions = {}) {
  const router = useRouter();
  const [query, setQuery] = useState(initialValue);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const { items: recentItems, addSearch, clearAll } = useRecentSearches();

  const debouncedQuery = useDebouncedValue(query, 200);
  const trimmedQuery = query.trim();

  const recentOptions: SuggestionOption[] = useMemo(
    () =>
      recentItems.map((term) => ({
        id: `option-recent-${encodeURIComponent(term)}`,
        type: "recent" as const,
        label: term,
        href: `/search?q=${encodeURIComponent(term)}`,
      })),
    [recentItems],
  );

  const popularOptions: SuggestionOption[] = useMemo(
    () =>
      getPopularSearchKeywords(6).map((keyword) => ({
        id: `option-popular-${keyword.id}`,
        type: "popular" as const,
        label: keyword.keyword,
        href: `/search?q=${encodeURIComponent(keyword.keyword)}`,
        rank: keyword.rank,
        change: keyword.change,
      })),
    [],
  );

  const suggestionGroups: SuggestionGroup[] = useMemo(
    () => getAutocompleteSuggestions(debouncedQuery),
    [debouncedQuery],
  );

  const showSuggestions = trimmedQuery.length > 0;

  const flattenedOptions: SuggestionOption[] = useMemo(() => {
    if (showSuggestions) return suggestionGroups.flatMap((group) => group.options);
    return [...recentOptions, ...popularOptions];
  }, [showSuggestions, suggestionGroups, recentOptions, popularOptions]);

  const activeOption = activeIndex >= 0 ? flattenedOptions[activeIndex] : undefined;

  function openDropdown() {
    setOpen(true);
  }

  function closeDropdown() {
    setOpen(false);
    setActiveIndex(-1);
  }

  function runSearch(term: string) {
    const trimmed = term.trim();
    if (!trimmed) return;
    addSearch(trimmed);
    setQuery(trimmed);
    closeDropdown();
    if (onSearch) {
      onSearch(trimmed);
    } else {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  }

  function selectOption(option: SuggestionOption) {
    if (option.type === "article" || option.type === "category" || option.type === "tag") {
      addSearch(trimmedQuery || option.label);
      closeDropdown();
      router.push(option.href);
      return;
    }
    runSearch(option.label);
  }

  function handleChange(value: string) {
    setQuery(value);
    setActiveIndex(-1);
    setOpen(true);
  }

  function handleClear() {
    setQuery("");
    setActiveIndex(-1);
    setOpen(true);
  }

  function handleFocus() {
    setOpen(true);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    switch (event.key) {
      case "ArrowDown": {
        event.preventDefault();
        if (!open) {
          openDropdown();
          return;
        }
        setActiveIndex((prev) => Math.min(prev + 1, flattenedOptions.length - 1));
        return;
      }
      case "ArrowUp": {
        event.preventDefault();
        if (!open) return;
        setActiveIndex((prev) => Math.max(prev - 1, -1));
        return;
      }
      case "Enter": {
        event.preventDefault();
        if (open && activeOption) {
          selectOption(activeOption);
        } else {
          runSearch(query);
        }
        return;
      }
      case "Escape": {
        if (open) {
          event.preventDefault();
          closeDropdown();
        }
        return;
      }
      case "Tab": {
        closeDropdown();
        return;
      }
      default:
        return;
    }
  }

  function handleBlur() {
    // 옵션/버튼 클릭은 onMouseDown에서 preventDefault로 처리되어 blur 전에
    // 선택이 먼저 반영되므로, 여기서는 그 외의 포커스 이탈만 닫는다.
    closeDropdown();
  }

  return {
    query,
    open,
    activeOption,
    activeIndex,
    recentOptions,
    popularOptions,
    suggestionGroups,
    showSuggestions,
    flattenedOptions,
    clearRecent: clearAll,
    selectOption,
    runSearch,
    handleChange,
    handleClear,
    handleFocus,
    handleKeyDown,
    handleBlur,
    openDropdown,
    closeDropdown,
  };
}

export type UseSearchComboboxResult = ReturnType<typeof useSearchCombobox>;
