import { cache } from "react";
import { MOCK_NEWS } from "@/data/mock-news";
import { fetchActiveBreakingNews } from "./breaking-news";
import { simulateNetwork } from "./simulate";

export interface LiveStatusSnapshot {
  todayArticleCount: number;
  breakingCount: number;
  lastUpdatedAt?: string;
}

/**
 * TASK-013 — `LiveStatusPanel`이 표시하던 계산(오늘 등록된 기사 수, 진행 중
 * 속보 수, 최근 업데이트 시각)을 서비스 계층으로 옮긴다. 계산식은 기존
 * 컴포넌트와 동일하게 유지한다 — 속보 최신 항목의 시각을 우선하고, 없으면
 * 가장 먼저 등록된 기사의 발행 시각을 사용한다.
 */
export const fetchLiveStatus = cache(async function fetchLiveStatus(): Promise<LiveStatusSnapshot> {
  await simulateNetwork();
  const breaking = await fetchActiveBreakingNews();

  return {
    todayArticleCount: MOCK_NEWS.length,
    breakingCount: breaking.length,
    lastUpdatedAt: breaking[0]?.timestamp ?? MOCK_NEWS[0]?.publishedAt,
  };
});
