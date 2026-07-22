import { Divider } from "@/components/ui/divider";
import { cn } from "@/lib/utils";
import {
  CompactNewsCardSkeleton,
  HorizontalNewsCardSkeleton,
  StandardNewsCardSkeleton,
} from "./news-card-skeleton";
import type { NewsGridColumns } from "../news.types";

export type NewsListSkeletonVariant = "horizontal" | "compact";

export interface NewsListSkeletonProps {
  variant?: NewsListSkeletonVariant;
  count?: number;
  className?: string;
}

/** 리스트 컴포넌트(LatestNewsList, CompactNewsList 등)용 skeleton */
export function NewsListSkeleton({
  variant = "horizontal",
  count = 5,
  className,
}: NewsListSkeletonProps) {
  const SkeletonCard = variant === "compact" ? CompactNewsCardSkeleton : HorizontalNewsCardSkeleton;

  return (
    <div className={cn("flex flex-col", variant === "horizontal" && "gap-3", className)}>
      {Array.from({ length: count }, (_, index) => (
        <div key={index}>
          <SkeletonCard />
          {index < count - 1 && variant === "compact" && <Divider />}
        </div>
      ))}
    </div>
  );
}

const GRID_COLUMN_CLASSES: Record<NewsGridColumns, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export interface NewsGridSkeletonProps {
  columns?: NewsGridColumns;
  count?: number;
  className?: string;
}

/** NewsCardGrid 등 그리드 컴포넌트용 skeleton */
export function NewsGridSkeleton({ columns = 3, count = 6, className }: NewsGridSkeletonProps) {
  return (
    <div className={cn("grid grid-cols-1 gap-4 sm:gap-5", GRID_COLUMN_CLASSES[columns], className)}>
      {Array.from({ length: count }, (_, index) => (
        <StandardNewsCardSkeleton key={index} />
      ))}
    </div>
  );
}
