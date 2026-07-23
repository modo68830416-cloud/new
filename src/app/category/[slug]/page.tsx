import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  fetchArticlesByCategory,
  fetchLatestArticles,
  fetchPopularArticles,
} from "@/lib/news-api";
import { getCategoryBySlug } from "@/constants/categories";
import { CategoryHeader, PaginationPlaceholder } from "@/components/category";
import {
  CategoryNewsGrid,
  LatestNewsSection,
  PopularNewsSection,
  type RankedNewsListItem,
} from "@/components/news";
import { siteConfig } from "@/config/site";

/**
 * 빌드 시점에 미리 생성해두면(SSG/ISR), 그 순간 네이버 API 연결이 잠깐이라도
 * 불안정할 경우 mock 폴백 결과가 다음 재검증 주기까지 그대로 굳어버린다.
 * 카테고리 페이지는 매 요청마다 새로 렌더링해 `/search`와 동일하게 항상
 * 최신 조회 결과(및 재시도 로직)를 반영하도록 한다.
 */
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};

  return {
    title: `${category.name} 뉴스`,
    description: category.description ?? `${siteConfig.siteName}의 ${category.name} 뉴스`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const categoryArticles = await fetchArticlesByCategory(slug);
  if (categoryArticles.length === 0) notFound();

  const [latestFirst, popularArticles] = await Promise.all([
    fetchLatestArticles(undefined, categoryArticles),
    fetchPopularArticles(10, categoryArticles),
  ]);
  const featured = categoryArticles.find((article) => article.isFeatured) ?? latestFirst[0];
  const featuredItems = latestFirst.filter((article) => article.id !== featured.id).slice(0, 4);

  const popularItems: RankedNewsListItem[] = popularArticles.map((article, index) => ({
    article,
    rank: index + 1,
  }));

  return (
    <div className="container-dashboard flex flex-col gap-12 py-8 lg:py-12">
      <CategoryHeader category={category} />

      <section aria-labelledby="category-featured-title" className="flex flex-col gap-4">
        <h2 id="category-featured-title" className="type-section-title">
          주요 뉴스
        </h2>
        <CategoryNewsGrid featured={featured} items={featuredItems} />
      </section>

      <div id="category-latest-news">
        <LatestNewsSection
          articles={latestFirst}
          title="최신 뉴스"
          lastUpdated={latestFirst[0]?.publishedAt}
        />
      </div>

      <div className="max-w-md">
        <PopularNewsSection items={popularItems} title="인기 뉴스" />
      </div>

      <PaginationPlaceholder />
    </div>
  );
}
