import { fetchLiveStatus } from "@/lib/news-api";
import { LiveStatusPanel } from "./LiveStatusPanel";
import type { LiveStatusPanelProps } from "./LiveStatusPanel.types";

/**
 * TASK-013 — `LiveStatusPanel`에 서비스 계층(`fetchLiveStatus`) 데이터를
 * 공급하는 비동기 서버 컴포넌트. `BreakingTickerServer`/`TrendingPanelServer`
 * (TASK-012)와 동일하게 `HeroSection`에서 `<Suspense>`로 감싸 스트리밍한다.
 * 실시간 시계(1초 tick)는 서버 데이터가 아니므로 `LiveStatusPanel` 내부
 * 클라이언트 상태로 그대로 남는다.
 */
export async function LiveStatusPanelServer({ className }: Pick<LiveStatusPanelProps, "className">) {
  const { todayArticleCount, breakingCount, lastUpdatedAt } = await fetchLiveStatus();
  return (
    <LiveStatusPanel
      todayArticleCount={todayArticleCount}
      breakingCount={breakingCount}
      lastUpdatedAt={lastUpdatedAt}
      className={className}
    />
  );
}
