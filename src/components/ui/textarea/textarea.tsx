import { forwardRef, useId } from "react";
import { cn } from "@/lib/utils";
import type { TextareaProps } from "./textarea.types";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      label,
      helperText,
      errorText,
      id,
      className,
      containerClassName,
      required,
      rows = 4,
      "aria-describedby": ariaDescribedBy,
      ...props
    },
    ref,
  ) {
    const generatedId = useId();
    const textareaId = id ?? generatedId;
    const helperId = helperText ? `${textareaId}-helper` : undefined;
    const errorId = errorText ? `${textareaId}-error` : undefined;
    const describedBy =
      [ariaDescribedBy, helperId, errorId].filter(Boolean).join(" ") ||
      undefined;

    return (
      <div className={cn("flex w-full flex-col gap-1.5", containerClassName)}>
        {label && (
          <label htmlFor={textareaId} className="type-caption text-text-secondary">
            {label}
            {required && (
              <span className="ml-0.5 text-breaking" aria-hidden>
                *
              </span>
            )}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          required={required}
          aria-invalid={Boolean(errorText) || undefined}
          aria-describedby={describedBy}
          className={cn(
            "w-full resize-y rounded-md border border-border-default bg-surface px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted",
            "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
            "hover:border-border-strong focus-visible:border-border-focus",
            "disabled:cursor-not-allowed disabled:opacity-50",
            errorText && "border-breaking hover:border-breaking",
            className,
          )}
          {...props}
        />
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
  },
);
