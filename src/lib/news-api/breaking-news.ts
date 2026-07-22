import { cache } from "react";
import { MOCK_BREAKING_NEWS } from "@/data/mock-breaking-news";
import { simulateNetwork } from "./simulate";
import type { BreakingNewsItem } from "@/types/news";

export const fetchActiveBreakingNews = cache(async function fetchActiveBreakingNews(): Promise<
  BreakingNewsItem[]
> {
  await simulateNetwork();
  return MOCK_BREAKING_NEWS.filter((item) => item.isActive);
});
