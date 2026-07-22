import type { Transition } from "motion/react";
import { durations, type DurationToken } from "./durations";
import { easings, type EasingToken } from "./easings";

/**
 * duration/easing 토큰을 조합한 공용 Framer Motion Transition 프리셋.
 * 모든 transform/opacity 애니메이션은 여기에서 정의한 transition만 사용한다.
 */
export function createTransition(
  duration: DurationToken,
  easing: EasingToken,
  extra?: Omit<Transition, "duration" | "ease">,
): Transition {
  return {
    duration: durations[duration],
    ease: easings[easing],
    ...extra,
  };
}

/** 일반적인 상태 전환 (패널, 카드 등) */
export const transitionStandard = createTransition("normal", "standard");

/** 요소가 화면에 나타날 때 (fade/slide/scale-in) */
export const transitionEnter = createTransition("normal", "enter");

/** 요소가 사라질 때 */
export const transitionExit = createTransition("fast", "exit");

/** 속보 등 강조가 필요한 전환 */
export const transitionEmphasis = createTransition("slow", "emphasis");

/** hover 등 가벼운 마이크로 인터랙션 */
export const transitionHover = createTransition("fast", "standard");

/** 탄성이 필요한 소규모 인터랙션 (예: 스프링 형태의 scale) */
export const transitionSpring = createTransition("normal", "spring");

/** 드문 강조 진입 모션 */
export const transitionDramatic = createTransition("dramatic", "emphasis");

/** Stagger 컨테이너의 자식 간 시차 (fast 토큰의 절반 - 과하지 않은 리듬감) */
export const staggerChildDelay = durations.fast / 2;

/** prefers-reduced-motion: reduce 환경에서 사용할 즉시 전환 (사실상 애니메이션 없음) */
export const transitionReduced: Transition = {
  duration: durations.instant,
  ease: easings.standard,
};
