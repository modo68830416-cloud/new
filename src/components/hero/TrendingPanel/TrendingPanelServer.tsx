import { fetchTrendingKeywords } from "@/lib/news-api";
import { TrendingPanel } from "./TrendingPanel";
import type { TrendingPanelProps } from "./TrendingPanel.types";

/**
 * TASK-012 — `TrendingPanel`에 서비스 계층(`fetchTrendingKeywords`) 데이터를
 * 공급하는 비동기 서버 컴포넌트. 실시간 인기 검색어는 자주 갱신될 수 있는
 * 데이터이므로 `HeroSection`에서 `<Suspense>`로 감싸 스트리밍한다.
 */
export async function TrendingPanelServer({ className }: Pick<TrendingPanelProps, "className">) {
  const keywords = await fetchTrendingKeywords(10);
  return <TrendingPanel keywords={keywords} className={className} />;
}
