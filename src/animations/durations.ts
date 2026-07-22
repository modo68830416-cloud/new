import { designSystemConfig } from "@/config/design-system";

/**
 * TASK-002 모션 duration 토큰(`src/styles/tokens.css`, `design-system.ts`)을
 * JS 애니메이션(Framer Motion)에서 사용할 수 있는 형태로 노출한다.
 *
 * 이 파일이 유일한 duration 출처다. 컴포넌트에서 duration을 직접
 * 하드코딩하지 않고 항상 여기에서 가져와야 한다.
 */
export type DurationToken = "instant" | "fast" | "normal" | "slow" | "dramatic";

const DURATION_TOKENS = designSystemConfig.motionDurations;

function findDuration(id: DurationToken) {
  const token = DURATION_TOKENS.find((d) => d.id === id);
  if (!token) {
    throw new Error(`Unknown motion duration token: ${id}`);
  }
  return token;
}

/** Framer Motion `transition.duration`에 바로 사용할 수 있는 초 단위 값 */
export const durations: Record<DurationToken, number> = {
  instant: findDuration("instant").ms / 1000,
  fast: findDuration("fast").ms / 1000,
  normal: findDuration("normal").ms / 1000,
  slow: findDuration("slow").ms / 1000,
  dramatic: findDuration("dramatic").ms / 1000,
};

/** CSS(`transition-duration`, inline style 등)에서 사용할 `var(--duration-*)` 참조 */
export const durationVars: Record<DurationToken, string> = Object.fromEntries(
  DURATION_TOKENS.map((token) => [token.id, `var(${token.cssVar})`]),
) as Record<DurationToken, string>;
