"use client";

import { forwardRef, useState, type KeyboardEvent } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SearchInputProps } from "./search-input.types";

const SIZE_CLASSES: Record<NonNullable<SearchInputProps["size"]>, string> = {
  sm: "h-9 pl-9 pr-8 text-xs",
  md: "h-11 pl-10 pr-9 text-sm",
  lg: "h-13 pl-11 pr-10 text-base",
};

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  function SearchInput(
    {
      size = "md",
      onSearch,
      onClear,
      className,
      containerClassName,
      defaultValue,
      value: controlledValue,
      onChange,
      placeholder = "검색어를 입력하세요",
      ...props
    },
    ref,
  ) {
    const isControlled = controlledValue !== undefined;
    const [innerValue, setInnerValue] = useState(defaultValue ?? "");
    const value = isControlled ? controlledValue : innerValue;

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        onSearch?.(String(value ?? ""));
      }
    };

    const handleClear = () => {
      if (!isControlled) setInnerValue("");
      onClear?.();
    };

    return (
      <div className={cn("relative flex w-full items-center", containerClassName)}>
        <Search
          size={16}
          className="pointer-events-none absolute left-3 text-text-muted"
          aria-hidden
        />
        <input
          ref={ref}
          type="search"
          role="searchbox"
          value={isControlled ? controlledValue : innerValue}
          onChange={(event) => {
            if (!isControlled) setInnerValue(event.target.value);
            onChange?.(event);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            "w-full rounded-full border border-border-default bg-surface text-text-primary placeholder:text-text-muted",
            "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
            "hover:border-border-strong focus-visible:border-border-focus",
            "[&::-webkit-search-cancel-button]:appearance-none",
            SIZE_CLASSES[size],
            className,
          )}
          {...props}
        />
        {value ? (
          <button
            type="button"
            onClick={handleClear}
            aria-label="검색어 지우기"
            className="absolute right-1 inline-flex size-8 items-center justify-center rounded-full text-text-muted hover:bg-surface-elevated hover:text-text-primary"
          >
            <X size={14} aria-hidden />
          </button>
        ) : null}
      </div>
    );
  },
);
