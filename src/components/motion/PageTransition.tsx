"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import {
  pageTransitionVariants,
  reducedPageTransitionVariants,
} from "@/animations/variants";
import { transitionReduced, transitionStandard } from "@/animations/transitions";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface PageTransitionProps {
  children: ReactNode;
  className?: string;
  /**
   * 전환을 트리거할 key를 직접 지정한다. 기본값은 현재 경로
   * (`usePathname()`)이며, 데모/프리뷰처럼 실제 라우트 이동 없이 전환을
   * 재현하고 싶을 때만 명시적으로 넘긴다.
   */
  transitionKey?: string;
}

/**
 * App Router의 `template.tsx`(또는 레이아웃) 안에서 `{children}`을 감싸
 * 재사용할 수 있는 페이지 전환 구조. Next.js 경로(`usePathname`)를 key로
 * 사용해 라우트가 바뀔 때만 전환 애니메이션이 발생한다.
 *
 * opacity + 8px 수직 이동만 사용하는 가벼운 전환이며, `prefers-reduced-motion:
 * reduce` 환경에서는 이동 없이 opacity만, 거의 즉시(최소화된 duration)
 * 전환된다.
 */
export function PageTransition({ children, className, transitionKey }: PageTransitionProps) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={transitionKey ?? pathname}
        className={className}
        variants={
          prefersReducedMotion ? reducedPageTransitionVariants : pageTransitionVariants
        }
        initial="initial"
        animate="animate"
        exit="exit"
        transition={prefersReducedMotion ? transitionReduced : transitionStandard}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
