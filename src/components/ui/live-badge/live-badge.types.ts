import type { HTMLAttributes } from "react";

export interface LiveBadgeProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  /** 표시할 라벨. 기본값 "LIVE" */
  label?: string;
}
