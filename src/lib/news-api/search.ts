import { cache } from "react";
import {
  DEFAULT_SEARCH_FILTERS,
  isSearchFilterActive,
  searchArticles,
  type SearchFilterState,
  type SearchSortOption,
} from "@/data/mock-search";
import { simulateNetwork } from "./simulate";
import { fetchNaverSearchResults, isNaverNewsConfigured } from "./naver";
import type { NewsArticle } from "@/types/news";

/**
 * TASK-013 — `SearchPageContent`가 클라이언트에서 직접 호출하던
 * `searchArticles`(순수 함수)를 비동기 서비스 계층으로 옮긴다. `/api/search`
 * Route Handler가 이 함수를 재사용한다.
 *
 * 실시간 인기 검색어(TrendingPanel) 등에서 넘어온 검색어는 mock 기사와
 * 우연히 일치하지 않으면 결과가 텅 비어 "적당한 기사로 이동하지 않는"
 * 문제가 있었다. 검색어가 있고 카테고리/기간 등 mock 전용 필터가 활성화돼
 * 있지 않으면 네이버 뉴스 검색 API로 실제 결과를 가져오고, 필터를 쓰는
 * 탐색형 검색(필터 패널)은 기존처럼 mock 데이터를 그대로 사용한다.
 */
export const fetchSearchResults = cache(async function fetchSearchResults(
  query: string,
  filters: SearchFilterState = DEFAULT_SEARCH_FILTERS,
  sort: SearchSortOption = "latest",
): Promise<NewsArticle[]> {
  if (query.trim() && !isSearchFilterActive(filters) && isNaverNewsConfigured()) {
    try {
      return await fetchNaverSearchResults(query);
    } catch (error) {
      console.error("[news-api] 네이버 뉴스(검색) 조회 실패, mock으로 폴백:", error);
    }
  }

  await simulateNetwork();
  return searchArticles(query, filters, sort);
});
