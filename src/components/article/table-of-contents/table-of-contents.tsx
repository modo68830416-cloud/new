"use client";

import { useMemo } from "react";
import { List } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import type { ArticleHeadingBlock } from "@/types/news";

export interface TableOfContentsProps {
  headings: ArticleHeadingBlock[];
  className?: string;
}

/**
 * 기사 본문 Heading 기반 목차 (TASK-009).
 *
 * `nav` 랜드마크로 감싸고, 현재 스크롤 위치에 해당하는 섹션에는
 * `aria-current="location"`을 지정해 시각적 강조와 접근성을 함께
 * 제공한다.
 */
export function TableOfContents({ headings, className }: TableOfContentsProps) {
  const ids = useMemo(() => headings.map((heading) => heading.id), [headings]);
  const activeId = useScrollSpy(ids);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="목차" className={cn("flex flex-col gap-3", className)}>
      <p className="type-caption flex items-center gap-1.5 text-text-muted">
        <List size={14} aria-hidden />
        목차
      </p>
      <ol className="flex flex-col gap-1 border-l border-border-default pl-3">
        {headings.map((heading) => {
          const isActive = heading.id === activeId;
          return (
            <li key={heading.id} className={heading.level === 3 ? "pl-3" : undefined}>
              <a
                href={`#${heading.id}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "type-caption -ml-px block border-l-2 border-transparent py-1 pl-3 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
                  isActive
                    ? "border-accent-primary font-semibold text-accent-primary"
                    : "text-text-secondary hover:text-text-primary",
                )}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
