import {
  NewsEmptyState,
  NewsErrorState,
  NewsGridSkeleton,
  type NewsGridColumns,
} from "@/components/news";

/**
 * 검색 상태(Loading/Empty/Error) — TASK-010.
 *
 * TASK-007의 공통 상태 컴포넌트(`NewsEmptyState`/`NewsErrorState`/
 * `NewsGridSkeleton`)를 검색 문구로 감싼 얇은 래퍼일 뿐이며, 렌더링 로직을
 * 새로 만들지 않는다. `SearchResults`(내부적으로 `NewsCardGrid` 사용)에서
 * 이미 자동으로 처리되지만, `/search-preview`에서 각 상태를 개별적으로
 * 검수할 수 있도록 별도로 노출한다.
 */

export interface SearchEmptyStateProps {
  query?: string;
  className?: string;
}

export function SearchEmptyState({ query, className }: SearchEmptyStateProps) {
  const trimmed = query?.trim();
  return (
    <NewsEmptyState
      title={trimmed ? `"${trimmed}"에 대한 검색 결과가 없습니다.` : "검색 결과가 없습니다."}
      description="다른 검색어를 입력하거나 필터 조건을 완화해 보세요."
      actionHref="/search"
      actionLabel="검색 초기화"
      className={className}
    />
  );
}

export interface SearchErrorStateProps {
  onRetry?: () => void;
  className?: string;
}

export function SearchErrorState({ onRetry, className }: SearchErrorStateProps) {
  return (
    <NewsErrorState
      title="검색 결과를 불러오지 못했습니다."
      description="일시적인 문제일 수 있습니다. 잠시 후 다시 시도해 주세요."
      onRetry={onRetry}
      homeHref="/search"
      homeLabel="검색으로 돌아가기"
      className={className}
    />
  );
}

export interface SearchLoadingStateProps {
  columns?: NewsGridColumns;
  count?: number;
  className?: string;
}

export function SearchLoadingState({ columns = 3, count, className }: SearchLoadingStateProps) {
  return <NewsGridSkeleton columns={columns} count={count} className={className} />;
}
