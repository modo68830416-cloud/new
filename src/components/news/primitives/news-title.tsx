import { createElement } from "react";
import { cn } from "@/lib/utils";
import type { NewsTitleProps, NewsTitleSize } from "../news.types";

const SIZE_CLASSES: Record<NewsTitleSize, string> = {
  xs: "text-sm font-semibold leading-snug",
  sm: "text-base font-semibold leading-snug",
  md: "type-card-title",
  lg: "type-article-title",
  xl: "type-section-title",
};

const LINE_CLAMP_CLASSES: Record<1 | 2 | 3 | 4, string> = {
  1: "line-clamp-1",
  2: "line-clamp-2",
  3: "line-clamp-3",
  4: "line-clamp-4",
};

/**
 * 뉴스 제목 primitive (TASK-007 6.2).
 *
 * - heading level과 시각적 크기(size)를 분리한다 — 문맥에 맞는 heading 계층을
 *   유지하면서도 카드 크기에 맞는 타이포그래피를 고를 수 있다.
 * - 긴 한국어 제목은 `break-keep`으로 단어 단위 줄바꿈을 유도하고, 제목 전체를
 *   억지로 한 줄에 넣지 않는다 (기본 2줄 clamp).
 * - hover 상태는 이 컴포넌트가 아니라 `NewsCardLink`(제목을 감싸는 링크)가
 *   담당한다.
 */
export function NewsTitle({
  children,
  level = "h3",
  size = "md",
  lineClamp = 2,
  className,
}: NewsTitleProps) {
  return createElement(
    level,
    {
      className: cn(
        SIZE_CLASSES[size],
        "break-keep text-text-primary",
        LINE_CLAMP_CLASSES[lineClamp],
        className,
      ),
    },
    children,
  );
}
