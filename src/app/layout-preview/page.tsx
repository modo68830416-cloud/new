import type { Metadata } from "next";
import { LayoutPreviewContent } from "@/components/layout-preview/layout-preview-content";

/**
 * 개발용 공통 레이아웃 미리보기 페이지 (TASK-005).
 *
 * Header / Navigation / Mobile Drawer / Breaking Ticker / Footer /
 * LayoutProvider 검수를 위한 내부용 페이지다. 검색 엔진 노출을 막아두었다.
 */
export const metadata: Metadata = {
  title: "레이아웃 미리보기",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LayoutPreviewPage() {
  return <LayoutPreviewContent />;
}
