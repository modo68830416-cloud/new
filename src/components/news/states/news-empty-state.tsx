import { Newspaper } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { LinkButton } from "@/components/ui/link-button";

export interface NewsEmptyStateProps {
  title?: string;
  description?: string;
  /** 다른 카테고리 등으로 이동할 수 있는 선택적 링크 */
  actionHref?: string;
  actionLabel?: string;
  className?: string;
}

/**
 * 뉴스가 없는 경우 사용하는 공통 empty 상태 (task-007.md 15절).
 * `@/components/ui/empty-state`(TASK-003)를 뉴스 문구로 감싼 것뿐이다.
 */
export function NewsEmptyState({
  title = "아직 등록된 뉴스가 없습니다.",
  description = "새로운 소식이 업데이트되면 이곳에 표시됩니다.",
  actionHref,
  actionLabel = "다른 카테고리 보기",
  className,
}: NewsEmptyStateProps) {
  return (
    <EmptyState
      icon={<Newspaper size={32} />}
      title={title}
      description={description}
      action={
        actionHref ? (
          <LinkButton href={actionHref} variant="secondary" size="sm">
            {actionLabel}
          </LinkButton>
        ) : undefined
      }
      className={className}
    />
  );
}
