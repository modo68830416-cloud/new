import { forwardRef, useId } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SelectProps } from "./select.types";

const SIZE_CLASSES: Record<NonNullable<SelectProps["size"]>, string> = {
  sm: "h-9 pl-3 pr-8 text-xs",
  md: "h-11 pl-3.5 pr-9 text-sm",
  lg: "h-13 pl-4 pr-10 text-base",
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    {
      label,
      helperText,
      errorText,
      options,
      placeholder,
      size = "md",
      id,
      className,
      containerClassName,
      required,
      disabled,
      defaultValue,
      value,
      "aria-describedby": ariaDescribedBy,
      ...props
    },
    ref,
  ) {
    const generatedId = useId();
    const selectId = id ?? generatedId;
    const helperId = helperText ? `${selectId}-helper` : undefined;
    const errorId = errorText ? `${selectId}-error` : undefined;
    const resolvedDefaultValue =
      value === undefined
        ? (defaultValue ?? (placeholder ? "" : undefined))
        : undefined;
    const describedBy =
      [ariaDescribedBy, helperId, errorId].filter(Boolean).join(" ") ||
      undefined;

    return (
      <div className={cn("flex w-full flex-col gap-1.5", containerClassName)}>
        {label && (
          <label htmlFor={selectId} className="type-caption text-text-secondary">
            {label}
            {required && (
              <span className="ml-0.5 text-breaking" aria-hidden>
                *
              </span>
            )}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            required={required}
            disabled={disabled}
            aria-invalid={Boolean(errorText) || undefined}
            aria-describedby={describedBy}
            defaultValue={resolvedDefaultValue}
            value={value}
            className={cn(
              "w-full appearance-none rounded-md border border-border-default bg-surface text-text-primary",
              "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
              "hover:border-border-strong focus-visible:border-border-focus",
              "disabled:cursor-not-allowed disabled:opacity-50",
              errorText && "border-breaking hover:border-breaking",
              SIZE_CLASSES[size],
              className,
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-text-muted"
            aria-hidden
          />
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
  },
);
