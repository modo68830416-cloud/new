import { forwardRef } from "react";
import { AlertTriangle, Radio, Siren } from "lucide-react";
import { cn } from "@/lib/utils";
import { designSystemConfig } from "@/config/design-system";
import type { BreakingBadgeProps } from "./breaking-badge.types";

const ICONS = {
  Radio,
  AlertTriangle,
  Siren,
} as const;

/**
 * 속보 단계(normal/urgent/critical) 배지. 색상만으로 구분하지 않도록
 * 아이콘 + 한국어 라벨을 항상 함께 표시한다.
 */
export const BreakingBadge = forwardRef<HTMLSpanElement, BreakingBadgeProps>(
  function BreakingBadge({ level = "normal", iconOnly = false, className, ...props }, ref) {
    const style = designSystemConfig.breakingLevelStyles.find(
      (s) => s.level === level,
    ) ?? designSystemConfig.breakingLevelStyles[0];
    const Icon = ICONS[style.icon];

    return (
      <span
        ref={ref}
        className={cn(
          "type-label inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1",
          style.pulse && "pulse-critical",
          className,
        )}
        style={{
          backgroundColor: `var(${style.colorVar})`,
          borderColor: `var(${style.borderVar})`,
          color: `var(${style.textVar})`,
        }}
        {...props}
      >
        <Icon size={14} aria-hidden />
        <span className={cn(iconOnly && "sr-only")}>{style.label}</span>
      </span>
    );
  },
);
