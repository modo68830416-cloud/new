import type { HTMLAttributes } from "react";
import type { BreakingNewsLevel } from "@/types/news";

export interface BreakingBadgeProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  level?: BreakingNewsLevel;
  /** true면 라벨 텍스트를 시각적으로 숨기고 아이콘만 표시 (여전히 스크린 리더는 읽음) */
  iconOnly?: boolean;
}
