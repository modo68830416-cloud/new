/**
 * TASK-010 검색/필터/태그/아카이브 UI의 공용 타입 재노출.
 *
 * 실제 데이터 계약은 `@/data/mock-search`(mock 검색 엔진 대역)에 있다 —
 * `@/components/news/news.types.ts`가 `@/types/news`를 재노출하는 것과
 * 동일한 패턴이다.
 */
export type {
  SearchSortOption,
  SearchFilterState,
  SuggestionType,
  SuggestionOption,
  SuggestionGroup,
  TagSummary,
} from "@/data/mock-search";

export {
  SEARCH_SORT_OPTIONS,
  SEARCH_CONTENT_TYPES,
  DEFAULT_SEARCH_FILTERS,
  isSearchFilterActive,
} from "@/data/mock-search";
