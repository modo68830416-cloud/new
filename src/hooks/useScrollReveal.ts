"use client";

import type { RefObject } from "react";
import { useInView, type UseInViewOptions } from "./useInView";
import { useReducedMotion } from "./useReducedMotion";

export type ScrollRevealVariant = "fade" | "slide" | "scale" | "stagger";

export interface UseScrollRevealOptions
  extends Pick<UseInViewOptions, "threshold" | "rootMargin"> {
  /** 어떤 reveal 스타일을 사용할지 (프레젠테이션은 호출부에서 담당) */
  variant?: ScrollRevealVariant;
  /** 한 번 보이면 다시 숨기지 않는다. 기본값 true (명세: once 지원) */
  once?: boolean;
  /** 다시 스크롤해서 지나갈 때마다 반복한다. 기본값 false (명세: repeat 기본 false) */
  repeat?: boolean;
}

export interface UseScrollRevealResult<T extends Element> {
  ref: RefObject<T | null>;
  variant: ScrollRevealVariant;
  /** Framer Motion `animate` prop에 바로 사용할 수 있는 variant 키 */
  animate: "hidden" | "visible";
  /** prefers-reduced-motion 환경에서는 애니메이션 없이 항상 visible 취급 */
  prefersReducedMotion: boolean;
}

/**
 * Scroll Reveal 훅. `useInView` + `useReducedMotion`을 조합해서
 * "언제 보여줄지"만 결정한다. 실제 모양(fade/slide/stagger)과 속도는
 * `src/animations`의 토큰 기반 variants/transition을 사용하는 컴포넌트
 * (`FadeIn`, `SlideUp`, `Stagger`)에서 그린다.
 *
 * - `once` 기본값 true: 한 번 나타나면 유지한다.
 * - `repeat` 기본값 false: 명세대로 반복 재생하지 않는다. `repeat: true`를
 *   명시하면 스크롤에 따라 다시 숨었다가 나타난다.
 * - `prefers-reduced-motion: reduce` 환경에서는 관찰 자체를 하지 않고 항상
 *   `visible` 상태를 반환한다 (Scroll Reveal 제거).
 */
export function useScrollReveal<T extends Element>(
  options: UseScrollRevealOptions = {},
): UseScrollRevealResult<T> {
  const { variant = "fade", threshold, rootMargin, once = true, repeat = false } =
    options;
  const prefersReducedMotion = useReducedMotion();

  const [ref, inView] = useInView<T>({
    threshold,
    rootMargin,
    once: once && !repeat,
  });

  const animate: "hidden" | "visible" =
    prefersReducedMotion || inView ? "visible" : "hidden";

  return { ref, variant, animate, prefersReducedMotion };
}
