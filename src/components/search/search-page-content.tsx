"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { SearchBox } from "./search-box";
import { FilterPanel, FilterDrawer } from "./filter-panel";
import { SearchResults } from "./search-results";
import {
  DEFAULT_SEARCH_FILTERS,
  searchArticles,
  type SearchFilterState,
  type SearchSortOption,
} from "@/data/mock-search";

export interface SearchPageContentProps {
  initialQuery?: string;
}

/**
 * `/search` 페이지 본문 (TASK-010).
 *
 * 검색어/필터/정렬을 모두 클라이언트 상태로 관리하며, `@/data/mock-search`의
 * 순수 함수만으로 즉시 필터링한다(실제 검색 API 없음). 검색 실행 시
 * 주소창의 `?q=`를 갱신해 결과를 공유할 수 있도록 하되, 페이지 자체는
 * 다시 요청하지 않는다(`router.replace`).
 */
export function SearchPageContent({ initialQuery = "" }: SearchPageContentProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [filters, setFilters] = useState<SearchFilterState>(DEFAULT_SEARCH_FILTERS);
  const [sort, setSort] = useState<SearchSortOption>("latest");

  const results = useMemo(
    () => searchArticles(query, filters, sort),
    [query, filters, sort],
  );

  function handleSearch(term: string) {
    setQuery(term);
    router.replace(`/search?q=${encodeURIComponent(term)}`, { scroll: false });
  }

  function handleReset() {
    setFilters(DEFAULT_SEARCH_FILTERS);
    setSort("latest");
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
          <SearchResults query={query} articles={results} />
        </div>
      </div>
    </div>
  );
}
