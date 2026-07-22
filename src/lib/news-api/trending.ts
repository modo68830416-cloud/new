import { cache } from "react";
import { unstable_cache } from "next/cache";
import { MOCK_TRENDING_KEYWORDS } from "@/data/mock-trending-keywords";
import { simulateNetwork } from "./simulate";
import type { TrendingKeyword } from "@/types/news";

export const TRENDING_KEYWORDS_CACHE_TAG = "trending-keywords";

/**
 * TASK-013 — 실시간 인기 검색어는 1분 정도의 지연은 허용 가능한 데이터이므로
 * `unstable_cache`로 60초간 캐시한다. `POST /api/revalidate`에서
 * `revalidateTag(TRENDING_KEYWORDS_CACHE_TAG)`를 호출하면 즉시 무효화된다.
 */
const getCachedTrendingKeywords = unstable_cache(
  async (): Promise<TrendingKeyword[]> => {
    await simulateNetwork();
    return [...MOCK_TRENDING_KEYWORDS].sort((a, b) => a.rank - b.rank);
  },
  ["trending-keywords-all"],
  { revalidate: 60, tags: [TRENDING_KEYWORDS_CACHE_TAG] },
);

export const fetchTrendingKeywords = cache(async function fetchTrendingKeywords(
  limit = 10,
): Promise<TrendingKeyword[]> {
  const keywords = await getCachedTrendingKeywords();
  return keywords.slice(0, limit);
});
