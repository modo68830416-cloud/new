"use client";

import type { HTMLAttributes } from "react";
import { motion } from "motion/react";
import { durations } from "@/animations/durations";
import { easings } from "@/animations/easings";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

export interface LiveDotProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  /** 점 크기(px). 기본 8 */
  size?: number;
  /** 스크린 리더 전용 라벨. 기본 "실시간" */
  label?: string;
}

/**
 * 실시간(LIVE) 상태를 나타내는 독립적인 점 인디케이터.
 * opacity + scale로 바깥쪽 링이 퍼져나가는(ping) 효과만 사용한다 (GPU 친화적,
 * 레이아웃에 영향 없음 — 링은 절대 위치).
 *
 * `prefers-reduced-motion: reduce` 환경에서는 ping 애니메이션 없이 정적인
 * 점만 표시한다.
 */
export function LiveDot({ size = 8, label = "실시간", className, style, ...props }: LiveDotProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <span
      role="status"
      className={cn("relative inline-flex shrink-0", className)}
      style={{ width: size, height: size, ...style }}
      {...props}
    >
      <span className="sr-only">{label}</span>
      {!prefersReducedMotion && (
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full bg-live"
          initial={{ opacity: 0.7, scale: 1 }}
          animate={{ opacity: [0.7, 0], scale: [1, 2.4] }}
          transition={{
            duration: durations.dramatic,
            ease: easings.standard,
            repeat: Infinity,
          }}
        />
      )}
      <span className="relative inline-flex size-full rounded-full bg-live" aria-hidden />
    </span>
  );
}
