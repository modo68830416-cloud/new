import type { ReactNode } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Header } from "@/components/layout/Header";
import { BreakingTicker } from "@/components/layout/BreakingTicker";
import { Footer } from "@/components/layout/Footer";

export interface LayoutProviderProps {
  children: ReactNode;
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
      <BreakingTicker />

      <main id="main-content" className="flex flex-1 flex-col">
        {children}
      </main>

      <Footer />
    </>
  );
}
