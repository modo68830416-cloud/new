"use client";

import { forwardRef, useId, useState } from "react";
import { cn } from "@/lib/utils";
import type { SwitchProps } from "./switch.types";

const TRACK_SIZE = {
  sm: "h-5 w-9",
  md: "h-6 w-11",
};

const THUMB_SIZE = {
  sm: "size-4 group-data-[checked=true]:translate-x-4",
  md: "size-5 group-data-[checked=true]:translate-x-5",
};

/** role="switch" 기반 토글 스위치. 제어/비제어 모두 지원한다. */
export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  function Switch(
    {
      label,
      checked: controlledChecked,
      defaultChecked = false,
      onCheckedChange,
      size = "md",
      id,
      className,
      disabled,
      ...props
    },
    ref,
  ) {
    const generatedId = useId();
    const switchId = id ?? generatedId;
    const [innerChecked, setInnerChecked] = useState(defaultChecked);
    const isControlled = controlledChecked !== undefined;
    const checked = isControlled ? controlledChecked : innerChecked;

    const toggle = () => {
      if (disabled) return;
      const next = !checked;
      if (!isControlled) setInnerChecked(next);
      onCheckedChange?.(next);
    };

    return (
      <label
        htmlFor={switchId}
        className={cn(
          "inline-flex items-center gap-2 type-body",
          disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        )}
      >
        <button
          ref={ref}
          id={switchId}
          type="button"
          role="switch"
          aria-checked={checked}
          disabled={disabled}
          data-checked={checked}
          onClick={toggle}
          className={cn(
            "group relative inline-flex shrink-0 items-center rounded-full border border-border-default bg-surface-overlay transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
            "data-[checked=true]:border-accent-primary data-[checked=true]:bg-accent-primary",
            TRACK_SIZE[size],
            className,
          )}
          {...props}
        >
          <span
            aria-hidden
            className={cn(
              "ml-0.5 inline-block rounded-full bg-text-primary transition-transform duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
              THUMB_SIZE[size],
            )}
          />
        </button>
        {label && <span>{label}</span>}
      </label>
    );
  },
);
