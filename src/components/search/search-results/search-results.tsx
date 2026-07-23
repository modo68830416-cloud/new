import { PaginationPlaceholder } from "@/components/category";
import { NewsCardGrid, type NewsGridColumns } from "@/components/news";
import type { NewsArticle } from "@/types/news";
import { cn } from "@/lib/utils";
import { HighlightText } from "./highlight-text";

export interface SearchResultsProps {
  query: string;
  articles: NewsArticle[];
  columns?: NewsGridColumns;
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  className?: string;
}

/**
 * 검색 결과 (TASK-010).
 *
 * - 결과 개수 + 검색어 강조(`HighlightText`)를 헤더에 표시한다.
 * - 실제 카드 렌더링은 TASK-007 `NewsCardGrid`를 그대로 재사용한다 —
 *   Loading/Empty/Error 상태도 `NewsCardGrid` 내부의 공통 상태 컴포넌트가
 *   처리한다.
 * - 하단 페이지네이션은 UI 자리만 제공한다(TASK-009 `PaginationPlaceholder`
 *   재사용, 실제 페이지 이동 없음).
 */
export function SearchResults({
  query,
  articles,
  columns = 3,
  isLoading = false,
  error = null,
  onRetry,
  className,
}: SearchResultsProps) {
  const trimmed = query.trim();

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <p className="type-body text-text-secondary" role="status" aria-live="polite">
        {isLoading ? (
          <>
            {trimmed ? (
              <HighlightText
                text={`"${trimmed}"`}
                query={trimmed}
                className="font-semibold text-text-primary"
              />
            ) : (
              "전체 검색 결과"
            )}
            를 불러오는 중입니다…
          </>
        ) : (
          <>
            {trimmed ? (
              <>
                <HighlightText
                  text={`"${trimmed}"`}
                  query={trimmed}
                  className="font-semibold text-text-primary"
                />
                에 대한 검색 결과{" "}
              </>
            ) : (
              "전체 검색 결과 "
            )}
            <strong className="type-card-title text-text-primary">
              {articles.length.toLocaleString()}
            </strong>
            건
          </>
        )}
      </p>

      <NewsCardGrid
        articles={articles}
        columns={columns}
        isLoading={isLoading}
        error={error}
        onRetry={onRetry}
      />

      {!isLoading && !error && articles.length > 0 && <PaginationPlaceholder />}
    </div>
  );
}
