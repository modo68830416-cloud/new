import { Skeleton } from "@/components/ui/skeleton";
import { FeaturedNewsCardSkeleton, NewsGridSkeleton, NewsListSkeleton } from "@/components/news";

/**
 * TASK-012 — 카테고리 페이지가 서비스 계층(`fetchArticlesByCategory` 등)을
 * 통해 데이터를 조회하는 동안 보여줄 스켈레톤. 실제 페이지와 같은 영역
 * 구성(주요 뉴스 → 최신 뉴스 → 인기 뉴스)을 따른다.
 */
export default function CategoryLoading() {
  return (
    <div className="container-dashboard flex flex-col gap-12 py-8 lg:py-12">
      <div className="flex flex-col gap-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-9 w-64" />
      </div>

      <div className="flex flex-col gap-4">
        <Skeleton className="h-6 w-32" />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <FeaturedNewsCardSkeleton />
          <NewsGridSkeleton columns={2} count={4} />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Skeleton className="h-6 w-32" />
        <NewsListSkeleton count={6} />
      </div>

      <div className="max-w-md">
        <NewsListSkeleton variant="compact" count={5} />
      </div>
    </div>
  );
}
