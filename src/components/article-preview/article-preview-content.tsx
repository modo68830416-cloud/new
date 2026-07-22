import { CheckCircle2 } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";
import { CategoryBadge } from "@/components/ui/category-badge";
import { Section, SubSection } from "@/components/ui-preview/section";
import { CategoryNewsGrid, NewsImage } from "@/components/news";
import { CategoryHeader, PaginationPlaceholder } from "@/components/category";
import {
  ArticleBody,
  ArticleMeta,
  AuthorCard,
  ReadProgressBar,
  RelatedNews,
  ShareButtons,
  TableOfContents,
} from "@/components/article";
import { buildArticleBody, extractHeadings } from "@/data/mock-article-body";
import {
  getArticleBySlug,
  getArticlesByCategory,
  getLatestArticles,
  getRelatedArticles,
} from "@/data/mock-news";
import { getCategoryBySlug } from "@/constants/categories";
import { siteConfig } from "@/config/site";

const ARTICLE_DEMO_CONTENT_ID = "article-preview-body";

const CHECKLIST = [
  "카테고리 메인 페이지 — 제목/설명(CategoryHeader) + Featured News(CategoryNewsGrid) + 최신 뉴스(LatestNewsSection) + 인기 뉴스(PopularNewsSection) + 페이지네이션 자리(UI)",
  "뉴스 상세 페이지 — 제목/부제목/대표 이미지/카테고리/작성자/발행일/수정일/조회수",
  "본문 — H2/H3/Paragraph/List/Quote/Image placeholder (ArticleBody, mock 데이터)",
  "Read Progress — 상단 고정 진행률 바, 스크롤 위치에 따라 갱신",
  "목차(TOC) — 본문 heading 기반, 현재 위치 aria-current=\"location\"",
  "관련 기사 — 같은 카테고리 + 최신, 뉴스 카드 시스템(TASK-007) 재사용",
  "작성자 카드 — 이름/소개/작성 기사 수(Mock)",
  "공유 UI — Facebook/X/LinkedIn/링크 복사 (UI 전용, 실제 공유 API 없음)",
  "반응형 — 데스크톱 본문+Sidebar, 모바일 본문 우선 Sidebar 하단",
  "접근성 — article/aside/nav/time/heading 레벨/aria-current",
  "실제 라우트 — /category/[slug], /news/[slug]는 mock 데이터 기준 정적 페이지로 생성된다",
];

/**
 * TASK-009 카테고리/뉴스 상세 페이지 컴포넌트 개발용 미리보기 페이지.
 *
 * `@/data/mock-news`, `@/data/mock-article-body`만 사용하며, 실제
 * 라우트(`/category/[slug]`, `/news/[slug]`)와 동일한 컴포넌트를
 * 재사용해 검수한다. 실제 API·댓글·로그인·북마크는 구현하지 않는다.
 */
export function ArticlePreviewContent() {
  const demoCategory = getCategoryBySlug("politics");
  const categoryArticles = demoCategory ? getArticlesByCategory(demoCategory.slug) : [];
  const latestFirst = getLatestArticles(undefined, categoryArticles);
  const featured = categoryArticles.find((article) => article.isFeatured) ?? latestFirst[0];
  const featuredItems = featured
    ? latestFirst.filter((article) => article.id !== featured.id).slice(0, 4)
    : [];

  const demoArticle =
    getArticleBySlug("it-science-ondevice-ai-launch") ?? getLatestArticles(1)[0];
  const body = buildArticleBody(demoArticle);
  const headings = extractHeadings(body);
  const related = getRelatedArticles(demoArticle, 4);
  const hero = demoArticle.heroImage ?? demoArticle.thumbnail;
  const shareUrl = `${siteConfig.siteUrl}/news/${demoArticle.slug}`;

  return (
    <div className="container-dashboard py-12">
      <ReadProgressBar targetId={ARTICLE_DEMO_CONTENT_ID} />

      <header className="mb-12">
        <p className="type-metadata mb-3 text-accent-primary">Development Only · TASK-009</p>
        <h1 className="type-page-title break-url">카테고리 · 뉴스 상세 페이지 미리보기</h1>
        <p className="type-body mt-4 max-w-prose text-text-secondary">
          카테고리 메인 페이지와 뉴스 상세 페이지에서 사용하는 컴포넌트 검수용
          페이지다. 이 페이지 자체가 상단 진행률 바(Read Progress)의
          대상이며, 아래로 스크롤하면 최상단 바가 채워지는 것을 확인할 수
          있다.
        </p>
      </header>

      <Section
        id="category-page"
        title="1. 카테고리 페이지"
        description="카테고리 제목/설명, Featured News, 페이지네이션 자리(UI)를 확인한다. 최신/인기 뉴스 섹션은 TASK-007 섹션을 그대로 사용하므로 실제 라우트에서 확인한다."
      >
        {demoCategory && (
          <div className="flex flex-col gap-6">
            <CategoryHeader category={demoCategory} />
            {featured && <CategoryNewsGrid featured={featured} items={featuredItems} />}
            <PaginationPlaceholder />
            <LinkButton href={`/category/${demoCategory.slug}`} variant="outline" size="sm" className="self-start">
              실제 /category/{demoCategory.slug} 페이지 열기
            </LinkButton>
          </div>
        )}
      </Section>

      <Section
        id="article-header"
        title="2. 기사 메타 정보"
        description="제목, 부제목, 대표 이미지, 카테고리, 작성자, 발행일, 수정일, 조회수를 확인한다."
      >
        <div className="flex max-w-[44rem] flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <CategoryBadge category={demoArticle.category} />
          </div>
          <h3 className="type-article-title break-keep">{demoArticle.title}</h3>
          {demoArticle.subtitle && (
            <p className="type-body break-keep text-text-secondary">{demoArticle.subtitle}</p>
          )}
          <ArticleMeta article={demoArticle} />
          <NewsImage src={hero.url} alt={hero.alt} ratio="16:9" className="rounded-lg" />
        </div>
      </Section>

      <Section
        id="article-body-toc"
        title="3. 본문 & 목차(TOC)"
        description="H2/H3/Paragraph/List/Quote/Image placeholder를 지원하는 본문과, heading 기반 목차를 함께 확인한다. 스크롤하면 목차의 현재 위치가 강조된다(aria-current=&quot;location&quot;)."
      >
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_16rem]">
          <div id={ARTICLE_DEMO_CONTENT_ID} className="max-w-[44rem]">
            <ArticleBody blocks={body} />
          </div>
          <aside aria-label="목차 미리보기" className="lg:sticky lg:top-24 lg:h-fit">
            <TableOfContents headings={headings} />
          </aside>
        </div>
      </Section>

      <Section id="related" title="4. 관련 기사" description="같은 카테고리 + 최신 기사를 뉴스 카드 시스템(TASK-007)으로 재사용한다.">
        <RelatedNews articles={related} />
      </Section>

      <Section id="author" title="5. 작성자 정보" description="이름, 소개, 작성 기사 수(Mock)를 표시한다.">
        <div className="max-w-md">{demoArticle.author && <AuthorCard author={demoArticle.author} />}</div>
      </Section>

      <Section id="share" title="6. 공유 UI" description="Facebook / X / LinkedIn / 링크 복사. 링크 복사만 실제로 클립보드에 복사한다.">
        <ShareButtons title={demoArticle.title} url={shareUrl} />
      </Section>

      <Section id="detail-link" title="7. 실제 라우트">
        <LinkButton href={`/news/${demoArticle.slug}`} variant="secondary" size="sm" className="self-start">
          실제 /news/{demoArticle.slug} 페이지 열기
        </LinkButton>
      </Section>

      <SubSection title="완료 조건 체크리스트">
        <div className="rounded-md border border-border-default bg-surface p-6">
          <ul className="flex flex-col gap-3">
            {CHECKLIST.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-text-secondary">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-success" aria-hidden />
                <span className="type-body">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </SubSection>
    </div>
  );
}
