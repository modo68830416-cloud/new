import { forwardRef, useId } from "react";
import { cn } from "@/lib/utils";
import type { InputProps } from "./input.types";

const SIZE_CLASSES: Record<NonNullable<InputProps["size"]>, string> = {
  sm: "h-9 px-3 text-xs",
  md: "h-11 px-3.5 text-sm",
  lg: "h-13 px-4 text-base",
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    helperText,
    errorText,
    leftIcon,
    rightIcon,
    size = "md",
    id,
    className,
    containerClassName,
    disabled,
    required,
    "aria-describedby": ariaDescribedBy,
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = helperText ? `${inputId}-helper` : undefined;
  const errorId = errorText ? `${inputId}-error` : undefined;
  const describedBy =
    [ariaDescribedBy, helperId, errorId].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div className={cn("flex w-full flex-col gap-1.5", containerClassName)}>
      {label && (
        <label
          htmlFor={inputId}
          className="type-caption text-text-secondary"
        >
          {label}
          {required && (
            <span className="ml-0.5 text-breaking" aria-hidden>
              *
            </span>
          )}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && (
          <span
            className="pointer-events-none absolute left-3 inline-flex text-text-muted"
            aria-hidden
          >
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          required={required}
          aria-invalid={Boolean(errorText) || undefined}
          aria-describedby={describedBy}
          className={cn(
            "w-full rounded-md border border-border-default bg-surface text-text-primary placeholder:text-text-muted",
            "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
            "hover:border-border-strong",
            "focus-visible:border-border-focus",
            "disabled:cursor-not-allowed disabled:opacity-50",
            errorText && "border-breaking hover:border-breaking",
            leftIcon && "pl-9",
            rightIcon && "pr-9",
            SIZE_CLASSES[size],
            className,
          )}
          {...props}
        />
        {rightIcon && (
          <span
            className="pointer-events-none absolute right-3 inline-flex text-text-muted"
            aria-hidden
          >
            {rightIcon}
          </span>
        )}
      </div>
      {errorText ? (
        <p id={errorId} className="type-caption text-breaking" role="alert">
          {errorText}
        </p>
      ) : helperText ? (
        <p id={helperId} className="type-caption">
          {helperText}
        </p>
      ) : null}
    </div>
  );
});
