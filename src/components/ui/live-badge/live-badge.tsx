import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import type { LiveBadgeProps } from "./live-badge.types";

/** 실시간 진행 중 상태 배지. 점 애니메이션 + LIVE 텍스트로 표현한다. */
export const LiveBadge = forwardRef<HTMLSpanElement, LiveBadgeProps>(
  function LiveBadge({ label = "LIVE", className, ...props }, ref) {
    return (
      <span
        ref={ref}
        role="status"
        className={cn(
          "type-label inline-flex w-fit items-center gap-1.5 rounded-full bg-live px-2.5 py-1 text-text-inverse",
          className,
        )}
        {...props}
      >
        <span className="relative flex size-2" aria-hidden>
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-text-inverse opacity-75" />
          <span className="relative inline-flex size-2 rounded-full bg-text-inverse" />
        </span>
        {label}
      </span>
    );
  },
);
