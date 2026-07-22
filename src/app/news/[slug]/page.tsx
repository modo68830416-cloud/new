import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticleBySlug, getRelatedArticles, MOCK_NEWS } from "@/data/mock-news";
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
  const article = getArticleBySlug(slug);
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
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const body = buildArticleBody(article);
  const headings = extractHeadings(body);
  const related = getRelatedArticles(article, 4);
  const shareUrl = `${siteConfig.siteUrl}/news/${article.slug}`;
  const hero = article.heroImage ?? article.thumbnail;

  return (
    <div className="flex flex-1 flex-col">
      <ReadProgressBar targetId={ARTICLE_CONTENT_ID} />

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
              <ShareButtons title={article.title} url={shareUrl} />
            </header>

            <figure className="flex flex-col gap-2">
              <NewsImage src={hero.url} alt={hero.alt} ratio="16:9" priority className="rounded-lg" />
              {hero.caption && (
                <figcaption className="type-caption text-text-muted">{hero.caption}</figcaption>
              )}
            </figure>

            <ArticleBody blocks={body} />

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
