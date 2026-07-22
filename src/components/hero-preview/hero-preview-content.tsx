import { CheckCircle2 } from "lucide-react";
import { Surface } from "@/components/ui/surface";
import { HeroSection } from "@/components/hero/HeroSection";
import { FeaturedHero } from "@/components/hero/FeaturedHero";
import { SecondaryNewsGrid } from "@/components/hero/SecondaryNewsGrid";
import { TrendingPanel } from "@/components/hero/TrendingPanel";
import { LiveStatusPanel } from "@/components/hero/LiveStatusPanel";
import { MarketWeatherStrip } from "@/components/hero/MarketWeatherStrip";
import { DeviceFrame } from "@/components/layout-preview/device-frame";
import { Section } from "@/components/ui-preview/section";

const CHECKLIST = [
  "Hero Container / Grid — Featured(8) + Trending·Live 사이드바(4), 모바일은 세로 스택",
  "Featured News — 대표 이미지, 카테고리/속보 배지, 제목, 요약, 발행 시각, 조회수, 공유·읽기 버튼(UI)",
  "Secondary Grid — 보조 기사 6개, 카드 크기 차등, hover lift, image zoom, 메타데이터",
  "Trending Panel — 인기 검색어 Top 10, 상승/하락/신규 아이콘, 순위 변화, Live 표시",
  "Live Status — 실시간 시계(1초 갱신), 최근 업데이트, 오늘 기사 수, Breaking 개수, Live Indicator",
  "Market/Weather 스트립 — 목업 데이터, 실제 API 연동 없음",
  "Hero Motion — Fade In / Card Stagger / Image Scale / Hover Lift / Background Glow / Scroll Reveal",
  "반응형 — Mobile / Tablet / Laptop / Desktop / Wide",
  "접근성 — Landmark, Heading 계층, 이미지 alt, 키보드 탐색, Focus 표시",
];

/**
 * TASK-006 Hero / 첫 화면 개발용 미리보기 페이지.
 *
 * 실제 홈페이지(`/`)와 동일한 `HeroSection`을 그대로 렌더링해 조합 결과를
 * 확인하고, 그 아래에서 각 하위 컴포넌트를 개별적으로도 검수할 수 있게
 * 나열한다.
 */
export function HeroPreviewContent() {
  return (
    <div className="container-dashboard py-12">
      <header className="mb-12">
        <p className="type-metadata mb-3 text-accent-primary">Development Only · TASK-006</p>
        <h1 className="type-hero-title break-url">Hero / 첫 화면 미리보기</h1>
        <p className="type-body mt-4 max-w-prose text-text-secondary">
          홈페이지 첫 화면(Above the Fold)을 구성하는 Hero 컴포넌트 검수용
          페이지다. TASK-001 mock 데이터만 사용하며, 실제 뉴스 API·상세
          페이지·검색·로그인은 구현하지 않는다.
        </p>
      </header>

      <Section
        id="hero-full"
        title="1. Hero 전체 조합"
        description="실제 `/` 페이지와 동일한 HeroSection이다. Featured News | Trending + Live Status → Market/Weather → Secondary Grid 순서를 확인한다."
      >
        <Surface bordered radius="md" className="overflow-hidden p-0">
          <HeroSection secondaryGridId="hero-preview-secondary-news" />
        </Surface>
      </Section>

      <Section id="featured" title="2. Featured News" description="대표 이미지, 카테고리/속보 배지, 제목, 요약, 발행 시각, 조회수, 공유·읽기 버튼(UI).">
        <FeaturedHero />
      </Section>

      <Section
        id="secondary"
        title="3. Secondary Grid"
        description="보조 헤드라인 4~6개. 카드 크기 차등 배치 + hover 시 살짝 떠오르는 Hover Lift + 이미지 확대(Image Zoom)를 마우스로 확인한다."
      >
        <SecondaryNewsGrid />
      </Section>

      <Section
        id="trending"
        title="4. Trending Panel"
        description="인기 검색어 Top 10, 상승/하락/신규 진입 아이콘과 순위 변화 폭, Live 표시. 항목은 Stagger 모션으로 순차 등장한다."
      >
        <div className="max-w-md">
          <TrendingPanel />
        </div>
      </Section>

      <Section id="live-status" title="5. Live Status" description="실시간 시계(1초마다 갱신), 최근 업데이트, 오늘 기사 수, Breaking 개수, Live Indicator.">
        <div className="max-w-md">
          <LiveStatusPanel />
        </div>
      </Section>

      <Section id="market-weather" title="6. Market/Weather (목업)" description="코스피·코스닥·환율·날씨 자리. 값은 고정된 mock 데이터이며 실시간 연동은 하지 않는다.">
        <MarketWeatherStrip />
      </Section>

      <Section
        id="mobile-layout"
        title="7. Mobile Layout"
        description="실제 `/` 페이지를 디바이스 픽셀 폭 그대로 iframe에 로드했다. 모바일에서는 Featured → Trending → Live Status → Market/Weather → Secondary 순서로 세로 스택된다."
      >
        <div className="flex flex-wrap items-start justify-center gap-8">
          <DeviceFrame label="Desktop" width={1440} height={900} maxWidth={480} />
          <DeviceFrame label="Tablet" width={834} height={1100} maxWidth={300} />
          <DeviceFrame label="Mobile" width={390} height={1400} maxWidth={200} />
        </div>
      </Section>

      <Section id="checklist" title="8. 완료 조건 체크리스트">
        <Surface bordered radius="md" className="p-6">
          <ul className="flex flex-col gap-3">
            {CHECKLIST.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-text-secondary">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-success" aria-hidden />
                <span className="type-body">{item}</span>
              </li>
            ))}
          </ul>
        </Surface>
      </Section>
    </div>
  );
}
