"use client";

import { useEffect, useMemo, useState, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useRecentSearches } from "@/components/search/recent-searches";
import type { SuggestionGroup, SuggestionOption } from "@/data/mock-search";
import type { TrendingKeyword } from "@/types/news";

export interface UseSearchComboboxOptions {
  initialValue?: string;
  /** 지정하면 검색 실행 시 라우팅 대신 이 콜백만 호출한다 (예: /search 페이지 자체) */
  onSearch?: (query: string) => void;
}

function toPopularOption(keyword: TrendingKeyword): SuggestionOption {
  return {
    id: `option-popular-${keyword.id}`,
    type: "popular",
    label: keyword.keyword,
    href: `/search?q=${encodeURIComponent(keyword.keyword)}`,
    rank: keyword.rank,
    change: keyword.change,
  };
}

/**
 * SearchBox의 콤보박스 상태/키보드 탐색 로직 (TASK-010, TASK-015에서
 * 자동완성/인기 검색어를 서버 사이드로 전환).
 *
 * - 자동완성(기사/카테고리/태그/추천 검색어)은 `/api/search/suggestions`,
 *   인기 검색어는 기존 `/api/trending-keywords`(TASK-012)를 그대로
 *   재사용한다 — "인기 검색어"는 트렌딩 키워드와 같은 데이터이므로 별도
 *   엔드포인트를 새로 만들지 않는다.
 * - "최근 검색어"는 사용자 로컬(`localStorage`) 전용이라 서버로 옮기지
 *   않는다(`useRecentSearches`, TASK-010 그대로).
 * - 검색어가 비어 있으면 최근 검색어 + 인기 검색어를, 입력 중이면 자동완성
 *   그룹을 하나의 평탄화된 옵션 목록으로 합쳐 ArrowUp/ArrowDown/Enter
 *   키보드 탐색을 지원한다.
 */
export function useSearchCombobox({ initialValue = "", onSearch }: UseSearchComboboxOptions = {}) {
  const router = useRouter();
  const [query, setQuery] = useState(initialValue);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const { items: recentItems, addSearch, clearAll } = useRecentSearches();

  const [popularOptions, setPopularOptions] = useState<SuggestionOption[]>([]);
  const [suggestionGroups, setSuggestionGroups] = useState<SuggestionGroup[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

  const debouncedQuery = useDebouncedValue(query, 200);
  const trimmedQuery = query.trim();
  const showSuggestions = trimmedQuery.length > 0;

  // 인기 검색어는 검색어 입력과 무관하게 한 번만 조회한다.
  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/trending-keywords?limit=6", { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : Promise.reject(response)))
      .then((data: { keywords: TrendingKeyword[] }) => {
        setPopularOptions(data.keywords.map(toPopularOption));
      })
      .catch(() => {
        if (!controller.signal.aborted) setPopularOptions([]);
      });

    return () => controller.abort();
  }, []);

  // 자동완성은 debounce된 검색어가 바뀔 때마다 다시 조회한다. 검색어가
  // 비어 있으면 아무 것도 하지 않는다 — `showSuggestions`가 false가 되어
  // 어차피 `suggestionGroups`는 렌더링에 쓰이지 않는다.
  useEffect(() => {
    const trimmed = debouncedQuery.trim();
    if (!trimmed) return;

    const controller = new AbortController();

    // `setIsLoadingSuggestions(true)`를 effect 본문에서 곧바로 호출하지 않도록
    // (react-hooks/set-state-in-effect) 매크로태스크로 한 틱 미룬다 —
    // `debouncedQuery` 자체가 이미 실제 debounce를 담당하므로 지연은 없다.
    const timer = setTimeout(() => {
      setIsLoadingSuggestions(true);

      fetch(`/api/search/suggestions?q=${encodeURIComponent(trimmed)}`, {
        signal: controller.signal,
      })
        .then((response) => (response.ok ? response.json() : Promise.reject(response)))
        .then((data: { groups: SuggestionGroup[] }) => {
          setSuggestionGroups(data.groups);
          setIsLoadingSuggestions(false);
        })
        .catch(() => {
          if (controller.signal.aborted) return;
          setSuggestionGroups([]);
          setIsLoadingSuggestions(false);
        });
    }, 0);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [debouncedQuery]);

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
    isLoadingSuggestions,
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
