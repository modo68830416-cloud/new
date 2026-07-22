import type { HTMLAttributes } from "react";
import type { TrendingKeywordChange } from "@/types/news";

export interface TrendingIndicatorProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  change: TrendingKeywordChange;
  /** 순위 변동 폭 (change가 up/down일 때 표시) */
  delta?: number;
}
