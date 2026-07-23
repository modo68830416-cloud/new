import { HeroSection } from "@/components/hero/HeroSection";
import { siteConfig } from "@/config/site";

/**
 * 빌드 시점에 정적으로 굳혀두면 그 순간 네이버 API 연결이 불안정할 때 mock
 * 폴백 결과가 다음 재검증 주기까지 그대로 유지된다 — 매 요청마다 새로
 * 렌더링해 항상 최신 조회 결과(및 재시도 로직)를 반영하도록 한다.
 */
export const dynamic = "force-dynamic";

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
