import Link from "next/link";
import { cn } from "@/lib/utils";
import type { TagSummary } from "@/data/mock-search";

export interface TagFilterProps {
  tags: TagSummary[];
  /** 현재 보고 있는 태그(있으면 강조하고 `aria-current="page"`를 지정한다) */
  activeTag?: string;
  label?: string;
  className?: string;
}

/**
 * 태그 시스템 (TASK-010). 태그 칩을 클릭하면 `/tag/[slug]`로 이동한다.
 * slug는 별도 인코딩 필드 없이 태그 문자열 자체를 사용한다
 * (`NewsArticle.tags: string[]`을 그대로 활용, TASK-001 타입 변경 없음).
 */
export function TagFilter({ tags, activeTag, label = "태그", className }: TagFilterProps) {
  if (tags.length === 0) return null;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && <p className="type-caption text-text-muted">{label}</p>}
      <ul className="flex flex-wrap gap-2" aria-label={label}>
        {tags.map((item) => {
          const isActive = item.tag === activeTag;
          return (
            <li key={item.slug}>
              <Link
                href={`/tag/${encodeURIComponent(item.slug)}`}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "type-label inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 whitespace-nowrap transition-colors",
                  "focus-visible:outline-2 focus-visible:outline-offset-2",
                  isActive
                    ? "border-accent-primary bg-accent-primary text-text-inverse"
                    : "border-border-default text-text-secondary hover:border-border-strong hover:bg-surface-elevated",
                )}
              >
                <span>#{item.tag}</span>
                {item.count > 0 && (
                  <span className={cn("text-xs", isActive ? "text-text-inverse/80" : "text-text-muted")}>
                    {item.count}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
