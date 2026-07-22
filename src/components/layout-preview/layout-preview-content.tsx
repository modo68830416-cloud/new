import { CheckCircle2 } from "lucide-react";
import { Surface } from "@/components/ui/surface";
import { Navigation } from "@/components/layout/Navigation";
import { BreakingTicker } from "@/components/layout/BreakingTicker";
import { Footer } from "@/components/layout/Footer";
import { MOCK_BREAKING_NEWS } from "@/data/mock-breaking-news";
import { Section } from "./section";
import { DeviceFrame } from "./device-frame";
import { DrawerDemo } from "./drawer-demo";

const A11Y_CHECKLIST = [
  "header / nav / main / footer 랜드마크가 모두 존재한다",
  "페이지 로드 후 첫 Tab 키에 '본문 바로가기' Skip Link가 나타난다",
  "활성 카테고리 링크에 aria-current=\"page\"가 지정된다",
  "메뉴 버튼에 aria-expanded / aria-haspopup=\"dialog\"가 지정된다",
  "모바일 Drawer는 Focus Trap + ESC 종료 + Overlay를 제공한다 (Radix Dialog)",
  "prefers-reduced-motion 환경에서는 Header 숨김/Ticker 스크롤이 비활성화된다",
];

/**
 * TASK-005 공통 레이아웃 개발용 미리보기 페이지.
 *
 * 이 페이지 자체도 루트 레이아웃(LayoutProvider)에 의해 TopBar → Header →
 * BreakingTicker → main → Footer로 감싸여 있으므로, 페이지 상/하단에서
 * 바로 실제 컴포넌트를 확인할 수 있다. 아래 섹션들은 Desktop Navigation,
 * Tablet/Mobile 반응형, Sticky, Drawer를 좀 더 명확하게 짚어보기 위한
 * 보조 데모다.
 */
export function LayoutPreviewContent() {
  return (
    <div className="container-dashboard py-12">
      <header className="mb-12">
        <p className="type-metadata mb-3 text-accent-primary">Development Only · TASK-005</p>
        <h1 className="type-hero-title break-url">공통 레이아웃 미리보기</h1>
        <p className="type-body mt-4 max-w-prose text-text-secondary">
          Header · Navigation · Mobile Drawer · Breaking Ticker · Footer ·
          LayoutProvider 검수용 페이지다. 이 페이지 역시 루트 레이아웃을 그대로
          사용하므로, 지금 이 페이지의 맨 위/아래에 있는 TopBar · Header ·
          BreakingTicker · Footer가 실제로 적용된 결과다.
        </p>
      </header>

      <Section
        id="landmarks"
        title="1. 랜드마크 구조"
        description="TopBar → Header → BreakingTicker → main(#main-content) → Footer 순서로 조립된다 (LayoutProvider)."
      >
        <Surface bordered radius="md" className="p-6">
          <pre className="type-caption overflow-x-auto whitespace-pre text-text-secondary">
{`<body>
  <a href="#main-content">본문 바로가기</a>   ← Skip Navigation
  <TopBar />                                 (desktop/tablet 전용)
  <header>...</header>                       ← Header (sticky, z-header)
  <section aria-label="속보 뉴스">...</section> ← BreakingTicker
  <main id="main-content">{children}</main>  ← 페이지 콘텐츠 슬롯
  <footer>...</footer>                       ← Footer
</body>`}
          </pre>
        </Surface>
      </Section>

      <Section
        id="header-sticky"
        title="2. Header — Sticky / 스크롤 축소 / Hide·Show"
        description="이 페이지를 위아래로 스크롤해 보면: 12px 이상 스크롤 시 높이가 축소되고 blur/그림자가 강해지며, 96px를 넘어 아래로 스크롤하면 Header가 위로 사라졌다가, 위로 스크롤하면 다시 나타난다. 모두 duration/easing 토큰 기반 transition이며 prefers-reduced-motion에서는 숨김 동작이 꺼진다."
      >
        <Surface bordered radius="md" className="p-6">
          <p className="type-caption text-text-muted">
            데스크톱 카테고리 메뉴(12개 카테고리, Hover / Active / 방향키 이동) 미리보기 —
            실제로는 <code>lg</code> 브레이크포인트 이상에서만 Header에 노출된다.
          </p>
          <div className="mt-4 rounded-md border border-border-subtle bg-background px-4 py-3">
            <Navigation forceVisible activeHref="/category/politics" />
          </div>
        </Surface>
      </Section>

      <Section
        id="responsive"
        title="3. Desktop / Tablet / Mobile"
        description="실제 `/` 페이지를 각 디바이스 픽셀 폭 그대로 iframe에 로드한 것이라, 진짜 반응형 CSS가 적용된다. 모바일 프레임 안의 메뉴 아이콘을 클릭하면 실제 Drawer가 열린다."
      >
        <div className="flex flex-wrap items-start justify-center gap-8">
          <DeviceFrame label="Desktop" width={1440} height={860} maxWidth={480} />
          <DeviceFrame label="Tablet" width={834} height={1000} maxWidth={300} />
          <DeviceFrame label="Mobile" width={390} height={844} maxWidth={200} />
        </div>
      </Section>

      <Section
        id="mobile-drawer"
        title="4. Mobile Navigation (Drawer)"
        description="TASK-003 Drawer(Radix Dialog 기반)를 재사용한다. Focus Trap / ESC 종료 / Overlay는 Drawer가 기본 제공하고, 오른쪽으로 스와이프하면 닫히는 제스처만 추가했다."
      >
        <Surface bordered radius="md" className="p-6">
          <DrawerDemo />
        </Surface>
      </Section>

      <Section
        id="ticker"
        title="5. Breaking News Ticker"
        description="TASK-001 mock-breaking-news 데이터를 사용한다. 자동 스크롤, hover/키보드 focus 시 일시정지, 긴 제목 말줄임, Live/단계별 Breaking 배지를 포함한다."
      >
        <Surface bordered radius="md" className="overflow-hidden p-0">
          <BreakingTicker />
        </Surface>
        <p className="type-caption mt-3 text-text-muted">
          현재 활성(isActive) 속보 {MOCK_BREAKING_NEWS.filter((item) => item.isActive).length}건 · 전체{" "}
          {MOCK_BREAKING_NEWS.length}건
        </p>
      </Section>

      <Section id="footer" title="6. Footer" description="사이트명, 카테고리, 약관/개인정보처리방침 자리, 문의 이메일, Copyright를 포함한다.">
        <Surface bordered radius="md" className="overflow-hidden p-0">
          <Footer />
        </Surface>
      </Section>

      <Section id="a11y" title="7. 접근성 체크리스트">
        <Surface bordered radius="md" className="p-6">
          <ul className="flex flex-col gap-3">
            {A11Y_CHECKLIST.map((item) => (
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
