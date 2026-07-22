"use client";

import type { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";
import { motionPresets } from "@/animations/presets";
import { transitionReduced } from "@/animations/transitions";
import { reducedMotionVariants } from "@/animations/variants";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export interface SlideUpProps
  extends Omit<
    HTMLMotionProps<"div">,
    "variants" | "initial" | "animate" | "transition" | "ref"
  > {
  repeat?: boolean;
  once?: boolean;
  threshold?: number;
  rootMargin?: string;
  delay?: number;
}

/**
 * 아래에서 위로(opacity + translateY) 미세하게 이동하며 등장하는
 * Scroll Reveal 래퍼. `prefers-reduced-motion: reduce` 환경에서는 이동 없이
 * opacity만, 즉시 표시된다.
 */
export function SlideUp({
  repeat = false,
  once = true,
  threshold,
  rootMargin,
  delay = 0,
  ...props
}: SlideUpProps) {
  const { ref, animate, prefersReducedMotion } = useScrollReveal<HTMLDivElement>({
    variant: "slide",
    once,
    repeat,
    threshold,
    rootMargin,
  });

  const preset = motionPresets["slide-up"];

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
