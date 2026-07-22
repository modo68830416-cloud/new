import { Skeleton } from "@/components/ui/skeleton";
import { NewsListSkeleton } from "@/components/news";

/** TASK-012 — 뉴스 상세 페이지가 `fetchArticleBySlug`를 조회하는 동안의 스켈레톤 */
export default function NewsDetailLoading() {
  return (
    <div className="container-dashboard grid grid-cols-1 gap-10 py-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start lg:py-12">
      <div className="flex max-w-[44rem] flex-col gap-6">
        <Skeleton className="h-4 w-20 rounded-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-4 w-40" />
        <Skeleton className="aspect-video w-full" />
        <div className="flex flex-col gap-3">
          {Array.from({ length: 6 }, (_, index) => (
            <Skeleton key={index} className="h-4 w-full" />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Skeleton className="h-6 w-24" />
        <NewsListSkeleton variant="compact" count={4} />
      </div>
    </div>
  );
}
