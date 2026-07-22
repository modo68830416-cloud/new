import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PaginationPlaceholderProps {
  /** 표시만 하는 mock 전체 페이지 수. 기본 3 */
  pageCount?: number;
  /** 표시만 하는 mock 현재 페이지. 기본 1 */
  currentPage?: number;
  className?: string;
}

/**
 * 페이지네이션 자리(UI 전용) — TASK-009.
 *
 * 실제 페이지 이동 기능은 구현하지 않는다(다음 Task 범위). 버튼은
 * 시각적으로만 존재하며 `aria-disabled`로 비활성 의도를 알리고, 현재
 * 페이지에는 `aria-current="page"`를 지정한다.
 */
export function PaginationPlaceholder({
  pageCount = 3,
  currentPage = 1,
  className,
}: PaginationPlaceholderProps) {
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <nav aria-label="페이지네이션" className={cn("flex items-center justify-center gap-1.5", className)}>
      <button
        type="button"
        aria-disabled="true"
        title="이전 페이지 (준비 중)"
        disabled
        className="touch-target inline-flex size-9 items-center justify-center rounded-md border border-border-default text-text-muted disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronLeft size={16} aria-hidden />
        <span className="sr-only">이전 페이지</span>
      </button>

      {pages.map((page) => {
        const isCurrent = page === currentPage;
        return (
          <button
            key={page}
            type="button"
            aria-current={isCurrent ? "page" : undefined}
            aria-disabled={!isCurrent ? "true" : undefined}
            disabled={!isCurrent}
            title={isCurrent ? undefined : "준비 중"}
            className={cn(
              "touch-target type-caption inline-flex size-9 items-center justify-center rounded-md border font-semibold",
              isCurrent
                ? "border-accent-primary bg-accent-primary text-text-inverse"
                : "border-border-default text-text-secondary disabled:cursor-not-allowed disabled:opacity-50",
            )}
          >
            {page}
          </button>
        );
      })}

      <button
        type="button"
        aria-disabled="true"
        title="다음 페이지 (준비 중)"
        disabled
        className="touch-target inline-flex size-9 items-center justify-center rounded-md border border-border-default text-text-muted disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronRight size={16} aria-hidden />
        <span className="sr-only">다음 페이지</span>
      </button>
    </nav>
  );
}
