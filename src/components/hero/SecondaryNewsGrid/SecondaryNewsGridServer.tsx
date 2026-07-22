import { fetchSecondaryHeroArticles } from "@/lib/news-api";
import { SecondaryNewsGrid } from "./SecondaryNewsGrid";
import type { SecondaryNewsGridProps } from "./SecondaryNewsGrid.types";

/**
 * TASK-012 — `SecondaryNewsGrid`에 서비스 계층(`fetchSecondaryHeroArticles`)
 * 데이터를 공급하는 비동기 서버 컴포넌트. `HeroSection`에서 `<Suspense>`로
 * 감싸 스트리밍한다.
 */
export async function SecondaryNewsGridServer({
  className,
}: Pick<SecondaryNewsGridProps, "className">) {
  const articles = await fetchSecondaryHeroArticles(6);
  return <SecondaryNewsGrid articles={articles} className={className} />;
}
