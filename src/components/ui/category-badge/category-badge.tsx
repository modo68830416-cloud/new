import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { designSystemConfig } from "@/config/design-system";
import type { CategoryBadgeProps, CategoryBadgeSize } from "./category-badge.types";

const SIZE_CLASSES: Record<CategoryBadgeSize, string> = {
  sm: "h-5 px-2 text-xs",
  md: "h-6 px-2.5 text-xs",
};

/** 카테고리 slug에 매핑된 토큰 색상을 사용하는 배지 */
export const CategoryBadge = forwardRef<HTMLSpanElement, CategoryBadgeProps>(
  function CategoryBadge(
    { category, size = "md", useShortName = false, className, ...props },
    ref,
  ) {
    const token = designSystemConfig.categoryColors.find(
      (c) => c.slug === category.slug,
    );
    const label = (useShortName && category.shortName) || category.name;

    return (
      <span
        ref={ref}
        className={cn(
          "type-label inline-flex w-fit items-center rounded-full text-text-inverse",
          !token && "bg-surface-overlay",
          SIZE_CLASSES[size],
          className,
        )}
        style={token ? { backgroundColor: `var(${token.cssVar})` } : undefined}
        {...props}
      >
        {label}
      </span>
    );
  },
);
