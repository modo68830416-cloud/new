import type { Metadata } from "next";
import { ArticlePreviewContent } from "@/components/article-preview/article-preview-content";

/**
 * 개발용 카테고리/뉴스 상세 페이지 컴포넌트 미리보기 페이지 (TASK-009).
 *
 * 카테고리 페이지, 상세 페이지, TOC, Related, Author, Read Progress 검수를
 * 위한 내부용 페이지다. 검색 엔진 노출을 막아두었다.
 */
export const metadata: Metadata = {
  title: "카테고리·뉴스 상세 미리보기",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ArticlePreviewPage() {
  return <ArticlePreviewContent />;
}
