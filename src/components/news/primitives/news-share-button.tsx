"use client";

import { useShareArticle } from "@/hooks/useShareArticle";
import { siteConfig } from "@/config/site";
import { NewsShareAction } from "./news-actions";
import type { NewsArticle } from "@/types/news";

export interface NewsShareButtonProps {
  article: NewsArticle;
  className?: string;
}

/**
 * TASK-016 — 뉴스 카드의 공유 버튼.
 *
 * `NewsShareAction`(TASK-007)은 카드 전체 링크(stretched link) 위에서
 * 독립적으로 클릭되도록 stacking 처리만 담당하는 순수 UI primitive다. 이
 * 컴포넌트가 `BookmarkButton`(TASK-011)과 동일한 역할 분담으로 실제 공유
 * 동작(`useShareArticle`, TASK-014 — Web Share API 우선, 클립보드 복사
 * 폴백, 결과 Toast 포함)을 연결한다.
 */
export function NewsShareButton({ article, className }: NewsShareButtonProps) {
  const { share } = useShareArticle();

  function handleShare() {
    share({
      title: article.title,
      url: `${siteConfig.siteUrl}/news/${article.slug}`,
    });
  }

  return <NewsShareAction onShare={handleShare} className={className} />;
}
