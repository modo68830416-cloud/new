"use client";

import type { ReactNode } from "react";
import type { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";
import { durations } from "@/animations/durations";
import { easings } from "@/animations/easings";
import { transitionReduced } from "@/animations/transitions";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

export interface BreakingPulseProps
  extends Omit<HTMLMotionProps<"div">, "animate" | "transition" | "children"> {
  children?: ReactNode;
  /** pulse를 켜고 끈다 (예: critical 단계에서만 true) */
  active?: boolean;
  /** 바깥쪽 ring 장식에 추가할 className (색상/모양 오버라이드용) */
  ringClassName?: string;
}

/**
 * 속보(Breaking News) critical 단계에서 사용하는 제한적인 pulse 효과.
 * transform(scale) + opacity만 사용하는 GPU 친화적 애니메이션이며, 감싸는
 * 요소 자체의 레이아웃 크기는 변하지 않는다 (ring은 절대 위치).
 *
 * `prefers-reduced-motion: reduce` 환경에서는 pulse를 완전히 제거한다.
 */
export function BreakingPulse({
  active = true,
  className,
  ringClassName,
  children,
  ...props
}: BreakingPulseProps) {
  const prefersReducedMotion = useReducedMotion();
  const shouldPulse = active && !prefersReducedMotion;

  return (
    <motion.div
      className={cn("relative inline-flex", className)}
      animate={shouldPulse ? { scale: [1, 1.04, 1] } : { scale: 1 }}
      transition={
        shouldPulse
          ? {
              duration: durations.dramatic,
              ease: easings.standard,
              repeat: Infinity,
            }
          : transitionReduced
      }
      {...props}
    >
      {shouldPulse && (
        <motion.span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[inherit] border-2 border-critical",
            ringClassName,
          )}
          initial={{ opacity: 0.7, scale: 1 }}
          animate={{ opacity: [0.7, 0], scale: [1, 1.3] }}
          transition={{
            duration: durations.dramatic,
            ease: easings.standard,
            repeat: Infinity,
          }}
        />
      )}
      {children}
    </motion.div>
  );
}
