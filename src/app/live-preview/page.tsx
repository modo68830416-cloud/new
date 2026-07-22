import type { Metadata } from "next";
import { LivePreviewContent } from "@/components/live-preview/live-preview-content";

/**
 * 개발용 실시간 속보 센터 / 트렌드 허브 미리보기 페이지 (TASK-008).
 *
 * 검수 전용 내부 페이지다. 검색 엔진 노출을 막아둔다.
 */
export const metadata: Metadata = {
  title: "실시간 속보 센터 미리보기",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LivePreviewPage() {
  return <LivePreviewContent />;
}
