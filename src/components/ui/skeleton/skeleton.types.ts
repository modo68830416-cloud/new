import type { HTMLAttributes } from "react";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** true면 원형(아바타 등)으로 표시 */
  circle?: boolean;
  width?: string | number;
  height?: string | number;
}
