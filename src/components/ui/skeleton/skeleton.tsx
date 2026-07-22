import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import type { SkeletonProps } from "./skeleton.types";

/** TASK-002의 `skeleton` 유틸리티(shimmer)를 감싸는 로딩 플레이스홀더 */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  function Skeleton(
    { circle = false, width, height, style, className, ...props },
    ref,
  ) {
    return (
      <div
        ref={ref}
        role="status"
        aria-label="로딩 중"
        className={cn("skeleton block", circle ? "rounded-full" : "rounded-sm", className)}
        style={{ width, height, ...style }}
        {...props}
      />
    );
  },
);
