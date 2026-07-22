import { forwardRef } from "react";
import { ServerCrash } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ErrorStateProps } from "./error-state.types";

/** 데이터 로드 실패 등 오류 상태. role="alert"로 스크린 리더에 즉시 알린다 */
export const ErrorState = forwardRef<HTMLDivElement, ErrorStateProps>(
  function ErrorState(
    {
      icon,
      title = "문제가 발생했습니다",
      description = "잠시 후 다시 시도해 주세요.",
      action,
      className,
      ...props
    },
    ref,
  ) {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "flex flex-col items-center gap-3 rounded-md border border-border-breaking bg-surface px-6 py-12 text-center",
          className,
        )}
        {...props}
      >
        <span className="text-breaking" aria-hidden>
          {icon ?? <ServerCrash size={32} />}
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
