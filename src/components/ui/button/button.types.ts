import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 시각적 스타일 종류 */
  variant?: ButtonVariant;
  /** 크기 */
  size?: ButtonSize;
  /** 로딩 스피너를 표시하고 상호작용을 막는다 */
  isLoading?: boolean;
  /** 좌측 아이콘 (장식용, aria-hidden 처리됨) */
  leftIcon?: ReactNode;
  /** 우측 아이콘 (장식용, aria-hidden 처리됨) */
  rightIcon?: ReactNode;
  /** 가로 폭을 100%로 채운다 */
  fullWidth?: boolean;
}
