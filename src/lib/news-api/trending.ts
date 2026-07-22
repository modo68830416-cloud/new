import { cache } from "react";
import { MOCK_TRENDING_KEYWORDS } from "@/data/mock-trending-keywords";
import { simulateNetwork } from "./simulate";
import type { TrendingKeyword } from "@/types/news";

export const fetchTrendingKeywords = cache(async function fetchTrendingKeywords(
  limit = 10,
): Promise<TrendingKeyword[]> {
  await simulateNetwork();
  return [...MOCK_TRENDING_KEYWORDS].sort((a, b) => a.rank - b.rank).slice(0, limit);
});
