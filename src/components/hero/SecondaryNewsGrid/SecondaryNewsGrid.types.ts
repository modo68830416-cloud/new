import type { NewsArticle } from "@/types/news";

export interface SecondaryNewsGridProps {
  /** 표시할 보조 기사 목록(4~6개 권장). 생략 시 mock 데이터에서 자동으로 고른다 */
  articles?: NewsArticle[];
  className?: string;
}
