"use client";

import { useState } from "react";
import { Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { TimeAgo } from "@/components/ui/time-ago";
import { HorizontalNewsCard, NewsEmptyState, NewsListSkeleton } from "@/components/news";
import { ClearDataDialog } from "@/components/personalization/clear-data-dialog";
import { useReadingHistory } from "@/hooks/useReadingHistory";
import { getArticleBySlug } from "@/data/mock-news";
import { cn } from "@/lib/utils";

export interface ReadingHistoryListProps {
  className?: string;
}

/**
 * `/history` 페이지의 본문 (TASK-011).
 *
 * `HorizontalNewsCard`(TASK-007)를 그대로 재사용하되, 삭제 버튼은 카드
 * 내부(stretched link 영역)가 아니라 카드 바깥의 형제 요소로 배치한다 —
 * `NewsCardLink`와 중첩된 인터랙티브 요소를 만들지 않는 가장 단순한
 * 방법이며, `BookmarkButton`이 쓰는 `z-sticky` 오버레이 패턴과는 달리
 * 애초에 stretched link 영역 밖에 있으므로 별도 stacking 처리가
 * 필요 없다.
 */
export function ReadingHistoryList({ className }: ReadingHistoryListProps) {
  const { history, count, isHydrated, removeEntry, clearAll } = useReadingHistory();
  const [confirmOpen, setConfirmOpen] = useState(false);

  if (!isHydrated) {
    return <NewsListSkeleton variant="horizontal" count={3} className={className} />;
  }

  const items = history.flatMap((entry) => {
    const article = getArticleBySlug(entry.slug);
    return article ? [{ entry, article }] : [];
  });

  if (items.length === 0) {
    return (
      <NewsEmptyState
        title="읽은 뉴스가 없습니다"
        description="기사를 열어보면 이곳에 최근 읽은 순서대로 기록됩니다."
        className={className}
      />
    );
  }

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex items-center justify-between gap-3">
        <p className="type-caption text-text-muted" aria-live="polite">
          읽은 뉴스 <strong className="text-text-primary">{count}</strong>건
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
          <li key={entry.articleId} className="flex items-start gap-2">
            <div className="min-w-0 flex-1">
              <p className="type-metadata mb-1 pl-1 text-text-muted">
                <TimeAgo date={entry.viewedAt} />에 읽음
              </p>
              <HorizontalNewsCard article={article} />
            </div>
            <IconButton
              label={`${article.title} 읽기 기록 삭제`}
              title="기록 삭제"
              icon={<X size={16} aria-hidden />}
              variant="ghost"
              size="sm"
              className="mt-6 shrink-0"
              onClick={() => removeEntry(entry.articleId)}
            />
          </li>
        ))}
      </ul>

      <ClearDataDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="읽기 기록 전체 삭제"
        description={`읽은 뉴스 ${count}건을 모두 삭제할까요?`}
        confirmLabel="전체 삭제"
        onConfirm={clearAll}
      />
    </div>
  );
}
