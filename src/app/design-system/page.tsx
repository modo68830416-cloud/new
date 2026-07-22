import type { Metadata } from "next";
import { DesignSystemPreview } from "@/components/design-system/design-system-preview";

/**
 * 개발용 디자인 시스템 미리보기 페이지 (TASK-002).
 *
 * 운영 콘텐츠가 아니라 디자인 토큰 검수를 위한 내부용 페이지다. 검색 엔진
 * 노출을 막아두었으며, 향후 필요 시 환경 변수나 미들웨어로 접근을 제한할 수
 * 있는 구조로 분리되어 있다 (라우트 파일은 렌더링만 담당, 실제 내용은
 * `components/design-system`에 위치).
 */
export const metadata: Metadata = {
  title: "디자인 시스템",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DesignSystemPage() {
  return <DesignSystemPreview />;
}
