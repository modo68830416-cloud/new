import type { Metadata } from "next";
import { SearchPreviewContent } from "@/components/search-preview/search-preview-content";

/**
 * 개발용 검색/필터/태그/아카이브 UI 미리보기 페이지 (TASK-010).
 *
 * Search Box, Suggestions, Filters, Results, Tags, Archive 검수를 위한
 * 내부용 페이지다. 검색 엔진 노출을 막아두었다.
 */
export const metadata: Metadata = {
  title: "검색 UI 미리보기",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SearchPreviewPage() {
  return <SearchPreviewContent />;
}
