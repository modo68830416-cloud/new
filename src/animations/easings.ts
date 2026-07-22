import { designSystemConfig } from "@/config/design-system";

/**
 * TASK-002 모션 easing 토큰(`src/styles/tokens.css`)을 JS 애니메이션에서
 * 사용할 수 있는 형태로 노출한다.
 *
 * Framer Motion의 `ease`는 CSS `var()` 문자열을 받을 수 없고 숫자 배열
 * (cubic-bezier 좌표) 또는 명명된 easing만 허용하므로, 아래 값은
 * `src/styles/tokens.css`의 `--ease-*` 값과 항상 동일하게 유지해야 한다.
 * 이 파일이 JS 쪽 easing의 유일한 출처이며, 컴포넌트에서 easing 곡선을
 * 직접 하드코딩하지 않는다.
 */
export type EasingToken = "standard" | "enter" | "exit" | "emphasis" | "spring";

type CubicBezier = [number, number, number, number];

/** tokens.css `--ease-*`와 1:1로 동일한 cubic-bezier 좌표 */
const CUBIC_BEZIER: Record<EasingToken, CubicBezier> = {
  standard: [0.4, 0, 0.2, 1],
  enter: [0, 0, 0.2, 1],
  exit: [0.4, 0, 1, 1],
  emphasis: [0.16, 1, 0.3, 1],
  spring: [0.34, 1.56, 0.64, 1],
};

/** Framer Motion `transition.ease`에 바로 사용할 수 있는 cubic-bezier 배열 */
export const easings: Record<EasingToken, CubicBezier> = CUBIC_BEZIER;

/** CSS(`transition-timing-function`, inline style 등)에서 사용할 `var(--ease-*)` 참조 */
export const easingVars: Record<EasingToken, string> = Object.fromEntries(
  designSystemConfig.motionEasings.map((token) => [
    token.id,
    `var(${token.cssVar})`,
  ]),
) as Record<EasingToken, string>;
