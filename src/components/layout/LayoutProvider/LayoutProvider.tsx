import { Suspense, type ReactNode } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Header } from "@/components/layout/Header";
import { BreakingTickerServer } from "@/components/layout/BreakingTicker";
import { Footer } from "@/components/layout/Footer";
import { Skeleton } from "@/components/ui/skeleton";

export interface LayoutProviderProps {
  children: ReactNode;
}

/**
 * TASK-012 — 속보 티커는 서비스 계층(`fetchActiveBreakingNews`)에서 비동기로
 * 조회되므로, 조회가 끝날 때까지 실제 티커와 같은 높이의 스켈레톤을
 * 보여준다. 이 컴포넌트는 앱의 모든 페이지를 감싸므로, Suspense 없이 직접
 * await하면 전체 레이아웃 렌더링이 지연된다.
 */
function BreakingTickerSkeleton() {
  return (
    <div className="flex h-11 items-center border-b border-border-subtle bg-background-secondary px-4">
      <Skeleton className="h-4 w-2/3 max-w-md" />
    </div>
  );
}

/**
 * App Router 루트 레이아웃에서 사용하는 공통 레이아웃 조합.
 *
 * 구성: Skip Link → TopBar → Header → BreakingTicker → `<main>` 슬롯 → Footer
 *
 * 랜드마크(header/nav/main/footer)를 모두 갖추고, 키보드 사용자를 위한
 * "본문 바로가기" Skip Navigation 링크를 최상단에 둔다.
 */
export function LayoutProvider({ children }: LayoutProviderProps) {
  return (
    <>
      <a
        href="#main-content"
        className={[
          "sr-only focus:not-sr-only",
          "focus:fixed focus:top-3 focus:left-3 focus:z-critical-alert",
          "focus:rounded-md focus:bg-accent-primary focus:px-4 focus:py-2",
          "focus:type-caption focus:font-semibold focus:text-text-inverse focus:shadow-lg",
        ].join(" ")}
      >
        본문 바로가기
      </a>

      <TopBar />
      <Header />
      <Suspense fallback={<BreakingTickerSkeleton />}>
        <BreakingTickerServer />
      </Suspense>

      <main id="main-content" className="flex flex-1 flex-col">
        {children}
      </main>

      <Footer />
    </>
  );
}
