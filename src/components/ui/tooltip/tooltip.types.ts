import type { ReactNode } from "react";

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  /** hover/focus 후 표시까지 지연시간(ms) */
  delayMs?: number;
}
