import type { NewsArticle } from "@/types/news";

export interface FeaturedHeroProps {
  /** 표시할 대표 기사. 생략 시 mock 데이터에서 자동으로 고른다 */
  article?: NewsArticle;
  className?: string;
}
