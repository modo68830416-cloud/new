import { designSystemConfig } from "@/config/design-system";

/**
 * duration/easing 차이를 확인하기 위한 순수 CSS(:hover) 데모.
 * JS 애니메이션 라이브러리를 사용하지 않으며, prefers-reduced-motion 환경에서는
 * globals.css의 전역 규칙에 의해 전환이 즉시 적용된다.
 */
export function MotionPreview() {
  return (
    <div className="space-y-10">
      <div>
        <h3 className="type-section-title mb-2 text-xl">Duration</h3>
        <p className="type-caption mb-4">
          카드에 마우스를 올리면 점이 오른쪽으로 이동합니다. 같은 easing,
          다른 duration.
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {designSystemConfig.motionDurations.map((duration) => (
            <div
              key={duration.id}
              className="group relative overflow-hidden rounded-md border border-border-subtle bg-surface p-4"
            >
              <p className="type-caption mb-3">
                {duration.label} · {duration.ms}ms
              </p>
              <div className="h-3 w-full rounded-full bg-surface-elevated">
                <div
                  className="h-3 w-3 rounded-full bg-accent-primary transition-transform group-hover:translate-x-40"
                  style={{
                    transitionDuration: `var(${duration.cssVar})`,
                    transitionTimingFunction: "var(--ease-standard)",
                  }}
                  aria-hidden
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="type-section-title mb-2 text-xl">Easing</h3>
        <p className="type-caption mb-4">
          같은 duration(normal), 다른 easing 곡선.
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {designSystemConfig.motionEasings.map((easing) => (
            <div
              key={easing.id}
              className="group relative overflow-hidden rounded-md border border-border-subtle bg-surface p-4"
            >
              <p className="type-caption mb-3">{easing.label}</p>
              <div className="h-3 w-full rounded-full bg-surface-elevated">
                <div
                  className="h-3 w-3 rounded-full bg-accent-secondary transition-transform group-hover:translate-x-40"
                  style={{
                    transitionDuration: "var(--duration-slow)",
                    transitionTimingFunction: `var(${easing.cssVar})`,
                  }}
                  aria-hidden
                />
              </div>
              <p className="type-metadata mt-2 break-url">{easing.usage}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
