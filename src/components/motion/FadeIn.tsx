"use client";

import type { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";
import { motionPresets } from "@/animations/presets";
import { transitionReduced } from "@/animations/transitions";
import { reducedMotionVariants } from "@/animations/variants";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export interface FadeInProps
  extends Omit<
    HTMLMotionProps<"div">,
    "variants" | "initial" | "animate" | "transition" | "ref"
  > {
  /** 뷰포트에 다시 들어올 때마다 반복 재생한다 (기본 false) */
  repeat?: boolean;
  /** 한 번만 재생하고 유지한다 (기본 true, `repeat`가 true면 무시) */
  once?: boolean;
  /** IntersectionObserver threshold (기본 0.2) */
  threshold?: number;
  /** IntersectionObserver rootMargin */
  rootMargin?: string;
  /** 등장 전 지연 시간(초) */
  delay?: number;
}

/**
 * opacity만으로 부드럽게 등장하는 Scroll Reveal 래퍼.
 * `prefers-reduced-motion: reduce` 환경에서는 즉시(거의 0ms) 표시된다.
 */
export function FadeIn({
  repeat = false,
  once = true,
  threshold,
  rootMargin,
  delay = 0,
  ...props
}: FadeInProps) {
  const { ref, animate, prefersReducedMotion } = useScrollReveal<HTMLDivElement>({
    variant: "fade",
    once,
    repeat,
    threshold,
    rootMargin,
  });

  const preset = motionPresets.fade;

  return (
    <motion.div
      ref={ref}
      variants={prefersReducedMotion ? reducedMotionVariants : preset.variants}
      initial="hidden"
      animate={animate}
      transition={
        prefersReducedMotion ? transitionReduced : { ...preset.transition, delay }
      }
      {...props}
    />
  );
}
