import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { SubSection } from "@/components/ui-preview/section";

export function SkeletonSpinnerPreview() {
  return (
    <>
      <SubSection title="Skeleton — shimmer / pulse">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <p className="type-metadata mb-2 text-text-muted">shimmer (기본)</p>
            <div className="rounded-md border border-border-default bg-surface p-4">
              <Skeleton height={120} className="mb-3" />
              <Skeleton height={14} className="mb-2" />
              <Skeleton height={14} width="70%" />
            </div>
          </div>
          <div>
            <p className="type-metadata mb-2 text-text-muted">pulse</p>
            <div className="rounded-md border border-border-default bg-surface p-4">
              <Skeleton height={120} className="skeleton-pulse mb-3" />
              <Skeleton height={14} className="skeleton-pulse mb-2" />
              <Skeleton height={14} width="70%" className="skeleton-pulse" />
            </div>
          </div>
        </div>
      </SubSection>

      <SubSection title="Spinner">
        <div className="flex items-center gap-6">
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
        </div>
      </SubSection>
    </>
  );
}
