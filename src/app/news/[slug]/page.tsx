import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import { MOCK_NEWS } from "@/data/mock-news";
import { fetchArticleBySlug, fetchRelatedArticles } from "@/lib/news-api";
import { buildArticleBody, extractHeadings } from "@/data/mock-article-body";
import { siteConfig } from "@/config/site";
import { CategoryBadge } from "@/components/ui/category-badge";
import { NewsImage } from "@/components/news";
import {
  ArticleBody,
  ArticleMeta,
  AuthorCard,
  RelatedNews,
  ReadProgressBar,
  ShareButtons,
  TableOfContents,
} from "@/components/article";
import { BookmarkButton, ReadingHistoryTracker } from "@/components/personalization";

const ARTICLE_CONTENT_ID = "article-content";

export const dynamicParams = false;

/**
 * mock 데이터(`MOCK_NEWS`) 기준으로 뉴스 상세 페이지를 정적 라우트로
 * 생성한다 (TASK-009) — `/news/breaking-midnight-blackout` 등.
 */
export function generateStaticParams() {
  return MOCK_NEWS.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      type: "article",
      images: [{ url: (article.heroImage ?? article.thumbnail).url }],
    },
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);
  if (!article) notFound();

  const body = buildArticleBody(article);
  const headings = extractHeadings(body);
  const related = await fetchRelatedArticles(article, 4);
  const shareUrl = `${siteConfig.siteUrl}/news/${article.slug}`;
  const hero = article.heroImage ?? article.thumbnail;

  return (
    <div className="flex flex-1 flex-col">
      <ReadProgressBar targetId={ARTICLE_CONTENT_ID} />
      {/* 상세 페이지 진입을 자동으로 읽기 기록에 남긴다 (TASK-011) —
          화면에는 아무것도 렌더링하지 않는다. */}
      <ReadingHistoryTracker articleId={article.id} slug={article.slug} />

      <div className="container-dashboard grid grid-cols-1 gap-10 py-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start lg:py-12">
        <article id={ARTICLE_CONTENT_ID} className="min-w-0">
          <div className="flex max-w-[44rem] flex-col gap-6">
            <header className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <CategoryBadge category={article.category} />
                {article.isExclusive && (
                  <span className="type-label border-exclusive text-exclusive rounded-full border px-2.5 py-1">
                    단독
                  </span>
                )}
              </div>

              <h1 className="type-page-title break-keep">{article.title}</h1>
              {article.subtitle && (
                <p className="type-body break-keep text-text-secondary">{article.subtitle}</p>
              )}

              <ArticleMeta article={article} />
              <div className="flex flex-wrap items-center gap-2">
                <ShareButtons title={article.title} url={shareUrl} />
                <BookmarkButton articleId={article.id} slug={article.slug} showLabel />
              </div>
            </header>

            <figure className="flex flex-col gap-2">
              <NewsImage src={hero.url} alt={hero.alt} ratio="16:9" priority className="rounded-lg" />
              {hero.caption && (
                <figcaption className="type-caption text-text-muted">{hero.caption}</figcaption>
              )}
            </figure>

            {/* 설정 페이지의 글자 크기 환경설정(TASK-011)이 본문에만 적용되도록
                이 컨테이너 안에서만 --text-* 토큰을 --font-scale-reading 배율만큼
                다시 선언한다. 다른 화면의 타이포그래피 토큰 값 자체는 바뀌지
                않는다. */}
            <div
              style={
                {
                  "--text-base": "calc(1rem * var(--font-scale-reading, 1))",
                  "--text-lg": "calc(1.125rem * var(--font-scale-reading, 1))",
                  "--text-xl": "calc(1.25rem * var(--font-scale-reading, 1))",
                  "--text-2xl": "calc(1.5rem * var(--font-scale-reading, 1))",
                  "--text-3xl": "calc(1.875rem * var(--font-scale-reading, 1))",
                } as CSSProperties
              }
            >
              <ArticleBody blocks={body} />
            </div>

            {article.author && (
              <div className="border-t border-border-subtle pt-6">
                <AuthorCard author={article.author} />
              </div>
            )}
          </div>

          <div className="mt-12">
            <RelatedNews articles={related} />
          </div>
        </article>

        <aside aria-label="사이드바" className="lg:sticky lg:top-24">
          <TableOfContents headings={headings} />
        </aside>
      </div>
    </div>
  );
}
