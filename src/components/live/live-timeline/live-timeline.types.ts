import type { NewsCategory } from "@/types/news";

export type LiveTimelineStatus = "new" | "updated" | "resolved";

export interface LiveTimelineEntry {
  id: string;
  /** ISO 시각 */
  timestamp: string;
  title: string;
  category: Pick<NewsCategory, "slug" | "name" | "shortName">;
  status: LiveTimelineStatus;
  /** 있으면 제목이 링크가 된다 (예: `/news/{slug}`) */
  href?: string;
}

export interface LiveTimelineProps {
  entries: LiveTimelineEntry[];
  title?: string;
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  skeletonCount?: number;
  className?: string;
}
