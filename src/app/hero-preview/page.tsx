import type { Metadata } from "next";
import { HeroPreviewContent } from "@/components/hero-preview/hero-preview-content";

/**
 * 개발용 Hero / 첫 화면 미리보기 페이지 (TASK-006).
 *
 * Hero / Featured / Secondary / Trending / Motion / Mobile Layout 검수를
 * 위한 내부용 페이지다. 검색 엔진 노출을 막아두었다.
 */
export const metadata: Metadata = {
  title: "Hero 미리보기",
  robots: {
    index: false,
    follow: false,
  },
};

export default function HeroPreviewPage() {
  return <HeroPreviewContent />;
}
