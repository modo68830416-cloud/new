import Link from "next/link";
import { cn } from "@/lib/utils";
import type { NewsCardLinkProps } from "../news.types";

/**
 * "Stretched link" 패턴으로 카드 전체 클릭 영역을 만드는 primitive
 * (TASK-007 6.5).
 *
 * 실제 `<a>`는 이 컴포넌트가 감싸는 텍스트(보통 제목) 하나뿐이다 —
 * `::after` 가상 요소를 카드 전체에 절대 위치로 펼쳐 카드 어디를 클릭해도
 * 이 링크가 반응하게 만든다. 이렇게 하면:
 *
 * - 카드 내부에 중첩된 링크를 만들지 않는다 (실제 <a> 태그는 1개).
 * - 스크린 리더는 링크의 접근 가능한 이름(제목 텍스트)을 한 번만 읽는다.
 * - 공유 버튼처럼 별도 인터랙션이 필요한 요소는 `relative z-content`로
 *   이 stretched 영역보다 위에 두면 정상적으로 클릭된다
 *   (`NewsShareAction` 참고).
 *
 * 사용하는 쪽(카드 컨테이너)은 반드시 `position: relative`를 가져야 한다
 * — 각 카드 컴포넌트의 최상위 `<article>`/`Surface`에 `relative`를 둔다.
 */
export function NewsCardLink({
  href,
  children,
  className,
  prefetch,
  disabledReason,
}: NewsCardLinkProps) {
  if (disabledReason) {
    return (
      <span
        className={cn("cursor-not-allowed", className)}
        aria-disabled="true"
        title={disabledReason}
      >
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      prefetch={prefetch}
      className={cn(
        "pointer-events-auto rounded-[inherit] outline-none transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
        "hover:text-accent-primary",
        // z-content(10)로 카드 내부의 정적 콘텐츠(배지/메타/이미지)보다 항상 위에서
        // 클릭을 받는다 — CSS 페인트 순서상 z-index가 있는 요소는 DOM 순서와
        // 무관하게 위치가 없는(static) 형제/자손보다 항상 나중에 그려진다.
        "after:absolute after:inset-0 after:z-content after:rounded-[inherit] after:content-['']",
        className,
      )}
    >
      {children}
    </Link>
  );
}

/**
 * 카드 컨테이너(`article`/`Surface`)에 공통으로 붙이는 클래스 — 카드 전체
 * 링크가 자리 잡을 위치 기준(`relative`)과, 키보드 포커스 시 카드 전체에
 * 보이는 focus ring을 함께 제공한다 (`:focus-within`이므로 stretched
 * 링크에 포커스가 가면 카드 테두리 전체가 밝아진다).
 */
export const newsCardContainerClassName =
  "relative focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[var(--color-border-focus)] focus-within:outline";
