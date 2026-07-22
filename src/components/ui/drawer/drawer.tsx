"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DrawerProps, DrawerSide } from "./drawer.types";

const SIDE_CLASSES: Record<DrawerSide, string> = {
  left: cn(
    "inset-y-0 left-0 h-full w-[min(22rem,100%)] border-r",
    "-translate-x-full data-[state=open]:translate-x-0",
  ),
  right: cn(
    "inset-y-0 right-0 h-full w-[min(22rem,100%)] border-l",
    "translate-x-full data-[state=open]:translate-x-0",
  ),
  bottom: cn(
    "inset-x-0 bottom-0 max-h-[85vh] w-full border-t",
    "translate-y-full data-[state=open]:translate-y-0",
  ),
};

/**
 * 사이드/하단에서 슬라이드되는 드로어 (Radix Dialog 기반).
 * Modal과 동일한 포커스 트랩/ESC/스크롤 잠금 동작을 갖는다.
 */
export function Drawer({
  open,
  onOpenChange,
  title,
  description,
  side = "right",
  children,
  footer,
  trigger,
}: DrawerProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            "z-overlay fixed inset-0 bg-[var(--color-overlay-scrim)]",
            "opacity-0 transition-opacity duration-[var(--duration-normal)] ease-[var(--ease-standard)]",
            "data-[state=open]:opacity-100",
          )}
        />
        <Dialog.Content
          className={cn(
            "z-overlay glass-strong fixed flex flex-col p-6 shadow-lg",
            "transition-transform duration-[var(--duration-normal)] ease-[var(--ease-emphasis)]",
            "focus:outline-none border-border-default",
            SIDE_CLASSES[side],
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
          <div className="flex-1 overflow-y-auto">{children}</div>
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
