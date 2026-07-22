import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  fetchArticlesByCategory,
  fetchLatestArticles,
  fetchPopularArticles,
} from "@/lib/news-api";
import { getCategoryBySlug, VISIBLE_CATEGORIES } from "@/constants/categories";
import { CategoryHeader, PaginationPlaceholder } from "@/components/category";
import {
  CategoryNewsGrid,
  LatestNewsSection,
  PopularNewsSection,
  type RankedNewsListItem,
} from "@/components/news";
import { siteConfig } from "@/config/site";

export const dynamicParams = false;

/**
 * mock 데이터(`VISIBLE_CATEGORIES`) 기준으로 카테고리 페이지를 정적 라우트로
 * 생성한다 (TASK-009) — `/category/politics`, `/category/economy` 등.
 */
export function generateStaticParams() {
  return VISIBLE_CATEGORIES.map((category) => ({ slug: category.slug }));
}

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
