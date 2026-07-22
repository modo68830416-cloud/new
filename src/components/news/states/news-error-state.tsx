"use client";

import { RotateCw } from "lucide-react";
import { ErrorState } from "@/components/ui/error-state";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/link-button";

export interface NewsErrorStateProps {
  title?: string;
  description?: string;
  /** "다시 시도" 버튼의 클릭 핸들러. 없으면 버튼을 표시하지 않는다 */
  onRetry?: () => void;
  /** 홈 등 다른 영역으로 이동할 수 있는 선택적 링크 */
  homeHref?: string;
  homeLabel?: string;
  className?: string;
}

/**
 * 뉴스 데이터를 불러오지 못한 경우 사용하는 공통 error 상태
 * (task-007.md 16절). 실제 fetch 재시도 로직은 이번 Task 범위 밖이므로
 * `onRetry` 콜백 인터페이스만 준비한다.
 */
export function NewsErrorState({
  title = "뉴스를 불러오지 못했습니다.",
  description = "일시적인 문제일 수 있습니다. 잠시 후 다시 시도해 주세요.",
  onRetry,
  homeHref,
  homeLabel = "홈으로 이동",
  className,
}: NewsErrorStateProps) {
  return (
    <ErrorState
      title={title}
      description={description}
      className={className}
      action={
        <div className="flex flex-wrap items-center justify-center gap-2">
          {onRetry && (
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<RotateCw size={14} aria-hidden />}
              onClick={onRetry}
            >
              다시 시도
            </Button>
          )}
          {homeHref && (
            <LinkButton href={homeHref} variant="ghost" size="sm">
              {homeLabel}
            </LinkButton>
          )}
        </div>
      }
    />
  );
}
