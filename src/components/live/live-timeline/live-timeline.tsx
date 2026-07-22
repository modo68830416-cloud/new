"use client";

import { useId } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, RefreshCw, RotateCw, Sparkles } from "lucide-react";
import { Surface } from "@/components/ui/surface";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { Button } from "@/components/ui/button";
import { CategoryBadge } from "@/components/ui/category-badge";
import { TimeAgo } from "@/components/ui/time-ago";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { transitionEnter, transitionReduced } from "@/animations/transitions";
import { reducedMotionVariants, slideDownVariants } from "@/animations/variants";
import { cn } from "@/lib/utils";
import type { LiveTimelineStatus, LiveTimelineProps } from "./live-timeline.types";

const STATUS_CONFIG: Record<
  LiveTimelineStatus,
  { label: string; icon: typeof Sparkles; colorClass: string }
> = {
  new: { label: "신규", icon: Sparkles, colorClass: "text-accent-primary" },
  updated: { label: "업데이트", icon: RefreshCw, colorClass: "text-info" },
  resolved: { label: "종료", icon: CheckCircle2, colorClass: "text-success" },
};

/**
 * Live Update Timeline (task-008.md "Live Timeline").
 *
 * 새 항목이 배열 앞쪽에 추가되면(부모 state가 갱신되면) `AnimatePresence` +
 * `layout`으로 자연스럽게 밀려 내려가며 등장한다. `prefers-reduced-motion`
 * 환경에서는 layout 이동을 끄고 opacity만 즉시 전환한다
 * (`useReducedMotion`, task-004 규칙).
 */
export function LiveTimeline({
  entries,
  title = "실시간 업데이트 타임라인",
  isLoading = false,
  error = null,
  onRetry,
  skeletonCount = 5,
  className,
}: LiveTimelineProps) {
  const headingId = useId();
  const prefersReducedMotion = useReducedMotion();

  return (
    <Surface
      as="section"
      radius="md"
      bordered
      className={cn("flex flex-col gap-4 p-5", className)}
      aria-labelledby={headingId}
    >
      <h2 id={headingId} className="type-card-title">
        {title}
      </h2>

      {isLoading ? (
        <ul className="flex flex-col gap-4">
          {Array.from({ length: skeletonCount }, (_, index) => (
            <li key={index} className="flex items-start gap-3">
              <Skeleton circle width={20} height={20} />
              <div className="flex flex-1 flex-col gap-2">
                <Skeleton height={12} width={80} />
                <Skeleton height={16} className="w-full" />
              </div>
            </li>
          ))}
        </ul>
      ) : error ? (
        <ErrorState
          description={error}
          action={
            onRetry ? (
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<RotateCw size={14} aria-hidden />}
                onClick={onRetry}
              >
                다시 시도
              </Button>
            ) : undefined
          }
        />
      ) : entries.length === 0 ? (
        <EmptyState
          title="표시할 업데이트가 없습니다."
          description="새로운 소식이 들어오면 이곳에 실시간으로 표시됩니다."
        />
      ) : (
        <ol aria-live="polite" aria-atomic="false" className="flex flex-col gap-1">
          <AnimatePresence initial={false}>
            {entries.map((entry) => {
              const status = STATUS_CONFIG[entry.status];
              const StatusIcon = status.icon;
              return (
                <motion.li
                  key={entry.id}
                  layout={!prefersReducedMotion}
                  variants={prefersReducedMotion ? reducedMotionVariants : slideDownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={prefersReducedMotion ? transitionReduced : transitionEnter}
                  className="flex items-start gap-3 border-b border-border-subtle py-3 last:border-b-0"
                >
                  <span className={cn("mt-0.5 inline-flex shrink-0", status.colorClass)} aria-hidden>
                    <StatusIcon size={16} />
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <TimeAgo date={entry.timestamp} className="text-text-muted" />
                      <CategoryBadge category={entry.category} size="sm" />
                      <span className={cn("type-metadata", status.colorClass)}>{status.label}</span>
                    </div>
                    <p className="type-body truncate text-text-primary">
                      {entry.href ? (
                        <a
                          href={entry.href}
                          className="hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary"
                        >
                          {entry.title}
                        </a>
                      ) : (
                        entry.title
                      )}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ol>
      )}
    </Surface>
  );
}
