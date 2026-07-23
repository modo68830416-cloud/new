import { Card } from "@/components/ui/card";
import { Surface } from "@/components/ui/surface";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export interface NewsCardSkeletonProps {
  className?: string;
}

/**
 * 카드별 loading skeleton (task-007.md 14절).
 *
 * 실제 카드와 동일한 종횡비/여백 구조를 사용해 콘텐츠가 도착했을 때
 * layout shift가 최소화되도록 한다.
 */
export function FeaturedNewsCardSkeleton({ className }: NewsCardSkeletonProps) {
  return (
    <Surface
      radius="lg"
      shadow="sm"
      className={cn("flex flex-col overflow-hidden md:flex-row", className)}
    >
      <Skeleton className="aspect-video w-full shrink-0 rounded-none md:w-1/2" />
      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-4/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="mt-auto h-4 w-1/2" />
      </div>
    </Surface>
  );
}

export function StandardNewsCardSkeleton({ className }: NewsCardSkeletonProps) {
  return (
    <Card padding="none" className={cn("flex h-full flex-col overflow-hidden", className)}>
      <Skeleton className="aspect-video w-full shrink-0 rounded-none" />
      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <Skeleton className="h-4 w-16 rounded-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/4" />
        {/* NewsCardGrid의 기본 카드 크기(medium)는 요약 2줄을 함께 보여준다
            (StandardNewsCard의 DEFAULT_SUMMARY_BY_SIZE) — 스켈레톤에도 같은
            높이를 확보해 실제 카드로 전환될 때 레이아웃이 덜컹이지 않게 한다. */}
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="mt-auto h-3.5 w-1/2" />
      </div>
    </Card>
  );
}

export function HorizontalNewsCardSkeleton({ className }: NewsCardSkeletonProps) {
  return (
    <Card padding="none" className={cn("flex overflow-hidden", className)}>
      <Skeleton className="w-28 shrink-0 rounded-none xs:w-36 sm:w-44" />
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 p-3 sm:p-4">
        <Skeleton className="h-4 w-16 rounded-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-3.5 w-1/3" />
      </div>
    </Card>
  );
}

export function CompactNewsCardSkeleton({ className }: NewsCardSkeletonProps) {
  return (
    <div className={cn("flex items-center gap-3 py-2.5", className)}>
      <div className="min-w-0 flex-1 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-3 w-1/3" />
      </div>
    </div>
  );
}
