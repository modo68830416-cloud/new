"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

export interface UseInViewOptions {
  /** 관찰 대상이 뷰포트와 교차했다고 판단할 비율 (0~1). 기본 0.2 */
  threshold?: number;
  /** IntersectionObserver rootMargin. 기본 "0px" */
  rootMargin?: string;
  /** 한 번 보이면 관찰을 멈추고 상태를 유지한다. 기본 false (계속 관찰) */
  once?: boolean;
}

/**
 * Intersection Observer 기반의 범용 "요소가 뷰포트에 보이는가" 훅.
 * Scroll Reveal(`useScrollReveal`)의 기반이 되지만, 그 외의 지연 로딩 등
 * 다른 목적으로도 재사용할 수 있도록 독립적으로 둔다.
 */
export function useInView<T extends Element>(
  options: UseInViewOptions = {},
): [RefObject<T | null>, boolean] {
  const { threshold = 0.2, rootMargin = "0px", once = false } = options;
  const ref = useRef<T | null>(null);
  // 지원하지 않는 환경(구형 브라우저, 테스트 환경)에서는 항상 보이는 것으로 처리한다.
  const isSupported = typeof IntersectionObserver !== "undefined";
  const [inView, setInView] = useState(!isSupported);

  useEffect(() => {
    const node = ref.current;
    if (!node || !isSupported) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once, isSupported]);

  return [ref, inView];
}
