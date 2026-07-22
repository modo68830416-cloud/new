"use client";

import { AlertTriangle, CheckCircle2, Info, X, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ToastItem, ToastTone } from "./toast.types";

const TONE_ICON: Record<ToastTone, typeof Info> = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  danger: XCircle,
};

const TONE_ICON_CLASSES: Record<ToastTone, string> = {
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
  danger: "text-breaking",
};

function ToastCard({
  toast,
  onDismiss,
}: {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}) {
  const tone = toast.tone ?? "info";
  const Icon = TONE_ICON[tone];

  return (
    <div
      role="status"
      className={cn(
        "glass-strong z-toast flex w-full max-w-sm items-start gap-3 rounded-md p-4 shadow-lg",
      )}
    >
      <Icon size={18} className={cn("mt-0.5 shrink-0", TONE_ICON_CLASSES[tone])} aria-hidden />
      <div className="flex-1 min-w-0">
        <p className="type-card-title">{toast.title}</p>
        {toast.description && (
          <p className="type-caption mt-1">{toast.description}</p>
        )}
        {toast.action && <div className="mt-2">{toast.action}</div>}
      </div>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        aria-label="알림 닫기"
        className="inline-flex size-6 shrink-0 items-center justify-center rounded-sm text-text-muted hover:bg-surface-elevated hover:text-text-primary"
      >
        <X size={14} aria-hidden />
      </button>
    </div>
  );
}

export function ToastViewport({
  toasts,
  onDismiss,
}: {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}) {
  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="z-toast pointer-events-none fixed inset-x-0 bottom-0 flex flex-col items-center gap-2 p-4 sm:inset-x-auto sm:right-0 sm:items-end"
    >
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto w-full sm:w-auto">
          <ToastCard toast={toast} onDismiss={onDismiss} />
        </div>
      ))}
    </div>
  );
}
