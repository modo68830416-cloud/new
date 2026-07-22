"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";
import type { DropdownProps } from "./dropdown.types";

/**
 * 접근성 있는 드롭다운 메뉴 (Radix DropdownMenu 기반: 방향키 탐색,
 * Home/End, 타입어헤드, Escape 닫기를 기본 제공한다).
 */
export function Dropdown({ trigger, items, onSelect, align = "end", label }: DropdownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align={align}
          sideOffset={6}
          aria-label={label}
          className={cn(
            "z-dropdown min-w-40 rounded-md border border-border-default bg-surface-elevated p-1 shadow-md",
            "opacity-0 transition-opacity duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
            "data-[state=open]:opacity-100",
          )}
        >
          {items.map((item) => (
            <DropdownMenu.Item
              key={item.value}
              disabled={item.disabled}
              onSelect={() => onSelect?.(item.value)}
              className={cn(
                "type-caption flex cursor-pointer items-center gap-2 rounded-sm px-2.5 py-2 text-text-primary outline-none",
                "data-[highlighted]:bg-surface-overlay data-[highlighted]:text-text-primary",
                "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
                item.danger && "text-breaking data-[highlighted]:text-breaking",
              )}
            >
              {item.icon && (
                <span className="inline-flex shrink-0" aria-hidden>
                  {item.icon}
                </span>
              )}
              {item.label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
