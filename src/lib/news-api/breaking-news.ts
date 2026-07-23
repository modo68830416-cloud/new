import { cache } from "react";
import { unstable_cache } from "next/cache";
import { MOCK_BREAKING_NEWS } from "@/data/mock-breaking-news";
import { simulateNetwork } from "./simulate";
import { fetchNaverBreakingTicker, isNaverNewsConfigured } from "./naver";
import type { BreakingNewsItem } from "@/types/news";

export const BREAKING_NEWS_CACHE_TAG = "breaking-news";

/**
 * TASK-013 — 속보 목록은 자주 조회되지만 자주 바뀌지는 않으므로
 * `unstable_cache`로 30초간 캐시한다. `POST /api/revalidate`에서
 * `revalidateTag(BREAKING_NEWS_CACHE_TAG)`를 호출하면 즉시 무효화된다.
 *
 * 이 프로젝트는 Cache Components(`use cache`)를 켜지 않았으므로(다음
 * config에 `cacheComponents: true`가 없음) "이전 모델" 캐시 API인
 * `unstable_cache`/`revalidateTag`를 사용한다.
 *
 * 네이버 뉴스 API 키가 있으면 실제 "속보" 검색 결과를 쓰고, 없거나 실패하면
 * mock 데이터로 폴백한다 — mock 항목은 원래 클릭이 연결돼 있지 않았다.
 */
const getCachedActiveBreakingNews = unstable_cache(
  async (): Promise<BreakingNewsItem[]> => {
    if (isNaverNewsConfigured()) {
      try {
        return await fetchNaverBreakingTicker();
      } catch (error) {
        console.error("[news-api] 네이버 뉴스(속보 티커) 조회 실패, mock으로 폴백:", error);
      }
    }

    await simulateNetwork();
    return MOCK_BREAKING_NEWS.filter((item) => item.isActive);
  },
  ["breaking-news-active"],
  { revalidate: 30, tags: [BREAKING_NEWS_CACHE_TAG] },
);

export const fetchActiveBreakingNews = cache(async function fetchActiveBreakingNews(): Promise<
  BreakingNewsItem[]
> {
  return getCachedActiveBreakingNews();
});
