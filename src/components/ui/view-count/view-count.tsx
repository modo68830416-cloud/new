import { forwardRef } from "react";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ViewCountProps } from "./view-count.types";

const numberFormatter = new Intl.NumberFormat("ko-KR");

export const ViewCount = forwardRef<HTMLSpanElement, ViewCountProps>(
  function ViewCount(
    { count, showIcon = true, label = "조회수", className, ...props },
    ref,
  ) {
    return (
      <span
        ref={ref}
        className={cn(
          "type-metadata inline-flex items-center gap-1",
          className,
        )}
        {...props}
      >
        {showIcon && <Eye size={14} aria-hidden />}
        <span className="sr-only">{label}</span>
        <span className="type-data-number">{numberFormatter.format(count)}</span>
      </span>
    );
  },
);
