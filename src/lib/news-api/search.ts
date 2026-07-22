import { cache } from "react";
import { DEFAULT_SEARCH_FILTERS, searchArticles, type SearchFilterState, type SearchSortOption } from "@/data/mock-search";
import { simulateNetwork } from "./simulate";
import type { NewsArticle } from "@/types/news";

/**
 * TASK-013 — `SearchPageContent`가 클라이언트에서 직접 호출하던
 * `searchArticles`(순수 함수)를 비동기 서비스 계층으로 옮긴다. `/api/search`
 * Route Handler가 이 함수를 재사용한다.
 */
export const fetchSearchResults = cache(async function fetchSearchResults(
  query: string,
  filters: SearchFilterState = DEFAULT_SEARCH_FILTERS,
  sort: SearchSortOption = "latest",
): Promise<NewsArticle[]> {
  await simulateNetwork();
  return searchArticles(query, filters, sort);
});
