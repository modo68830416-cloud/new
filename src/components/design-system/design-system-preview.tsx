import { BadgeCheck, Loader2, Radio, Sparkles } from "lucide-react";
import { designSystemConfig } from "@/config/design-system";
import { ColorPreview } from "@/components/design-system/color-preview";
import { TypographyPreview } from "@/components/design-system/typography-preview";
import { SpacingPreview } from "@/components/design-system/spacing-preview";
import { MotionPreview } from "@/components/design-system/motion-preview";

function Section({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 border-t border-border-subtle py-12 first:border-t-0 first:pt-0"
    >
      <h2 className="type-page-title mb-2">{title}</h2>
      {description ? (
        <p className="type-body mb-8 max-w-prose text-text-secondary">
          {description}
        </p>
      ) : (
        <div className="mb-8" />
      )}
      {children}
    </section>
  );
}

export function DesignSystemPreview() {
  return (
    <div className="container-dashboard py-12">
      <header className="mb-12">
        <p className="type-metadata mb-3 text-accent-primary">
          Development Only · TASK-002
        </p>
        <h1 className="type-hero-title break-url">
          {designSystemConfig.themeName}
        </h1>
        <p className="type-body mt-4 max-w-prose text-text-secondary">
          이 페이지는 운영용 콘텐츠가 아니라 디자인 토큰 개발 검수용
          페이지다. 색상, 타이포그래피, 간격, 라운드, 그림자, 글래스/블러,
          그라데이션, 상태, 모션, z-index 토큰을 한눈에 확인할 수 있다.
        </p>
      </header>

      <Section
        id="color"
        title="1. 색상"
        description="모든 색상은 CSS 변수로 관리되며 컴포넌트에 HEX를 직접 사용하지 않는다."
      >
        <ColorPreview />
      </Section>

      <Section
        id="typography"
        title="2. 타이포그래피"
        description="Display부터 Data number까지 역할별 타이포그래피 유틸리티(type-*)."
      >
        <TypographyPreview />
      </Section>

      <Section
        id="spacing"
        title="3. 간격"
        description="4px 기준 spacing scale. Tailwind 기본 spacing 유틸리티(p-*, gap-* 등)와 동일한 배수 체계를 따른다."
      >
        <SpacingPreview />
      </Section>

      <Section id="radius" title="4. 라운드">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {designSystemConfig.radii.map((radius) => (
            <div key={radius.id} className="text-center">
              <div
                className="mx-auto mb-2 h-16 w-16 border-2 border-accent-primary bg-surface-elevated"
                style={{ borderRadius: `var(${radius.cssVar})` }}
                aria-hidden
              />
              <p className="type-caption">{radius.label}</p>
              <p className="type-metadata break-url">{radius.usage}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="shadow"
        title="5. 그림자와 깊이"
        description="다크 배경에서는 그림자뿐 아니라 테두리·밝기 차이로도 깊이를 표현한다. glow/breaking은 제한적으로 사용한다."
      >
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {designSystemConfig.shadows.map((shadow) => (
            <div key={shadow.id} className="text-center">
              <div
                className="mx-auto mb-3 h-16 w-16 rounded-md bg-surface-elevated"
                style={{ boxShadow: `var(${shadow.cssVar})` }}
                aria-hidden
              />
              <p className="type-caption">{shadow.label}</p>
              <p className="type-metadata break-url">{shadow.usage}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="glass"
        title="6. 글래스 & 블러"
        description="헤더, 플로팅 패널, 속보 레이어 등 핵심 위치에만 제한적으로 사용한다."
      >
        <div
          className="relative isolate grid grid-cols-1 gap-4 overflow-hidden rounded-lg p-8 sm:grid-cols-3"
          style={{ backgroundImage: "var(--gradient-data)" }}
        >
          <div
            className="bg-gradient-brand absolute inset-0 -z-10 opacity-40"
            aria-hidden
          />
          <div className="glass-subtle rounded-md p-4">
            <p className="type-card-title mb-1">glass-subtle</p>
            <p className="type-metadata">blur-low</p>
          </div>
          <div className="glass-default rounded-md p-4">
            <p className="type-card-title mb-1">glass-default</p>
            <p className="type-metadata">blur-medium</p>
          </div>
          <div className="glass-strong rounded-md p-4">
            <p className="type-card-title mb-1">glass-strong</p>
            <p className="type-metadata">blur-high</p>
          </div>
        </div>
      </Section>

      <Section
        id="gradient"
        title="7. 그라데이션"
        description="컴포넌트마다 임의로 새 그라데이션을 만들지 않고 정의된 역할만 사용한다."
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { name: "brand", className: "bg-gradient-brand" },
            { name: "breaking", className: "bg-gradient-breaking" },
            { name: "surface-glow", className: "bg-gradient-surface-glow" },
          ].map((gradient) => (
            <div key={gradient.name} className="text-center">
              <div
                className={`mb-2 h-20 rounded-md bg-surface ${gradient.className}`}
                aria-hidden
              />
              <p className="type-caption">{gradient.name}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="states"
        title="8. 상태별 인터랙션"
        description="default / hover / active / focus-visible / disabled / loading 상태의 raw 샘플. 정식 Button 컴포넌트는 TASK-003에서 구현한다."
      >
        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            className="touch-target rounded-md border border-border-default bg-surface-elevated px-5 py-2.5 type-card-title transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:border-accent-primary hover:bg-surface-overlay active:scale-[0.97]"
          >
            default / hover / active
          </button>
          <button
            type="button"
            className="touch-target rounded-md border border-border-default bg-surface-elevated px-5 py-2.5 type-card-title focus-ring"
          >
            focus-visible로 Tab 이동해보세요
          </button>
          <button
            type="button"
            disabled
            className="touch-target cursor-not-allowed rounded-md border border-border-subtle bg-surface px-5 py-2.5 type-card-title text-text-muted opacity-50"
          >
            disabled
          </button>
          <button
            type="button"
            disabled
            aria-busy="true"
            className="touch-target inline-flex items-center gap-2 rounded-md border border-border-default bg-surface-elevated px-5 py-2.5 type-card-title"
          >
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            loading
          </button>
        </div>
      </Section>

      <Section
        id="ui-samples"
        title="9. 기본 UI 샘플"
        description="디자인 토큰 검증 목적의 최소 샘플. Card/Badge 등 재사용 컴포넌트는 TASK-003에서 구현한다."
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="rounded-md border border-border-breaking bg-breaking p-4 text-text-inverse">
            <div className="mb-1 flex items-center gap-2">
              <Radio size={16} aria-hidden />
              <span className="type-label">속보 배지 (breaking)</span>
            </div>
            <p className="type-caption" style={{ color: "inherit" }}>
              색상 + 아이콘 + 텍스트로 함께 표현한다.
            </p>
          </div>

          <div className="rounded-md border border-border-default bg-surface p-4">
            <div className="mb-2 flex flex-wrap gap-2">
              {designSystemConfig.categoryColors.slice(0, 4).map((c) => (
                <span
                  key={c.slug}
                  className="rounded-full px-3 py-1 type-label text-text-inverse"
                  style={{ backgroundColor: `var(${c.cssVar})` }}
                >
                  {c.label}
                </span>
              ))}
            </div>
            <p className="type-caption">카테고리 배지 (category badge)</p>
          </div>

          <div className="rounded-md border border-border-default bg-surface-elevated p-6 shadow-[var(--shadow-sm)]">
            <p className="type-card-title mb-1">표면 패널 (surface panel)</p>
            <p className="type-caption">
              surface-elevated 배경 + shadow-sm + border-default 조합.
            </p>
          </div>

          <div className="rounded-md border border-border-default bg-surface p-6">
            <p className="type-card-title mb-2">링크 상태</p>
            <p className="type-body">
              <a href="#color" className="underline">
                방문하지 않은 링크
              </a>
              {" · "}
              <a
                href="#color"
                className="underline"
                style={{ color: "var(--color-text-link-visited)" }}
              >
                방문한 링크 예시(visited)
              </a>
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-md border border-border-default bg-surface p-4">
            <BadgeCheck
              size={18}
              style={{ color: "var(--color-verified)" }}
              aria-hidden
            />
            <span className="type-caption">verified 상태 표시 예시</span>
          </div>

          <div className="flex items-center gap-3 rounded-md border border-border-default bg-surface p-4">
            <Sparkles
              size={18}
              style={{ color: "var(--color-exclusive)" }}
              aria-hidden
            />
            <span className="type-caption">exclusive 상태 표시 예시</span>
          </div>
        </div>
      </Section>

      <Section
        id="motion"
        title="10. 모션"
        description="prefers-reduced-motion 환경에서는 전역 규칙에 의해 모든 전환이 즉시 적용된다."
      >
        <MotionPreview />
      </Section>

      <Section id="zindex" title="11. Z-index">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse text-left">
            <thead>
              <tr className="border-b border-border-default">
                <th className="type-metadata px-3 py-2">토큰</th>
                <th className="type-metadata px-3 py-2">값</th>
                <th className="type-metadata px-3 py-2">용도</th>
              </tr>
            </thead>
            <tbody>
              {designSystemConfig.zIndexScale.map((token) => (
                <tr key={token.id} className="border-b border-border-subtle">
                  <td className="type-data-number px-3 py-2">
                    {token.label}
                  </td>
                  <td className="type-data-number px-3 py-2">
                    {token.value}
                  </td>
                  <td className="type-caption px-3 py-2">{token.usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section
        id="breakpoints"
        title="12. 브레이크포인트"
        description="모바일 우선(mobile-first)으로 설계하며, 아래 순서대로 스타일을 확장한다."
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <thead>
              <tr className="border-b border-border-default">
                <th className="type-metadata px-3 py-2">이름</th>
                <th className="type-metadata px-3 py-2">최소 폭</th>
                <th className="type-metadata px-3 py-2">Tailwind</th>
                <th className="type-metadata px-3 py-2">용도</th>
              </tr>
            </thead>
            <tbody>
              {designSystemConfig.breakpoints.map((bp) => (
                <tr key={bp.id} className="border-b border-border-subtle">
                  <td className="type-caption px-3 py-2">{bp.label}</td>
                  <td className="type-data-number px-3 py-2">
                    {bp.minWidthPx}px
                  </td>
                  <td className="type-data-number px-3 py-2">
                    {bp.tailwindPrefix || "(default)"}
                  </td>
                  <td className="type-caption px-3 py-2">{bp.usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}
