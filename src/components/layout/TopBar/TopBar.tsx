import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export interface TopBarProps {
  className?: string;
}

/**
 * 헤더 위쪽에 위치하는 상단 유틸리티 바.
 *
 * 서버 컴포넌트 — 데스크톱/태블릿에서만 노출되며(모바일은 헤더 공간을
 * 확보하기 위해 숨김), 클릭 가능한 실제 기능은 포함하지 않는다(TASK-005
 * 범위 밖: 로그인/검색 등은 이후 Task).
 */
export function TopBar({ className }: TopBarProps) {
  const today = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  return (
    <div
      className={cn(
        "hidden border-b border-border-subtle bg-background-secondary md:block",
        className,
      )}
    >
      <div className="container-news flex h-9 items-center justify-between gap-4">
        <p className="type-caption truncate text-text-muted">{siteConfig.siteDescription}</p>
        <p className="type-caption shrink-0 text-text-muted">{today}</p>
      </div>
    </div>
  );
}
