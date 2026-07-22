import type { HTMLAttributes, ReactNode } from "react";

export type DividerOrientation = "horizontal" | "vertical";

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: DividerOrientation;
  /** 구분선 중앙에 표시할 라벨 (horizontal일 때만 적용) */
  label?: ReactNode;
}
