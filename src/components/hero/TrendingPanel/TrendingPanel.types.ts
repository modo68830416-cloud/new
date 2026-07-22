import type { TrendingKeyword } from "@/types/news";

export interface TrendingPanelProps {
  /** 표시할 키워드 목록. 생략 시 mock 데이터에서 상위 10개를 사용한다 */
  keywords?: TrendingKeyword[];
  className?: string;
}
