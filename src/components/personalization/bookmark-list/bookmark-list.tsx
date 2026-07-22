"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HorizontalNewsCard, NewsEmptyState, NewsListSkeleton } from "@/components/news";
import { ClearDataDialog } from "@/components/personalization/clear-data-dialog";
import { useBookmarks } from "@/hooks/useBookmarks";
import { getArticleBySlug } from "@/data/mock-news";
import { cn } from "@/lib/utils";

export interface BookmarkListProps {
  className?: string;
}

/**
 * `/bookmarks` 페이지의 본문 (TASK-011).
 *
 * 저장된 `BookmarkEntry[]`를 mock 데이터(`getArticleBySlug`)와 매칭해
 * TASK-007의 `HorizontalNewsCard`로 그대로 렌더링한다 — 카드 시스템을
 * 새로 만들지 않고 재사용한다. 데스크톱/모바일 모두 단일 열 리스트로
 * 보여준다(요구되는 "카드 그리드 또는 리스트" 중 리스트 형태).
 */
export function BookmarkList({ className }: BookmarkListProps) {
  const { bookmarks, count, isHydrated, clearAll } = useBookmarks();
  const [confirmOpen, setConfirmOpen] = useState(false);

  if (!isHydrated) {
    return <NewsListSkeleton variant="horizontal" count={3} className={className} />;
  }

  const items = bookmarks.flatMap((entry) => {
    const article = getArticleBySlug(entry.slug);
    return article ? [{ entry, article }] : [];
  });

  if (items.length === 0) {
    return (
      <NewsEmptyState
        title="저장한 뉴스가 없습니다"
        description="관심 있는 기사의 북마크 버튼을 눌러 이곳에 모아보세요."
        className={className}
      />
    );
  }

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex items-center justify-between gap-3">
        <p className="type-caption text-text-muted" aria-live="polite">
          저장한 뉴스 <strong className="text-text-primary">{count}</strong>건
        </p>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          leftIcon={<Trash2 size={14} aria-hidden />}
          onClick={() => setConfirmOpen(true)}
        >
          전체 삭제
        </Button>
      </div>

      <ul className="flex flex-col gap-3">
        {items.map(({ entry, article }) => (
          <li key={entry.articleId}>
            <HorizontalNewsCard article={article} />
          </li>
        ))}
      </ul>

      <ClearDataDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="북마크 전체 삭제"
        description={`저장한 뉴스 ${count}건을 모두 삭제할까요?`}
        confirmLabel="전체 삭제"
        onConfirm={clearAll}
      />
    </div>
  );
}
