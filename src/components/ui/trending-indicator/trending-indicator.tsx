import { forwardRef } from "react";
import { Minus, Sparkles, TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TrendingKeywordChange } from "@/types/news";
import type { TrendingIndicatorProps } from "./trending-indicator.types";

const CONFIG: Record<
  TrendingKeywordChange,
  { icon: typeof TrendingUp; label: string; colorClass: string }
> = {
  up: { icon: TrendingUp, label: "상승", colorClass: "text-success" },
  down: { icon: TrendingDown, label: "하락", colorClass: "text-breaking" },
  same: { icon: Minus, label: "변동 없음", colorClass: "text-text-muted" },
  new: { icon: Sparkles, label: "신규 진입", colorClass: "text-accent-primary" },
};

/** 트렌딩 키워드 순위 변동 표시자 (상승/하락/유지/신규) */
export const TrendingIndicator = forwardRef<
  HTMLSpanElement,
  TrendingIndicatorProps
>(function TrendingIndicator({ change, delta, className, ...props }, ref) {
  const { icon: Icon, label, colorClass } = CONFIG[change];

  return (
    <span
      ref={ref}
      className={cn(
        "type-data-number inline-flex items-center gap-1 text-xs",
        colorClass,
        className,
      )}
      {...props}
    >
      <Icon size={14} aria-hidden />
      <span className="sr-only">{label}</span>
      {(change === "up" || change === "down") && delta ? (
        <span aria-hidden>{Math.abs(delta)}</span>
      ) : null}
    </span>
  );
});
