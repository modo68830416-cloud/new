"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ModalProps, ModalSize } from "./modal.types";

const SIZE_CLASSES: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
};

/**
 * 접근성 있는 모달 다이얼로그 (Radix Dialog 기반: 포커스 트랩, ESC 닫기,
 * 배경 스크롤 잠금, aria-modal을 자동으로 처리한다).
 */
export function Modal({
  open,
  onOpenChange,
  title,
  description,
  size = "md",
  children,
  footer,
  trigger,
}: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            "z-modal fixed inset-0 bg-[var(--color-overlay-scrim)]",
            "opacity-0 transition-opacity duration-[var(--duration-normal)] ease-[var(--ease-standard)]",
            "data-[state=open]:opacity-100",
          )}
        />
        <Dialog.Content
          className={cn(
            "z-modal glass-strong fixed top-1/2 left-1/2 w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-lg p-6 shadow-lg",
            "focus:outline-none",
            "scale-95 opacity-0 transition-all duration-[var(--duration-normal)] ease-[var(--ease-emphasis)]",
            "data-[state=open]:scale-100 data-[state=open]:opacity-100",
            "max-h-[85vh] overflow-y-auto",
            SIZE_CLASSES[size],
          )}
        >
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <Dialog.Title className="type-card-title">{title}</Dialog.Title>
              {description && (
                <Dialog.Description className="type-caption mt-1">
                  {description}
                </Dialog.Description>
              )}
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="닫기"
                className="inline-flex size-8 shrink-0 items-center justify-center rounded-sm text-text-muted hover:bg-surface-elevated hover:text-text-primary"
              >
                <X size={16} aria-hidden />
              </button>
            </Dialog.Close>
          </div>
          {children}
          {footer && (
            <div className="mt-6 flex items-center justify-end gap-2 border-t border-border-subtle pt-4">
              {footer}
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
