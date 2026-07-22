"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * 현재 브라우저의 `prefers-reduced-motion` 상태를 표시한다.
 * OS/브라우저 devtools에서 값을 바꾼 뒤 새로고침하면 즉시 반영된다.
 */
export function ReducedMotionStatus() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <p className="type-metadata inline-flex w-fit items-center gap-2 rounded-full border border-border-default bg-surface px-3 py-1.5 text-text-secondary normal-case">
      현재 시스템 설정:{" "}
      <span className={prefersReducedMotion ? "text-warning" : "text-success"}>
        {prefersReducedMotion ? "prefers-reduced-motion: reduce" : "no-preference"}
      </span>
    </p>
  );
}
