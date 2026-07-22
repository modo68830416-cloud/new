"use client";

import { AnimatePresence, motion } from "motion/react";
import { Bell, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { transitionEnter, transitionReduced } from "@/animations/transitions";
import { reducedMotionVariants, slideDownVariants } from "@/animations/variants";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import type { UpdateBannerProps } from "./update-banner.types";

/**
 * "새로운 속보 N건이 있습니다" 배너 (task-008.md "Update Banner").
 *
 * `onRefresh`는 mock 동작이다 — 실제 데이터 재요청은 이후 Task 범위다.
 * `role="status"` + `aria-live="polite"`로 새 속보 알림을 스크린 리더에도
 * 전달한다.
 */
export function UpdateBanner({ count, onRefresh, visible, className }: UpdateBannerProps) {
  const prefersReducedMotion = useReducedMotion();
  const shouldShow = (visible ?? count > 0) && count > 0;

  return (
    <AnimatePresence initial={false}>
      {shouldShow && (
        <motion.div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          variants={prefersReducedMotion ? reducedMotionVariants : slideDownVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={prefersReducedMotion ? transitionReduced : transitionEnter}
          className={cn(
            "flex flex-wrap items-center justify-between gap-3 rounded-md border border-accent-primary/40 bg-accent-primary/10 px-4 py-3",
            className,
          )}
        >
          <p className="type-body flex items-center gap-2 text-text-primary">
            <Bell size={16} className="shrink-0 text-accent-primary" aria-hidden />
            새로운 속보 {count}건이 있습니다
          </p>
          <Button
            variant="primary"
            size="sm"
            leftIcon={<RotateCw size={14} aria-hidden />}
            onClick={onRefresh}
          >
            새로고침
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
