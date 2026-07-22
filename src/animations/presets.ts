import type { Transition, Variants } from "motion/react";
import {
  fadeVariants,
  slideUpVariants,
  slideDownVariants,
  slideLeftVariants,
  slideRightVariants,
  scaleVariants,
  zoomVariants,
  blurInVariants,
  staggerContainerVariants,
  staggerItemVariants,
} from "./variants";
import {
  transitionEnter,
  transitionExit,
  transitionStandard,
  staggerChildDelay,
} from "./transitions";

/** TASK-004 명세의 Transition Preset 이름 */
export type PresetName =
  | "fade"
  | "slide-up"
  | "slide-down"
  | "slide-left"
  | "slide-right"
  | "scale"
  | "zoom"
  | "stagger"
  | "blur-in";

export interface MotionPreset {
  variants: Variants;
  transition: Transition;
}

/**
 * 이름이 있는 Transition Preset 모음. `variants`(모양)와
 * `transitions.ts` 토큰 기반 `transition`(속도/곡선)을 조합한 결과물이며,
 * `motion.div`에 `variants`/`transition`/`initial="hidden"`/`animate="visible"`로
 * 바로 펼쳐 사용할 수 있다.
 */
export const motionPresets: Record<PresetName, MotionPreset> = {
  fade: { variants: fadeVariants, transition: transitionEnter },
  "slide-up": { variants: slideUpVariants, transition: transitionEnter },
  "slide-down": { variants: slideDownVariants, transition: transitionEnter },
  "slide-left": { variants: slideLeftVariants, transition: transitionEnter },
  "slide-right": { variants: slideRightVariants, transition: transitionEnter },
  scale: { variants: scaleVariants, transition: transitionStandard },
  zoom: { variants: zoomVariants, transition: transitionStandard },
  stagger: {
    variants: staggerItemVariants,
    transition: transitionEnter,
  },
  "blur-in": { variants: blurInVariants, transition: transitionStandard },
};

/** Stagger 컨테이너용 variants + transition (자식으로 staggerItemVariants 사용) */
export const staggerContainerPreset: MotionPreset = {
  variants: {
    hidden: staggerContainerVariants.hidden,
    visible: {
      ...staggerContainerVariants.visible,
      transition: { staggerChildren: staggerChildDelay },
    },
  },
  transition: transitionEnter,
};

/** exit 애니메이션에서 사용하는 공용 transition (fast + ease-exit) */
export const presetExitTransition = transitionExit;
