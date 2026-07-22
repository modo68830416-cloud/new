import type { RankedNewsListItem } from "@/components/news";

export type TrendingHubTabId = "popular" | "most-viewed" | "most-shared" | "rapidly-rising";

export interface TrendingHubTab {
  id: TrendingHubTabId;
  label: string;
  items: RankedNewsListItem[];
}

export interface TrendingHubProps {
  tabs: TrendingHubTab[];
  title?: string;
  defaultTabId?: TrendingHubTabId;
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  className?: string;
}
