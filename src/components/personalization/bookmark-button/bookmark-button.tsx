"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { useBookmarks } from "@/hooks/useBookmarks";
import { cn } from "@/lib/utils";

export interface BookmarkButtonProps {
  articleId: string;
  slug: string;
  /** 카드 안에서는 "sm", 상세 페이지 등 단독 사용 시 "md" */
  size?: "sm" | "md";
  /**
   * true면 아이콘 옆에 "북마크"/"저장됨" 텍스트를 함께 노출한다
   * (뉴스 상세 페이지 등 공간이 넉넉한 곳에서 사용).
   * false(기본값)면 아이콘 전용 버튼이지만, `aria-label`/`title`로
   * 접근 가능한 이름은 항상 제공한다.
   */
  showLabel?: boolean;
  className?: string;
}

/**
 * 뉴스 카드 · 상세 페이지 공용 북마크 토글 버튼 (TASK-011).
 *
 * 카드 안에서 쓰일 때는 `NewsCardLink`(TASK-007)가 만드는 stretched
 * link(`::after`, `z-content`)와 중첩된 인터랙티브 요소가 되지 않도록,
 * `NewsShareAction`(공유 버튼)과 동일한 패턴으로 `relative z-sticky`를
 * 적용해 stretched link보다 위 stacking context에서 독립적으로
 * 클릭되게 한다 — 실제 DOM에는 `<a>` 안에 `<button>`이 중첩되지 않는다
 * (카드 전체 링크는 카드당 `<a>` 1개만 유지).
 */
export function BookmarkButton({
  articleId,
  slug,
  size = "md",
  showLabel = false,
  className,
}: BookmarkButtonProps) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { showToast } = useToast();
  const bookmarked = isBookmarked(articleId);

  function handleClick() {
    const saved = toggleBookmark({ articleId, slug });
    showToast({
      title: saved ? "북마크에 저장했습니다" : "북마크를 해제했습니다",
      description: saved ? "저장한 뉴스에서 다시 확인할 수 있습니다." : undefined,
      tone: saved ? "success" : "info",
      durationMs: 3000,
    });
  }

  const label = bookmarked ? "북마크 해제" : "북마크에 저장";
  const Icon = bookmarked ? BookmarkCheck : Bookmark;

  if (showLabel) {
    return (
      <Button
        type="button"
        variant={bookmarked ? "secondary" : "outline"}
        size={size}
        aria-pressed={bookmarked}
        onClick={handleClick}
        leftIcon={<Icon size={16} aria-hidden />}
        className={cn("relative z-sticky", className)}
      >
        {bookmarked ? "저장됨" : "북마크"}
      </Button>
    );
  }

  return (
    <IconButton
      type="button"
      label={label}
      title={label}
      icon={<Icon size={size === "sm" ? 14 : 16} aria-hidden />}
      variant={bookmarked ? "primary" : "secondary"}
      size={size}
      aria-pressed={bookmarked}
      onClick={handleClick}
      className={cn("relative z-sticky", className)}
    />
  );
}
