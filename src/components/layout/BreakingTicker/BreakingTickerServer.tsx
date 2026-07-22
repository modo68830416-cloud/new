import { fetchActiveBreakingNews } from "@/lib/news-api";
import { BreakingTicker, type BreakingTickerProps } from "./BreakingTicker";

/**
 * TASK-012 — `BreakingTicker`에 서비스 계층(`fetchActiveBreakingNews`)
 * 데이터를 공급하는 비동기 서버 컴포넌트. 속보는 자주 갱신될 수 있는
 * 데이터이므로 `LayoutProvider`에서 `<Suspense>`로 감싸 스트리밍한다.
 */
export async function BreakingTickerServer({ className }: Pick<BreakingTickerProps, "className">) {
  const items = await fetchActiveBreakingNews();
  return <BreakingTicker items={items} className={className} />;
}
