import { forwardRef, useEffect, useId, useRef } from "react";
import type { Ref, RefCallback } from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CheckboxProps } from "./checkbox.types";

function mergeRefs<T>(...refs: Array<Ref<T> | undefined>): RefCallback<T> {
  return (node) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === "function") ref(node);
      else (ref as { current: T | null }).current = node;
    });
  };
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    { label, helperText, indeterminate = false, id, className, disabled, ...props },
    ref,
  ) {
    const innerRef = useRef<HTMLInputElement>(null);
    const generatedId = useId();
    const checkboxId = id ?? generatedId;
    const helperId = helperText ? `${checkboxId}-helper` : undefined;

    useEffect(() => {
      if (innerRef.current) innerRef.current.indeterminate = indeterminate;
    }, [indeterminate]);

    return (
      <div className="flex flex-col gap-1">
        <label
          htmlFor={checkboxId}
          className={cn(
            "inline-flex items-center gap-2 type-body",
            disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
          )}
        >
          <span className="relative inline-flex size-5 shrink-0 items-center justify-center">
            <input
              ref={mergeRefs(ref, innerRef)}
              type="checkbox"
              id={checkboxId}
              disabled={disabled}
              aria-describedby={helperId}
              className={cn(
                "peer size-5 shrink-0 appearance-none rounded-sm border border-border-strong bg-surface",
                "transition-colors duration-[var(--duration-instant)] ease-[var(--ease-standard)]",
                "checked:border-accent-primary checked:bg-accent-primary",
                "indeterminate:border-accent-primary indeterminate:bg-accent-primary",
                "disabled:cursor-not-allowed",
                className,
              )}
              {...props}
            />
            <Check
              size={14}
              strokeWidth={3}
              aria-hidden
              className="pointer-events-none absolute hidden text-text-inverse peer-checked:block peer-indeterminate:hidden"
            />
            <Minus
              size={14}
              strokeWidth={3}
              aria-hidden
              className="pointer-events-none absolute hidden text-text-inverse peer-indeterminate:block"
            />
          </span>
          {label && <span>{label}</span>}
        </label>
        {helperText && (
          <p id={helperId} className="type-caption pl-7">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);
