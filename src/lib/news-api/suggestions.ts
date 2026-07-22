import { cache } from "react";
import { getAutocompleteSuggestions } from "@/data/mock-search";
import { simulateNetwork } from "./simulate";
import type { SuggestionGroup } from "@/data/mock-search";

/**
 * TASK-015 — `SearchBox` 자동완성이 클라이언트에서 직접 호출하던
 * `getAutocompleteSuggestions`(순수 함수)를 비동기 서비스 계층으로 옮긴다.
 * `GET /api/search/suggestions`가 이 함수를 재사용한다.
 */
export const fetchAutocompleteSuggestions = cache(async function fetchAutocompleteSuggestions(
  query: string,
  limitPerGroup = 5,
): Promise<SuggestionGroup[]> {
  await simulateNetwork();
  return getAutocompleteSuggestions(query, limitPerGroup);
});
