import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PaginationPlaceholder } from "@/components/category";
import { NewsCardGrid } from "@/components/news";
import { TagFilter } from "@/components/search";
import { getAllTags, getArticlesByTagSlug, getTagBySlug } from "@/data/mock-search";
import { siteConfig } from "@/config/site";

export const dynamicParams = false;

/**
 * mock 데이터(`getAllTags`) 기준으로 태그 페이지를 정적 라우트로 생성한다
 * (TASK-010) — `/tag/정치`, `/tag/AI` 등. 태그는 `NewsArticle.tags`에서
 * 그대로 파생되며 별도 slug 필드를 추가하지 않는다.
 */
export function generateStaticParams() {
  return getAllTags().map((tag) => ({ slug: tag.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tag = getTagBySlug(slug);
  if (!tag) return {};

  return {
    title: `#${tag.tag} 태그 뉴스`,
    description: `${siteConfig.siteName}에서 '${tag.tag}' 태그가 달린 뉴스를 모아봅니다.`,
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tag = getTagBySlug(slug);
  if (!tag) notFound();

  const articles = getArticlesByTagSlug(slug);
  if (articles.length === 0) notFound();

  const otherTags = getAllTags()
    .filter((item) => item.tag !== tag.tag)
    .slice(0, 16);

  return (
    <div className="container-dashboard flex flex-col gap-8 py-8 lg:py-12">
      <header className="flex flex-col gap-3">
        <p className="type-caption text-text-muted">태그</p>
        <h1 className="type-page-title">#{tag.tag}</h1>
        <p className="type-body text-text-secondary">
          이 태그가 달린 뉴스 <strong className="text-text-primary">{articles.length}</strong>건
        </p>
      </header>

      <NewsCardGrid articles={articles} columns={3} />

      <PaginationPlaceholder />

      {otherTags.length > 0 && <TagFilter tags={otherTags} label="다른 태그" />}
    </div>
  );
}
