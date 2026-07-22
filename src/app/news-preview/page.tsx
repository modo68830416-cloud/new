import type { Metadata } from "next";
import { NewsPreviewContent } from "@/components/news-preview/news-preview-content";

/**
 * 개발용 뉴스 카드 시스템 미리보기 페이지 (TASK-007).
 *
 * 카드/리스트/그리드/섹션/상태 검수를 위한 내부용 페이지다. 검색 엔진
 * 노출을 막아두었다.
 */
export const metadata: Metadata = {
  title: "뉴스 카드 미리보기",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NewsPreviewPage() {
  return <NewsPreviewContent />;
}
