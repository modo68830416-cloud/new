import type { HTMLAttributes, ReactNode } from "react";

export interface ErrorStateProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode;
  title?: string;
  description?: string;
  /** 재시도 버튼 등 액션 요소 */
  action?: ReactNode;
}
