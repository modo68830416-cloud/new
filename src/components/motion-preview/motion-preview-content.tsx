import { Section } from "@/components/ui-preview/section";
import { RevealPreview } from "./reveal-preview";
import { StaggerPreview } from "./stagger-preview";
import { HoverPreview } from "./hover-preview";
import { SkeletonSpinnerPreview } from "./skeleton-spinner-preview";
import { LivePreview } from "./live-preview";
import { PageTransitionPreview } from "./page-transition-preview";
import { ReducedMotionPreview } from "./reduced-motion-preview";

/**
 * TASK-004 인터랙션 & 애니메이션 시스템 미리보기 (개발용 전용 페이지).
 * 실제 뉴스 데이터/헤더/푸터 없이 모션 시스템 자체만 검수한다.
 */
export function MotionPreviewContent() {
  return (
    <div className="container-dashboard py-12">
      <header className="mb-12">
        <p className="type-metadata mb-3 text-accent-primary">
          Development Only · TASK-004
        </p>
        <h1 className="type-hero-title break-url">모션 시스템 미리보기</h1>
        <p className="type-body mt-4 max-w-prose text-text-secondary">
          TASK-002 모션 토큰(duration/easing)과 TASK-003 UI 컴포넌트를 그대로
          사용한 인터랙션·애니메이션 시스템 검수용 페이지다. 모든 애니메이션은
          opacity/transform 기반이며, OS의 &quot;동작 줄이기&quot;
          설정(prefers-reduced-motion)을 존중한다.
        </p>
      </header>

      <Section
        id="reveal"
        title="1. Scroll Reveal — Fade / Slide / Scale"
        description="FadeIn, SlideUp, ScaleIn — useScrollReveal + Intersection Observer 기반."
      >
        <RevealPreview />
      </Section>

      <Section
        id="stagger"
        title="2. Stagger"
        description="Stagger — 자식 요소를 순서대로 시차를 두고 등장시킨다."
      >
        <StaggerPreview />
      </Section>

      <Section
        id="hover"
        title="3. Hover"
        description="Button, Card, Badge, Link, Navigation의 transform 기반 hover."
      >
        <HoverPreview />
      </Section>

      <Section
        id="loading"
        title="4. Loading — Skeleton / Spinner"
        description="TASK-003의 Skeleton/Spinner에 shimmer/pulse 모션을 적용한다."
      >
        <SkeletonSpinnerPreview />
      </Section>

      <Section
        id="live"
        title="5. Live 상태 — Live Dot / Breaking Pulse"
        description="LiveDot, BreakingPulse — 제한적인 pulse만 사용하는 실시간/속보 강조."
      >
        <LivePreview />
      </Section>

      <Section
        id="page-transition"
        title="6. Page Transition"
        description="App Router에서 재사용 가능한 전환 구조 (PageTransition)."
      >
        <PageTransitionPreview />
      </Section>

      <Section
        id="reduced-motion"
        title="7. Reduced Motion 비교"
        description="prefers-reduced-motion: reduce 환경에서 애니메이션이 어떻게 축소되는지 비교한다."
      >
        <ReducedMotionPreview />
      </Section>
    </div>
  );
}
