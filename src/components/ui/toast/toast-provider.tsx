"use client";

import { createContext, useCallback, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { ToastViewport } from "./toast";
import type { ToastContextValue, ToastItem, ToastOptions } from "./toast.types";

export const ToastContext = createContext<ToastContextValue | null>(null);

let toastCounter = 0;

/**
 * 전역 Toast 상태를 제공한다. 앱(또는 /ui-preview 데모) 루트에 한 번만
 * 감싸고, useToast() 훅으로 어디서든 showToast()를 호출한다.
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (options: ToastOptions) => {
      toastCounter += 1;
      const id = `toast-${toastCounter}`;
      const toast: ToastItem = { durationMs: 5000, tone: "info", ...options, id };
      setToasts((current) => [...current, toast]);

      if (toast.durationMs && toast.durationMs > 0) {
        setTimeout(() => dismissToast(id), toast.durationMs);
      }

      return id;
    },
    [dismissToast],
  );

  const value = useMemo(
    () => ({ toasts, showToast, dismissToast }),
    [toasts, showToast, dismissToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  );
}
