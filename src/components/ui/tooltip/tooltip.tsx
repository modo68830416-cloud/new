"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";
import type { TooltipProps } from "./tooltip.types";

/**
 * 접근성 있는 툴팁 (Radix Tooltip 기반: hover뿐 아니라 키보드 포커스에도
 * 반응하고, Escape로 닫을 수 있다).
 */
export function Tooltip({ content, children, side = "top", delayMs = 200 }: TooltipProps) {
  return (
    <TooltipPrimitive.Provider delayDuration={delayMs}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            sideOffset={6}
            className={cn(
              "z-dropdown type-caption max-w-xs rounded-md border border-border-default bg-surface-elevated px-3 py-2 text-text-primary shadow-md",
              "opacity-0 transition-opacity duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
              "data-[state=delayed-open]:opacity-100 data-[state=instant-open]:opacity-100",
            )}
          >
            {content}
            <TooltipPrimitive.Arrow className="fill-surface-elevated" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
