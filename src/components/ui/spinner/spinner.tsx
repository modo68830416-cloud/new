import { forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SpinnerProps, SpinnerSize } from "./spinner.types";

const SIZE_PX: Record<SpinnerSize, number> = {
  sm: 16,
  md: 24,
  lg: 32,
};

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
  function Spinner({ size = "md", label = "로딩 중", className, ...props }, ref) {
    return (
      <span
        ref={ref}
        role="status"
        className={cn("inline-flex items-center justify-center text-accent-primary", className)}
        {...props}
      >
        <Loader2 size={SIZE_PX[size]} className="animate-spin" aria-hidden />
        <span className="sr-only">{label}</span>
      </span>
    );
  },
);
