import type { HTMLAttributes } from "react";

export type CardPadding = "none" | "sm" | "md" | "lg";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: CardPadding;
  /** hover 시 강조 (링크형 카드에 사용) */
  interactive?: boolean;
  /** accent 테두리로 강조 표시 */
  highlighted?: boolean;
}

export type CardSectionProps = HTMLAttributes<HTMLDivElement>;
