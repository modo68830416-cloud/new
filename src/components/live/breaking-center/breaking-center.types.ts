import type { BreakingNewsLevel, NewsArticle } from "@/types/news";

export interface BreakingCenterItem {
  article: NewsArticle;
  level: BreakingNewsLevel;
  /** 선택적 위치 라벨 (예: "서울 강남구"). BreakingNewsCard로 그대로 전달한다 */
  locationLabel?: string;
  /** 선택적 주제 라벨 (예: "정전"). BreakingNewsCard로 그대로 전달한다 */
  topicLabel?: string;
}

export interface BreakingCenterProps {
  items: BreakingCenterItem[];
  title?: string;
  /** 센터 전체의 마지막 갱신 시각. 없으면 가장 최신 항목의 시각을 사용한다 */
  lastUpdatedAt?: string;
  /** 표시할 최대 개수. 없으면 전체를 표시한다 */
  limit?: number;
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  className?: string;
}
