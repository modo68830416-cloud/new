import type { Metadata } from "next";
import { UiPreviewContent } from "@/components/ui-preview/ui-preview-content";

/**
 * 개발용 UI 컴포넌트 미리보기 페이지 (TASK-003).
 *
 * 운영 콘텐츠가 아니라 공통 컴포넌트 라이브러리 검수를 위한 내부용
 * 페이지다. 검색 엔진 노출을 막아두었다.
 */
export const metadata: Metadata = {
  title: "UI 컴포넌트",
  robots: {
    index: false,
    follow: false,
  },
};

export default function UiPreviewPage() {
  return <UiPreviewContent />;
}
