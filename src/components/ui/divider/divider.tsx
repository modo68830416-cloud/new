import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import type { DividerProps } from "./divider.types";

export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  function Divider(
    { orientation = "horizontal", label, className, ...props },
    ref,
  ) {
    if (orientation === "vertical") {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation="vertical"
          className={cn("h-full w-px self-stretch bg-border-default", className)}
          {...props}
        />
      );
    }

    if (label) {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation="horizontal"
          className={cn(
            "flex w-full items-center gap-3 text-text-muted",
            className,
          )}
          {...props}
        >
          <span className="h-px flex-1 bg-border-default" aria-hidden />
          <span className="type-metadata shrink-0">{label}</span>
          <span className="h-px flex-1 bg-border-default" aria-hidden />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation="horizontal"
        className={cn("h-px w-full bg-border-default", className)}
        {...props}
      />
    );
  },
);
