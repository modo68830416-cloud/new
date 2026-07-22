import type { ReactNode } from "react";

export type ToastTone = "info" | "success" | "warning" | "danger";

export interface ToastOptions {
  title: string;
  description?: string;
  tone?: ToastTone;
  /** 자동 닫힘까지의 시간(ms). 0이면 자동으로 닫히지 않는다. 기본값 5000ms */
  durationMs?: number;
  action?: ReactNode;
}

export interface ToastItem extends ToastOptions {
  id: string;
}

export interface ToastContextValue {
  toasts: ToastItem[];
  showToast: (options: ToastOptions) => string;
  dismissToast: (id: string) => void;
}
