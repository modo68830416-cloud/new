import { HeroSection } from "@/components/hero/HeroSection";
import { siteConfig } from "@/config/site";

/**
 * 홈페이지 첫 화면(Above the Fold) — TASK-006.
 *
 * 페이지 전체를 대표하는 h1은 시각적으로는 숨기고(sr-only), Hero 내부의
 * Featured 헤드라인(h2)이 시각적 주인공 역할을 한다. LayoutProvider가 이미
 * `<main>` 랜드마크를 소유하고 있으므로 여기서는 일반 `<div>`만 사용한다.
 */
export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <h1 className="sr-only">
        {siteConfig.siteName} — {siteConfig.siteDescription}
      </h1>
      <HeroSection />
    </div>
  );
}
