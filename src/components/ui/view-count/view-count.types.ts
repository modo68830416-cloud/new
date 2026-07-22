import type { HTMLAttributes } from "react";

export interface ViewCountProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  count: number;
  /** 아이콘 표시 여부 */
  showIcon?: boolean;
  /** 접근성 라벨. 기본값 "조회수" */
  label?: string;
}
