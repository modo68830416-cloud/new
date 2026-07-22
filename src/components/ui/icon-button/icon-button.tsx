import { forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { getButtonClassNames } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { IconButtonProps } from "./icon-button.types";
import type { ButtonSize } from "@/components/ui/button";

const ICON_ONLY_SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "h-9 w-9 rounded-sm",
  md: "h-11 w-11 rounded-md",
  lg: "h-13 w-13 rounded-md",
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    {
      label,
      icon,
      variant = "secondary",
      size = "md",
      isLoading = false,
      disabled,
      className,
      type = "button",
      ...props
    },
    ref,
  ) {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        aria-label={label}
        title={label}
        disabled={isDisabled}
        aria-busy={isLoading || undefined}
        className={cn(
          getButtonClassNames({ variant, disabled: isDisabled }),
          "px-0",
          ICON_ONLY_SIZE_CLASSES[size],
          className,
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="size-4 animate-spin" aria-hidden />
        ) : (
          <span className="inline-flex" aria-hidden>
            {icon}
          </span>
        )}
      </button>
    );
  },
);
