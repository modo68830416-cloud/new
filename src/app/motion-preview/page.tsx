import type { Metadata } from "next";
import { MotionPreviewContent } from "@/components/motion-preview/motion-preview-content";

/**
 * 개발용 모션 시스템 미리보기 페이지 (TASK-004).
 *
 * 운영 콘텐츠가 아니라 인터랙션/애니메이션 시스템 검수를 위한 내부용
 * 페이지다. 검색 엔진 노출을 막아두었다.
 */
export const metadata: Metadata = {
  title: "모션 시스템",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MotionPreviewPage() {
  return <MotionPreviewContent />;
}
