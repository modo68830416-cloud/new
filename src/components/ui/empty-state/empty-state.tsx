import { forwardRef } from "react";
import { Inbox } from "lucide-react";
import { cn } from "@/lib/utils";
import type { EmptyStateProps } from "./empty-state.types";

/** 검색 결과 없음, 목록 비어있음 등 중립적인 빈 상태 */
export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  function EmptyState(
    { icon, title, description, action, className, ...props },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center gap-3 rounded-md border border-dashed border-border-default bg-surface px-6 py-12 text-center",
          className,
        )}
        {...props}
      >
        <span className="text-text-muted" aria-hidden>
          {icon ?? <Inbox size={32} />}
        </span>
        <p className="type-card-title">{title}</p>
        {description && (
          <p className="type-caption max-w-prose">{description}</p>
        )}
        {action && <div className="mt-2">{action}</div>}
      </div>
    );
  },
);
