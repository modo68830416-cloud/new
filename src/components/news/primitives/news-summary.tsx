import { cn } from "@/lib/utils";
import type { NewsSummaryProps } from "../news.types";

const LINE_CLAMP_CLASSES: Record<2 | 3, string> = {
  2: "line-clamp-2",
  3: "line-clamp-3",
};

/**
 * 뉴스 요약 primitive (TASK-007 6.3).
 *
 * 2~3줄로 제한하며, 카드가 작을 때는 호출부에서 아예 렌더링을 생략하거나
 * `hideOnMobile`로 모바일 노출을 끌 수 있다. 제목과 중복되는 문구를 이
 * 컴포넌트가 만들어내지 않는다 — 항상 실제 기사 요약(`article.summary`)을
 * 그대로 전달받는다.
 */
export function NewsSummary({
  children,
  lineClamp = 2,
  hideOnMobile = false,
  className,
}: NewsSummaryProps) {
  return (
    <p
      className={cn(
        "type-body text-text-secondary",
        hideOnMobile && "hidden sm:block",
        LINE_CLAMP_CLASSES[lineClamp],
        className,
      )}
    >
      {children}
    </p>
  );
}
