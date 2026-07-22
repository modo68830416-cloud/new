import { Skeleton } from "@/components/ui/skeleton";
import { NewsGridSkeleton } from "@/components/news";

/** TASK-012 — 태그 페이지가 `fetchArticlesByTagSlug`를 조회하는 동안의 스켈레톤 */
export default function TagLoading() {
  return (
    <div className="container-dashboard flex flex-col gap-8 py-8 lg:py-12">
      <div className="flex flex-col gap-3">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-4 w-32" />
      </div>

      <NewsGridSkeleton columns={3} count={9} />
    </div>
  );
}
