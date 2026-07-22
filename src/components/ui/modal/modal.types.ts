import type { ReactNode } from "react";

export type ModalSize = "sm" | "md" | "lg";

export interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  size?: ModalSize;
  children?: ReactNode;
  footer?: ReactNode;
  /** 트리거를 Modal 내부에서 렌더링하고 싶을 때 사용 (선택) */
  trigger?: ReactNode;
}
