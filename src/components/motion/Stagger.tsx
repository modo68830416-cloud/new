"use client";

import { Children, isValidElement } from "react";
import type { HTMLMotionProps, TargetAndTransition, Variants } from "motion/react";
import { motion } from "motion/react";
import { motionPresets, staggerContainerPreset } from "@/animations/presets";
import { reducedMotionVariants } from "@/animations/variants";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

export interface StaggerProps
  extends Omit<
    HTMLMotionProps<"div">,
    "variants" | "initial" | "animate" | "transition" | "ref" | "children"
  > {
  children: React.ReactNode;
  /** 각 자식(item)에 적용할 className */
  itemClassName?: string;
  repeat?: boolean;
  once?: boolean;
  threshold?: number;
  rootMargin?: string;
}

/**
 * 자식 요소를 순서대로 시차(stagger)를 두고 등장시키는 Scroll Reveal 컨테이너.
 * 각 자식은 자동으로 `motion.div`로 감싸져 fade + slide-up 애니메이션을 받는다.
 *
 * `prefers-reduced-motion: reduce` 환경에서는 시차 없이 opacity만, 즉시
 * 표시된다.
 */
export function Stagger({
  children,
  className,
  itemClassName,
  repeat = false,
  once = true,
  threshold,
  rootMargin,
  ...props
}: StaggerProps) {
  const { ref, animate, prefersReducedMotion } = useScrollReveal<HTMLDivElement>({
    variant: "stagger",
    once,
    repeat,
    threshold,
    rootMargin,
  });

  const itemPreset = motionPresets.stagger;
  const itemVisible = itemPreset.variants.visible as TargetAndTransition;

  const itemVariants: Variants = prefersReducedMotion
    ? reducedMotionVariants
    : {
        hidden: itemPreset.variants.hidden,
        visible: { ...itemVisible, transition: itemPreset.transition },
      };

  const containerVariants: Variants = prefersReducedMotion
    ? reducedMotionVariants
    : staggerContainerPreset.variants;

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={animate}
      className={className}
      {...props}
    >
      {Children.map(children, (child, index) => (
        <motion.div
          key={isValidElement(child) && child.key !== null ? child.key : index}
          variants={itemVariants}
          className={cn(itemClassName)}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
