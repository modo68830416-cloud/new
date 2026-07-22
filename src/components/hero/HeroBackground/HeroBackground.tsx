"use client";

import { motion } from "motion/react";
import { durations } from "@/animations/durations";
import { easings } from "@/animations/easings";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import type { HeroBackgroundProps } from "./HeroBackground.types";

/**
 * Hero 섹션 배경의 은은한 Glow 모션(Hero Background Motion).
 *
 * 순수 장식 요소이므로 `aria-hidden`으로 스크린 리더에서 숨기고, 콘텐츠
 * 뒤에 절대 위치로 배치해 레이아웃에 영향을 주지 않는다. opacity/scale만
 * 사용하는 GPU 친화적 애니메이션이며, `prefers-reduced-motion: reduce`
 * 환경에서는 정적인 상태로 고정된다.
 */
export function HeroBackground({ className }: HeroBackgroundProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <motion.div
        className="bg-gradient-surface-glow absolute -top-1/3 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full sm:h-[54rem] sm:w-[54rem]"
        animate={
          prefersReducedMotion
            ? { opacity: 0.6, scale: 1 }
            : { opacity: [0.45, 0.8, 0.45], scale: [1, 1.08, 1] }
        }
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : {
                duration: durations.dramatic * 4,
                ease: easings.standard,
                repeat: Infinity,
              }
        }
      />
      <div className="bg-gradient-hero-overlay absolute inset-0" />
    </div>
  );
}
