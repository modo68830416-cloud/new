import type { TrendingKeyword } from "@/types/news";

export interface KeywordPanelProps {
  keywords: TrendingKeyword[];
  title?: string;
  /** 검색어 목록이 마지막으로 갱신된 시각 */
  updatedAt?: string;
  /** 상위 몇 개까지 표시할지. 기본 10 */
  limit?: number;
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  className?: string;
}
