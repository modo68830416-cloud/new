/**
 * TASK-010 검색/필터/태그/아카이브 UI의 공개 API 모음.
 *
 * 소비하는 쪽(페이지)은 항상 이 배럴을 통해 import한다:
 * `import { SearchBox, SearchResults } from "@/components/search";`
 */

// 타입
export * from "./search.types";

// Search Box + 콤보박스
export { SearchBox, type SearchBoxProps } from "./search-box";
export { useSearchCombobox } from "./search-box";

// 자동완성 / 최근 검색어 / 인기 검색어
export { SearchSuggestions, type SearchSuggestionsProps } from "./search-suggestions";
export { RecentSearches, type RecentSearchesProps, useRecentSearches } from "./recent-searches";
export { PopularSearches, type PopularSearchesProps } from "./popular-searches";

// 검색 결과
export { SearchResults, type SearchResultsProps } from "./search-results";
export { HighlightText, type HighlightTextProps } from "./search-results";

// 필터 패널
export {
  FilterPanel,
  type FilterPanelProps,
  FilterDrawer,
  type FilterDrawerProps,
  FilterPanelContent,
  type FilterPanelContentProps,
} from "./filter-panel";

// 태그
export { TagFilter, type TagFilterProps } from "./tag-filter";

// 정렬
export { SortSelector, type SortSelectorProps } from "./sort-selector";

// 아카이브
export { ArchiveCalendar, type ArchiveCalendarProps } from "./archive-calendar";

// 상태
export {
  SearchEmptyState,
  type SearchEmptyStateProps,
  SearchErrorState,
  type SearchErrorStateProps,
  SearchLoadingState,
  type SearchLoadingStateProps,
} from "./search-states";

// 페이지 오케스트레이터
export { SearchPageContent, type SearchPageContentProps } from "./search-page-content";
