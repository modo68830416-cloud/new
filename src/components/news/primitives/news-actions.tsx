"use client";

import { Share2 } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";
import { cn } from "@/lib/utils";
import type { NewsShareActionProps } from "../news.types";

/**
 * 카드 전체 링크(`NewsCardLink`)와 별도로 존재하는 보조 인터랙션
 * primitive (TASK-007 6.5).
 *
 * 카드 전체가 하나의 클릭 영역(stretched link)이므로, 공유 버튼처럼 별도
 * 동작이 필요한 요소는 `relative z-content`로 링크보다 위 stacking
 * context에 두어야 실제로 클릭될 수 있다. 이번 Task 범위에서는 실제 공유
 * 기능을 구현하지 않으므로 기본 동작은 UI만 제공(`aria-disabled` +
 * `title`)하고, `onShare`가 주어지면 그 핸들러를 호출한다.
 */
export function NewsShareAction({
  label = "공유하기",
  className,
  onShare,
}: NewsShareActionProps) {
  const isReady = typeof onShare === "function";

  return (
    <IconButton
      label={isReady ? label : `${label} (준비 중)`}
      title={isReady ? label : `${label} (준비 중)`}
      icon={<Share2 size={16} aria-hidden />}
      variant="secondary"
      size="sm"
      aria-disabled={isReady ? undefined : "true"}
      onClick={(event) => {
        if (!isReady) {
          event.preventDefault();
          return;
        }
        onShare?.();
      }}
      // NewsCardLink의 stretched pseudo가 z-content이므로, 그 위에서 독립적으로
      // 클릭되려면 한 단계 더 높은 스택 레이어(z-sticky)가 필요하다.
      className={cn("relative z-sticky", className)}
    />
  );
}
