import { cn } from "@/lib/utils";
import { designSystemConfig } from "@/config/design-system";
import type { NewsCategory } from "@/types/news";

export interface CategoryHeaderProps {
  category: NewsCategory;
  className?: string;
}

/**
 * 카테고리 메인 페이지 상단 — 카테고리 제목과 설명 (TASK-009).
 * 카드 시스템(`CategorySection`)이 사용하는 것과 동일한 카테고리 색상
 * 토큰(TASK-002)을 재사용해 시각적 일관성을 유지한다.
 */
export function CategoryHeader({ category, className }: CategoryHeaderProps) {
  const colorToken = designSystemConfig.categoryColors.find((item) => item.slug === category.slug);

  return (
    <header className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-center gap-2.5">
        <span
          aria-hidden
          className="size-3 shrink-0 rounded-full"
          style={colorToken ? { backgroundColor: `var(${colorToken.cssVar})` } : undefined}
        />
        <h1 className="type-page-title">{category.name}</h1>
      </div>
      {category.description && (
        <p className="type-body max-w-prose text-text-secondary">{category.description}</p>
      )}
    </header>
  );
}
