import type { Variants } from "motion/react";

/**
 * 공용 Framer Motion Variants 모음.
 *
 * - transform(translate/scale)과 opacity만 사용한다 (GPU 친화적, layout shift 없음).
 * - duration/easing 값은 포함하지 않는다 — 실제 전환 속도/곡선은
 *   `src/animations/transitions.ts`의 토큰 기반 Transition을 조합해서 사용한다
 *   (`src/animations/presets.ts` 참고).
 */

const SLIDE_DISTANCE = 16; // px — 레이아웃에 영향 없는 작은 이동량

export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: SLIDE_DISTANCE },
  visible: { opacity: 1, y: 0 },
};

export const slideDownVariants: Variants = {
  hidden: { opacity: 0, y: -SLIDE_DISTANCE },
  visible: { opacity: 1, y: 0 },
};

export const slideLeftVariants: Variants = {
  hidden: { opacity: 0, x: SLIDE_DISTANCE },
  visible: { opacity: 1, x: 0 },
};

export const slideRightVariants: Variants = {
  hidden: { opacity: 0, x: -SLIDE_DISTANCE },
  visible: { opacity: 1, x: 0 },
};

export const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1 },
};

export const zoomVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1 },
};

/** blur-in — filter는 GPU 합성 대상은 아니지만 layout shift는 없다. 제한적으로 사용. */
export const blurInVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(6px)" },
  visible: { opacity: 1, filter: "blur(0px)" },
};

export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {},
};

export const staggerItemVariants: Variants = slideUpVariants;

/** Page transition — 살짝의 fade + 수직 이동만 사용 (레이아웃 흔들림 없음) */
export const pageTransitionVariants: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

/** Reduced-motion 환경에서 사용할 최소 variants (opacity만, 이동 없음) */
export const reducedMotionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

/** Reduced-motion 환경의 page transition — 즉시 표시, 이동 없음 */
export const reducedPageTransitionVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};
