import { forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ButtonProps, ButtonSize, ButtonVariant } from "./button.types";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-accent-primary text-text-inverse border border-transparent hover:bg-accent-primary-strong active:bg-accent-primary-strong",
  secondary:
    "bg-surface-elevated text-text-primary border border-border-default hover:bg-surface-overlay hover:border-border-strong",
  outline:
    "bg-transparent text-text-primary border border-border-strong hover:bg-surface-elevated",
  ghost:
    "bg-transparent text-text-primary border border-transparent hover:bg-surface-elevated",
  danger:
    "bg-breaking text-text-inverse border border-transparent hover:bg-breaking-strong active:bg-breaking-strong",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-xs gap-1.5 rounded-sm",
  md: "h-11 px-5 text-sm gap-2 rounded-md",
  lg: "h-13 px-7 text-base gap-2.5 rounded-md",
};

/** 버튼/아이콘버튼/링크버튼이 공유하는 기본 클래스 조합 */
export function getButtonClassNames({
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
}): string {
  return cn(
    "touch-target inline-flex items-center justify-center whitespace-nowrap font-sans font-semibold tracking-normal transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
    "disabled:cursor-not-allowed",
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    fullWidth && "w-full",
    disabled && "pointer-events-none opacity-50",
    className,
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      className,
      children,
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
        disabled={isDisabled}
        aria-busy={isLoading || undefined}
        className={getButtonClassNames({
          variant,
          size,
          fullWidth,
          disabled: isDisabled,
          className,
        })}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="size-4 animate-spin" aria-hidden />
        ) : (
          leftIcon && (
            <span className="inline-flex shrink-0" aria-hidden>
              {leftIcon}
            </span>
          )
        )}
        {children}
        {!isLoading && rightIcon && (
          <span className="inline-flex shrink-0" aria-hidden>
            {rightIcon}
          </span>
        )}
      </button>
    );
  },
);
