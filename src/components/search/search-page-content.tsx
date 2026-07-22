"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SearchBox } from "./search-box";
import { FilterPanel, FilterDrawer } from "./filter-panel";
import { SearchResults } from "./search-results";
import { DEFAULT_SEARCH_FILTERS, type SearchFilterState, type SearchSortOption } from "@/data/mock-search";
import type { NewsArticle } from "@/types/news";

export interface SearchPageContentProps {
  initialQuery?: string;
}

const SEARCH_DEBOUNCE_MS = 250;

function buildSearchParams(
  query: string,
  filters: SearchFilterState,
  sort: SearchSortOption,
): URLSearchParams {
  const params = new URLSearchParams();
  if (query.trim()) params.set("q", query.trim());
  if (filters.categorySlugs.length > 0) params.set("category", filters.categorySlugs.join(","));
  if (filters.contentTypes.length > 0) params.set("contentType", filters.contentTypes.join(","));
  if (filters.dateFrom) params.set("dateFrom", filters.dateFrom);
  if (filters.dateTo) params.set("dateTo", filters.dateTo);
  if (filters.breakingOnly) params.set("breaking", "true");
  if (filters.liveOnly) params.set("live", "true");
  if (sort !== "latest") params.set("sort", sort);
  return params;
}

/**
 * `/search` 페이지 본문 (TASK-010, TASK-013에서 서버 사이드 전환).
 *
 * 검색어/필터/정렬은 클라이언트 상태로 관리하지만, 실제 검색 실행은
 * `/api/search`를 호출한다(TASK-013) — `@/data/mock-search`의 순수 함수는
 * 더 이상 클라이언트에서 직접 호출하지 않는다. 입력마다 매번 요청하지
 * 않도록 짧게 debounce하고, 오래된 응답이 최신 응답을 덮어쓰지 않도록
 * `AbortController`로 이전 요청을 취소한다. 검색어 실행 시 주소창의 `?q=`를
 * 갱신해 결과를 공유할 수 있도록 하되, 페이지 자체는 다시 요청하지 않는다
 * (`router.replace`).
 */
export function SearchPageContent({ initialQuery = "" }: SearchPageContentProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [filters, setFilters] = useState<SearchFilterState>(DEFAULT_SEARCH_FILTERS);
  const [sort, setSort] = useState<SearchSortOption>("latest");

  const [results, setResults] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const timer = setTimeout(() => {
      setIsLoading(true);
      setError(null);

      const params = buildSearchParams(query, filters, sort);

      fetch(`/api/search?${params.toString()}`, { signal: controller.signal })
        .then(async (response) => {
          if (!response.ok) {
            const body = await response.json().catch(() => null);
            throw new Error(body?.error ?? "검색 결과를 불러오지 못했습니다.");
          }
          return response.json() as Promise<{ articles: NewsArticle[] }>;
        })
        .then((data) => {
          setResults(data.articles);
          setIsLoading(false);
        })
        .catch((requestError: unknown) => {
          if (controller.signal.aborted) return;
          setError(
            requestError instanceof Error
              ? requestError.message
              : "검색 결과를 불러오지 못했습니다.",
          );
          setIsLoading(false);
        });
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, filters, sort, retryKey]);

  function handleSearch(term: string) {
    setQuery(term);
    router.replace(`/search?q=${encodeURIComponent(term)}`, { scroll: false });
  }

  function handleReset() {
    setFilters(DEFAULT_SEARCH_FILTERS);
    setSort("latest");
  }

  function handleRetry() {
    setRetryKey((key) => key + 1);
  }

  const filterPanelProps = {
    filters,
    onFiltersChange: setFilters,
    sort,
    onSortChange: setSort,
    onReset: handleReset,
  };

  return (
    <div className="container-dashboard flex flex-col gap-8 py-8 lg:py-12">
      <div className="flex flex-col gap-3">
        <h1 className="type-page-title">뉴스 검색</h1>
        <SearchBox
          defaultValue={query}
          onSearch={handleSearch}
          size="lg"
          autoFocus
          className="max-w-2xl"
        />
      </div>

      <div className="flex justify-end lg:hidden">
        <FilterDrawer {...filterPanelProps} />
      </div>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <FilterPanel {...filterPanelProps} />
        <div className="min-w-0 flex-1">
          <SearchResults
            query={query}
            articles={results}
            isLoading={isLoading}
            error={error}
            onRetry={handleRetry}
          />
        </div>
      </div>
    </div>
  );
}
