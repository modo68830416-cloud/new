import { fetchFeaturedHeroArticle } from "@/lib/news-api";
import { FeaturedHero } from "./FeaturedHero";
import type { FeaturedHeroProps } from "./FeaturedHero.types";

/**
 * TASK-012 — `FeaturedHero`에 서비스 계층(`fetchFeaturedHeroArticle`)에서
 * 조회한 기사를 공급하는 비동기 서버 컴포넌트. `HeroSection`에서
 * `<Suspense>`로 감싸 스트리밍한다.
 */
export async function FeaturedHeroServer({ className }: Pick<FeaturedHeroProps, "className">) {
  const article = await fetchFeaturedHeroArticle();
  return <FeaturedHero article={article} className={className} />;
}
