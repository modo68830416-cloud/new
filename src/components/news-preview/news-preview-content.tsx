import { CheckCircle2 } from "lucide-react";
import { getCategoryBySlug } from "@/constants/categories";
import { Section, SubSection } from "@/components/ui-preview/section";
import {
  BreakingNewsCard,
  CategoryNewsGrid,
  CategorySection,
  CompactNewsCard,
  CompactNewsCardSkeleton,
  CompactNewsList,
  FeaturedNewsCard,
  FeaturedNewsCardSkeleton,
  HorizontalNewsCard,
  HorizontalNewsCardSkeleton,
  LatestNewsList,
  LatestNewsSection,
  NewsCardGrid,
  NewsCardMeta,
  NewsEmptyState,
  NewsFeed,
  NewsGridSkeleton,
  NewsImage,
  NewsListSkeleton,
  NewsShareAction,
  NewsSourceLine,
  NewsSummary,
  NewsTitle,
  OpinionNewsCard,
  OpinionSection,
  PhotoNewsCard,
  PhotoNewsGrid,
  PhotoNewsSection,
  PopularNewsSection,
  RankedNewsCard,
  RankedNewsList,
  StandardNewsCard,
  StandardNewsCardSkeleton,
  VideoNewsCard,
  VideoNewsSection,
} from "@/components/news";
import { ErrorStateDemo } from "./error-state-demo";
import { ReducedMotionStatus } from "./reduced-motion-status";
import {
  previewBreakingArticles,
  previewCompactArticles,
  previewFeatured,
  previewFeedArticles,
  previewHorizontalArticles,
  previewLongSourceArticle,
  previewLongTitleArticle,
  previewMissingMetaArticle,
  previewNoImageArticle,
  previewOpinionArticles,
  previewPhotoArticles,
  previewRankedItems,
  previewStandardArticles,
  previewVideoArticles,
} from "./news-preview-data";

const CHECKLIST = [
  "Primitive — NewsImage(비율/fallback/overlay/zoom), NewsTitle(레벨/크기/줄 수), NewsSummary, NewsCardMeta, NewsSourceLine, NewsCardLink(stretched link)",
  "카드 9종 — Featured / Standard(sm·md·lg) / Horizontal / Compact / Breaking(normal·urgent·critical) / Photo / Video / Opinion / Ranked",
  "리스트 4종 — LatestNewsList / RankedNewsList / CompactNewsList / NewsFeed(list·grid·mixed)",
  "그리드 3종 — NewsCardGrid / CategoryNewsGrid / PhotoNewsGrid",
  "CategorySection + 특화 섹션 5종 (Latest/Popular/Photo/Video/Opinion)",
  "상태 — Loading skeleton, Empty, Error, 이미지 없음, 긴 제목, 긴 언론사명, 메타데이터 일부 누락",
  "이미지 최적화 — next/image, 고정 종횡비, sizes, 첫 화면만 priority, fallback surface",
  "접근성 — article/heading/time dateTime, 카드당 링크 1개, focus-visible, reduced motion",
  "카드는 mock 데이터를 직접 import하지 않는다 — 이 페이지가 props로 전달한다",
];

/**
 * TASK-007 뉴스 카드 시스템 개발용 미리보기 페이지.
 *
 * mock 데이터(`@/data/mock-news`)만 사용하며, 실제 API·상세 페이지·검색·
 * 로그인·댓글·북마크·영상 재생은 구현하지 않는다.
 */
export function NewsPreviewContent() {
  const politicsCategory = getCategoryBySlug("politics") ?? previewFeatured.category;

  return (
    <div className="container-dashboard py-12">
      <header className="mb-12">
        <p className="type-metadata mb-3 text-accent-primary">Development Only · TASK-007</p>
        <h1 className="type-page-title break-url">뉴스 카드 시스템 미리보기</h1>
        <p className="type-body mt-4 max-w-prose text-text-secondary">
          홈페이지, 카테고리 페이지, 추천 영역 등에서 재사용할 뉴스 카드·리스트·
          그리드·섹션 컴포넌트 검수용 페이지다. TASK-001 mock 데이터만 사용하며,
          카드는 데이터를 항상 props로 전달받는다(내부에서 mock을 직접 import하지
          않는다).
        </p>
      </header>

      <Section
        id="primitives"
        title="1. Primitives"
        description="모든 카드가 공유하는 저수준 조립 블록. 이미지 fallback/overlay, 제목 line-clamp, 메타데이터 조합, 필자 표시, stretched link를 확인한다."
      >
        <SubSection title="NewsImage — 비율">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
            {(["16:9", "4:3", "3:2", "1:1", "portrait"] as const).map((ratio) => (
              <div key={ratio} className="flex flex-col gap-2">
                <NewsImage
                  src={previewFeatured.thumbnail.url}
                  alt={previewFeatured.thumbnail.alt}
                  ratio={ratio}
                  className="rounded-md"
                />
                <p className="type-metadata text-center">{ratio}</p>
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection title="NewsImage — 이미지 없음 / overlay">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex flex-col gap-2">
              <NewsImage src={undefined} alt="이미지 없음 예시" ratio="4:3" className="rounded-md" />
              <p className="type-metadata text-center">fallback (src 없음)</p>
            </div>
            <div className="flex flex-col gap-2">
              <NewsImage
                src={previewFeatured.thumbnail.url}
                alt={previewFeatured.thumbnail.alt}
                ratio="4:3"
                overlay="subtle"
                className="rounded-md"
              />
              <p className="type-metadata text-center">overlay=&quot;subtle&quot;</p>
            </div>
            <div className="flex flex-col gap-2">
              <NewsImage
                src={previewFeatured.thumbnail.url}
                alt={previewFeatured.thumbnail.alt}
                ratio="4:3"
                overlay="strong"
                className="rounded-md"
              />
              <p className="type-metadata text-center">overlay=&quot;strong&quot;</p>
            </div>
          </div>
        </SubSection>

        <SubSection title="NewsTitle — 크기 / 줄 수">
          <div className="flex max-w-md flex-col gap-3">
            <NewsTitle size="xl" lineClamp={2}>
              {previewLongTitleArticle.title}
            </NewsTitle>
            <NewsTitle size="lg" lineClamp={2}>
              {previewLongTitleArticle.title}
            </NewsTitle>
            <NewsTitle size="md" lineClamp={1}>
              {previewLongTitleArticle.title}
            </NewsTitle>
            <NewsTitle size="xs" lineClamp={2}>
              {previewLongTitleArticle.title}
            </NewsTitle>
          </div>
        </SubSection>

        <SubSection title="NewsSummary / NewsCardMeta / NewsSourceLine / NewsShareAction">
          <div className="flex max-w-md flex-col gap-4">
            <NewsSummary lineClamp={2}>{previewFeatured.summary}</NewsSummary>
            <NewsCardMeta
              category={previewFeatured.category}
              sourceName={previewFeatured.source.name}
              publishedAt={previewFeatured.publishedAt}
              viewCount={previewFeatured.viewCount}
              commentCount={previewFeatured.commentCount}
              isLive
            />
            <NewsSourceLine
              author={previewFeatured.author}
              source={previewFeatured.source}
              authorRole={previewFeatured.author?.role}
            />
            <NewsShareAction />
          </div>
        </SubSection>
      </Section>

      <Section
        id="cards"
        title="2. 뉴스 카드"
        description="목적이 분명한 9종의 카드. 공통 Primitive를 조합하되 variant마다 필요한 정보만 노출한다."
      >
        <SubSection title="FeaturedNewsCard">
          <FeaturedNewsCard article={previewFeatured} priority ctaHref="#" ctaLabel="카테고리 더 보기" />
        </SubSection>

        <SubSection title="StandardNewsCard — small / medium / large">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StandardNewsCard article={previewStandardArticles[0]} size="small" />
            <StandardNewsCard article={previewStandardArticles[1]} size="medium" />
            <StandardNewsCard article={previewStandardArticles[2]} size="large" />
          </div>
        </SubSection>

        <SubSection title="HorizontalNewsCard">
          <div className="flex max-w-xl flex-col gap-3">
            <HorizontalNewsCard article={previewHorizontalArticles[0]} />
            <HorizontalNewsCard article={previewHorizontalArticles[1]} imagePosition="right" size="sm" />
          </div>
        </SubSection>

        <SubSection title="CompactNewsCard">
          <div className="max-w-sm">
            {previewCompactArticles.slice(0, 4).map((article, index) => (
              <CompactNewsCard key={article.id} article={article} index={index + 1} showThumbnail={index === 0} />
            ))}
          </div>
        </SubSection>

        <SubSection title="BreakingNewsCard — normal / urgent / critical">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <BreakingNewsCard article={previewBreakingArticles[0]} level="normal" />
            <BreakingNewsCard
              article={previewBreakingArticles[1]}
              level="urgent"
              locationLabel="서울"
            />
            <BreakingNewsCard
              article={previewBreakingArticles[2]}
              level="critical"
              topicLabel="긴급 대피"
            />
          </div>
        </SubSection>

        <SubSection title="PhotoNewsCard">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {previewPhotoArticles.slice(0, 3).map((article) => (
              <PhotoNewsCard key={article.id} article={article} />
            ))}
          </div>
        </SubSection>

        <SubSection title="VideoNewsCard">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {previewVideoArticles.slice(0, 3).map((article) => (
              <VideoNewsCard key={article.id} article={article} />
            ))}
          </div>
        </SubSection>

        <SubSection title="OpinionNewsCard">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {previewOpinionArticles.slice(0, 2).map((article) => (
              <OpinionNewsCard key={article.id} article={article} />
            ))}
          </div>
        </SubSection>

        <SubSection title="RankedNewsCard">
          <div className="max-w-md">
            {previewRankedItems.slice(0, 5).map((item) => (
              <RankedNewsCard
                key={item.article.id}
                article={item.article}
                rank={item.rank}
                change={item.change}
                delta={item.delta}
                showThumbnail={item.rank === 1}
              />
            ))}
          </div>
        </SubSection>
      </Section>

      <Section
        id="lists-grids"
        title="3. 리스트 & 그리드"
        description="여러 카드를 조합하는 컨테이너. 외부 masonry 라이브러리 없이 Flexbox/CSS Grid만 사용한다."
      >
        <SubSection title="LatestNewsList (날짜별 그룹)">
          <div className="max-w-2xl">
            <LatestNewsList articles={previewHorizontalArticles} groupByDate showMoreHref="#" />
          </div>
        </SubSection>

        <SubSection title="RankedNewsList (Top 10)">
          <div className="max-w-md">
            <RankedNewsList items={previewRankedItems} />
          </div>
        </SubSection>

        <SubSection title="CompactNewsList">
          <div className="max-w-sm">
            <CompactNewsList articles={previewCompactArticles} showThumbnail />
          </div>
        </SubSection>

        <SubSection title="NewsCardGrid">
          <NewsCardGrid articles={previewStandardArticles} columns={4} />
        </SubSection>

        <SubSection title="CategoryNewsGrid">
          <CategoryNewsGrid featured={previewFeatured} items={previewStandardArticles} />
        </SubSection>

        <SubSection title="PhotoNewsGrid">
          <PhotoNewsGrid articles={previewPhotoArticles} />
        </SubSection>

        <SubSection title="NewsFeed — list / grid / mixed">
          <div className="flex flex-col gap-8">
            <div>
              <p className="type-caption mb-2">layout=&quot;list&quot;</p>
              <NewsFeed articles={previewFeedArticles.slice(0, 3)} layout="list" />
            </div>
            <div>
              <p className="type-caption mb-2">layout=&quot;grid&quot;</p>
              <NewsFeed articles={previewFeedArticles.slice(0, 6)} layout="grid" columns={3} />
            </div>
            <div>
              <p className="type-caption mb-2">layout=&quot;mixed&quot;</p>
              <NewsFeed articles={previewFeedArticles} layout="mixed" columns={3} />
            </div>
          </div>
        </SubSection>
      </Section>

      <Section
        id="sections"
        title="4. 카테고리 섹션 & 특화 섹션"
        description="메인페이지 안에서 반복 사용할 재사용 섹션. 전체 카테고리 라우트/홈페이지 통합은 이번 Task 범위가 아니다."
      >
        <SubSection title="CategorySection (featured-grid / standard-grid / list)">
          <div className="flex flex-col gap-10">
            <CategorySection
              title={`${politicsCategory.name} 뉴스`}
              category={politicsCategory}
              featured={previewFeatured}
              items={previewStandardArticles}
              href="#"
              layout="featured-grid"
              compactItems={previewCompactArticles.slice(0, 5)}
            />
            <CategorySection
              title="standard-grid 레이아웃"
              category={politicsCategory}
              featured={previewFeatured}
              items={previewStandardArticles}
              href="#"
              layout="standard-grid"
            />
            <CategorySection
              title="list 레이아웃"
              category={politicsCategory}
              featured={previewFeatured}
              items={previewHorizontalArticles.slice(0, 3)}
              href="#"
              layout="list"
            />
          </div>
        </SubSection>

        <SubSection title="LatestNewsSection">
          <LatestNewsSection
            articles={previewHorizontalArticles}
            lastUpdated={previewFeatured.publishedAt}
            showMoreHref="#"
          />
        </SubSection>

        <SubSection title="PopularNewsSection">
          <div className="max-w-md">
            <PopularNewsSection items={previewRankedItems} showMoreHref="#" />
          </div>
        </SubSection>

        <SubSection title="PhotoNewsSection">
          <PhotoNewsSection articles={previewPhotoArticles} showMoreHref="#" />
        </SubSection>

        <SubSection title="VideoNewsSection">
          <VideoNewsSection articles={previewVideoArticles} showMoreHref="#" />
        </SubSection>

        <SubSection title="OpinionSection">
          <OpinionSection articles={previewOpinionArticles} showMoreHref="#" />
        </SubSection>
      </Section>

      <Section
        id="states"
        title="5. 로딩 / 빈 상태 / 오류"
        description="실제 콘텐츠와 유사한 크기의 skeleton으로 layout shift를 최소화하고, empty/error는 공통 UI 문구를 사용한다."
      >
        <SubSection title="Card skeleton">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <FeaturedNewsCardSkeleton className="sm:col-span-2 lg:col-span-4" />
            <StandardNewsCardSkeleton />
            <HorizontalNewsCardSkeleton />
            <CompactNewsCardSkeleton />
          </div>
        </SubSection>

        <SubSection title="List / Grid skeleton">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <NewsListSkeleton variant="horizontal" count={3} />
            <NewsGridSkeleton columns={2} count={4} />
          </div>
        </SubSection>

        <SubSection title="컴포넌트에 isLoading/error/empty를 전달했을 때">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div>
              <p className="type-caption mb-2">isLoading</p>
              <NewsCardGrid articles={[]} columns={2} isLoading skeletonCount={2} />
            </div>
            <div>
              <p className="type-caption mb-2">empty (articles=[])</p>
              <NewsCardGrid articles={[]} columns={2} />
            </div>
            <div>
              <p className="type-caption mb-2">error</p>
              <ErrorStateDemo />
            </div>
          </div>
        </SubSection>

        <SubSection title="NewsEmptyState (다른 카테고리 이동 CTA 포함)">
          <NewsEmptyState actionHref="/" actionLabel="홈으로 이동" />
        </SubSection>
      </Section>

      <Section
        id="edge-cases"
        title="6. 엣지 케이스"
        description="이미지 없음, 긴 제목, 긴 언론사명, 메타데이터 일부 누락 상황에서도 오류 없이 렌더링되는지 확인한다."
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="type-caption mb-2">이미지 없는 카드</p>
            <StandardNewsCard article={previewNoImageArticle} />
          </div>
          <div>
            <p className="type-caption mb-2">긴 제목</p>
            <StandardNewsCard article={previewLongTitleArticle} />
          </div>
          <div>
            <p className="type-caption mb-2">긴 언론사 이름</p>
            <HorizontalNewsCard article={previewLongSourceArticle} />
          </div>
          <div>
            <p className="type-caption mb-2">메타데이터 일부 누락 (author 없음)</p>
            <FeaturedNewsCard article={previewMissingMetaArticle} />
          </div>
        </div>
      </Section>

      <Section
        id="reduced-motion"
        title="7. Reduced Motion"
        description="OS/브라우저에서 '동작 줄이기'를 켜면 hover zoom, stagger 등장, critical pulse가 축소되거나 제거된다. BreakingBadge의 critical pulse와 카드 hover 애니메이션으로 확인한다."
      >
        <div className="flex flex-col gap-4">
          <ReducedMotionStatus />
          <div className="max-w-sm">
            <BreakingNewsCard article={previewBreakingArticles[2]} level="critical" topicLabel="긴급" />
          </div>
        </div>
      </Section>

      <Section id="checklist" title="8. 완료 조건 체크리스트">
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
      </Section>
    </div>
  );
}
