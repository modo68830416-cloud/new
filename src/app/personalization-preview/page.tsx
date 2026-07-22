import type { Metadata } from "next";
import { PersonalizationPreviewContent } from "@/components/personalization-preview/personalization-preview-content";

/**
 * 개발용 개인화 기능 미리보기 페이지 (TASK-011).
 *
 * 운영 콘텐츠가 아니라 북마크 · 읽기 기록 · 다크모드 · 설정 컴포넌트
 * 검수를 위한 내부용 페이지다. 검색 엔진 노출을 막아두었다.
 */
export const metadata: Metadata = {
  title: "개인화 기능",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PersonalizationPreviewPage() {
  return <PersonalizationPreviewContent />;
}
