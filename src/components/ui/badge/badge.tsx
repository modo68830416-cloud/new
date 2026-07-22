import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import type { BadgeProps, BadgeSize, BadgeTone, BadgeVariant } from "./badge.types";

const TONE_SOLID: Record<BadgeTone, string> = {
  neutral: "bg-surface-overlay text-text-primary",
  accent: "bg-accent-primary text-text-inverse",
  success: "bg-success text-text-inverse",
  warning: "bg-warning text-text-inverse",
  danger: "bg-breaking text-text-inverse",
  info: "bg-info text-text-inverse",
};

const TONE_SOFT: Record<BadgeTone, string> = {
  neutral: "bg-surface-elevated text-text-secondary",
  accent: "bg-accent-primary/15 text-accent-primary",
  success: "bg-success/15 text-success",
  warning: "bg-warning/15 text-warning",
  danger: "bg-breaking/15 text-breaking",
  info: "bg-info/15 text-info",
};

const TONE_OUTLINE: Record<BadgeTone, string> = {
  neutral: "border border-border-default text-text-secondary",
  accent: "border border-accent-primary text-accent-primary",
  success: "border border-success text-success",
  warning: "border border-warning text-warning",
  danger: "border border-breaking text-breaking",
  info: "border border-info text-info",
};

const VARIANT_MAP: Record<BadgeVariant, Record<BadgeTone, string>> = {
  solid: TONE_SOLID,
  soft: TONE_SOFT,
  outline: TONE_OUTLINE,
};

const SIZE_CLASSES: Record<BadgeSize, string> = {
  sm: "h-5 px-2 text-xs gap-1",
  md: "h-6 px-2.5 text-xs gap-1.5",
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  {
    tone = "neutral",
    variant = "soft",
    size = "md",
    icon,
    className,
    children,
    ...props
  },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn(
        "type-label inline-flex w-fit items-center rounded-full whitespace-nowrap",
        VARIANT_MAP[variant][tone],
        SIZE_CLASSES[size],
        className,
      )}
      {...props}
    >
      {icon && (
        <span className="inline-flex shrink-0" aria-hidden>
          {icon}
        </span>
      )}
      {children}
    </span>
  );
});
