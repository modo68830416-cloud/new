"use client";

import { cn } from "@/lib/utils";
import { useScrollProgress } from "@/hooks/useScrollProgress";

export interface ReadProgressBarProps {
  /** 진행률 계산 기준이 되는 기사 본문 컨테이너의 DOM id */
  targetId: string;
  className?: string;
}

/**
 * 상단 고정 Read Progress Bar (TASK-009).
 *
 * 스크롤 위치에 따라 `targetId` 요소를 얼마나 읽었는지 폭(width)으로
 * 나타낸다. 순수 시각적 보조 요소이므로 `aria-hidden`이며, 실제 진행
 * 정보는 스크린 리더 사용자에게 별도 안내가 필요하지 않다(콘텐츠 자체를
 * 순서대로 읽으면 되므로).
 */
export function ReadProgressBar({ targetId, className }: ReadProgressBarProps) {
  const progress = useScrollProgress(targetId);

  return (
    <div
      aria-hidden
      className={cn(
        "fixed inset-x-0 top-0 z-[100] h-1 bg-border-subtle/60",
        className,
      )}
    >
      <div
        className="h-full bg-accent-primary transition-[width] duration-100 ease-linear motion-reduce:transition-none"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
