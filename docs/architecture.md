# 아키텍처 문서 (TASK-001)

## 1. 프로젝트 목적

`NOVA NEWS`(임시 서비스명)는 실시간 속보 중심의 종합 뉴스 홈페이지다. 핵심 목표는
빠른 정보 전달, 강렬한 시각적 임팩트, 높은 가독성, 모바일 최적화다. 서비스명은
아직 확정되지 않았으므로 `src/config/site.ts` 한 곳에서만 관리한다.

TASK-001의 범위는 화려한 메인 화면이나 실제 뉴스 수집 기능이 아니라, 이후
Task에서 안정적으로 확장 가능한 프로젝트 기반(구조, 규칙, 설정, 타입, 샘플
데이터, 기본 라우팅)을 마련하는 것이다.

## 2. 사용 기술

- Next.js (App Router)
- React
- TypeScript (strict 모드)
- Tailwind CSS
- ESLint
- Prettier
- pnpm
- Lucide React
- clsx, tailwind-merge

설치 시점 기준 각 패키지의 최신 안정 버전을 사용했으며, 베타/카나리/실험 버전은
사용하지 않았다.

## 3. 폴더 구조

```text
src/
├─ app/            # 라우팅, 레이아웃, 오류/로딩 처리 등 App Router 파일
├─ components/
│  ├─ common/      # 여러 도메인에서 공용으로 쓰는 컴포넌트
│  ├─ layout/       # 헤더, 푸터 등 레이아웃 관련 컴포넌트
│  ├─ news/          # 뉴스 도메인 전용 컴포넌트
│  └─ ui/            # 버튼 등 범용 UI 프리미티브
├─ config/         # 사이트 전역 설정 (site.ts)
├─ constants/       # 카테고리, 내비게이션 등 정적 상수
├─ data/            # 목(mock) 데이터
├─ hooks/           # 커스텀 React 훅
├─ lib/             # 유틸리티 함수 (cn, 날짜 포맷 등)
├─ styles/          # 전역 스타일
└─ types/           # 공통 TypeScript 타입 정의

public/
├─ images/
├─ icons/
└─ placeholders/    # 로컬 플레이스홀더 이미지 (SVG 그라데이션)
```

컴포넌트, 타입, 데이터, 설정을 각각 분리해 역할 경계를 명확히 유지한다.

## 4. 데이터 흐름

현재 단계에서는 외부 API, 크롤링, 데이터베이스를 사용하지 않는다. `src/data/`의
목 데이터가 유일한 데이터 소스이며, 페이지와 컴포넌트는 이 데이터를 직접
import하거나 `src/data/mock-news.ts`가 제공하는 헬퍼 함수
(`getArticlesByCategory`, `getArticleBySlug` 등)를 통해 조회한다.

향후 실제 뉴스 데이터 연동 시에도 이 헬퍼 함수의 시그니처를 최대한 유지해
컴포넌트 쪽 변경을 최소화하는 것을 목표로 한다.

## 5. 서버 컴포넌트 사용 원칙

- 기본값은 서버 컴포넌트다. `"use client"`는 반드시 필요한 파일에만 선언한다.
- 데이터 조회, 목록 렌더링처럼 상호작용이 필요 없는 부분은 서버 컴포넌트로
  유지한다.
- 메타데이터(`generateMetadata`, `metadata` export)는 서버 컴포넌트에서만
  가능하므로 관련 파일은 클라이언트 컴포넌트로 전환하지 않는다.

## 6. 클라이언트 컴포넌트 사용 원칙

- 이벤트 핸들러, 브라우저 API, React state/effect가 필요한 경우에만
  `"use client"`를 사용한다.
- 이번 Task에서는 `error.tsx`, `global-error.tsx`만 클라이언트 컴포넌트다
  (Next.js 규약상 오류 경계는 클라이언트 컴포넌트여야 한다).
- 향후 인터랙션이 필요한 뉴스 카드, 캐러셀 등은 `components/news`,
  `components/ui` 하위의 작은 단위 클라이언트 컴포넌트로 분리한다.

## 7. 뉴스 데이터 모델

`src/types/news.ts`에 다음 타입을 정의했다.

- `NewsCategory`: 카테고리 메타데이터 (id, slug, name, order, isVisible 등)
- `NewsSource`: 가상 언론사 정보
- `Author`: 작성자 정보
- `MediaAsset`: 이미지/영상 자산 정보 (로컬 플레이스홀더 참조)
- `NewsArticle`: 기사 전체 모델 (카테고리, 출처, 작성자, 통계, 태그 포함)
- `BreakingNewsItem`: 속보 타이틀, 수준(normal/urgent/critical), 활성 여부
- `TrendingKeyword`: 인기 키워드 순위, 이전 순위, 변화 상태

모든 샘플 데이터(`src/data/`)는 완전히 가상의 언론사, 인물, 사건을 기반으로
작성했으며 실제 언론사의 기사·이미지·로고를 사용하지 않았다.

## 8. 설정 관리 방식

- 서비스명, 설명, 기본 로케일, 연락처, 소셜 링크 등은 `src/config/site.ts`의
  `siteConfig` 객체 한 곳에서만 관리한다.
- 카테고리 정의와 순서는 `src/constants/categories.ts`에서 관리하며,
  내비게이션(`src/constants/navigation.ts`)은 이 카테고리 목록을 기반으로
  파생된다.
- 브랜드명이 확정되면 `siteConfig.siteName` 등 설정값만 수정하면 되고, 개별
  컴포넌트나 페이지에 서비스명을 하드코딩하지 않는다.

## 9. 향후 API 연결 예정 지점 (TASK-012에서 구현)

TASK-012에서 이 절이 예고한 전환을 실제로 구현했다. `src/data/mock-*.ts`는
삭제하지 않고 "데이터 소스"로 남기되, 그 위에 비동기 서비스 계층
(`src/lib/news-api/`)과 이를 노출하는 Route Handler(`src/app/api/`)를
추가했다.

- `src/lib/news-api/articles.ts`, `breaking-news.ts`, `trending.ts`가
  `fetchLatestArticles`, `fetchArticleBySlug`, `fetchActiveBreakingNews`,
  `fetchTrendingKeywords` 등 비동기 함수를 제공한다. 실제 API/CMS/DB로
  교체할 때는 이 파일들의 내부 구현만 바꾸면 되고, 호출부(페이지/컴포넌트)는
  그대로 둘 수 있다.
- `src/app/api/articles`, `src/app/api/articles/[slug]`,
  `src/app/api/breaking-news`, `src/app/api/trending-keywords` Route
  Handler가 같은 서비스 계층을 재사용해 REST 형태의 API를 노출한다(향후
  외부 클라이언트가 호출할 수 있는 지점).
- 카테고리 · 태그 · 뉴스 상세 페이지는 이 서비스 계층을 `await`로 호출한다.
- 속보 티커(`BreakingTickerServer`) · 트렌딩 패널(`TrendingPanelServer`) ·
  Featured/Secondary Hero(`FeaturedHeroServer`, `SecondaryNewsGridServer`)는
  자주 갱신될 수 있는 데이터이므로 각각 작은 비동기 서버 컴포넌트로 분리해
  `<Suspense>`로 감싸 스트리밍한다.
- `src/config/news-api.ts`가 개발 환경 전용 인위적 지연과, 옵트인 실패
  시뮬레이션(`NEWS_API_SIMULATE_ERRORS=true`)을 관리한다.

## 9.1 검색 서버 사이드 전환 · 실시간 현황 스트리밍 · 캐시 재검증 (TASK-013)

- `src/lib/news-api/search.ts`의 `fetchSearchResults`가 `mock-search.ts`의
  `searchArticles`를 감싼다. `GET /api/search`가 이를 재사용하고,
  `SearchPageContent`(클라이언트 컴포넌트)는 더 이상 `searchArticles`를
  직접 호출하지 않고 이 API를 debounce + `AbortController`로 호출한다.
  로딩/에러 상태는 TASK-007/010에서 이미 준비돼 있던
  `SearchResults`/`NewsCardGrid`의 `isLoading`/`error`/`onRetry` prop을
  그대로 사용한다.
- `src/lib/news-api/live-status.ts`의 `fetchLiveStatus`가 `LiveStatusPanel`의
  통계(오늘 기사 수, 진행 중 속보 수, 최근 업데이트)를 제공한다.
  `LiveStatusPanelServer`가 이를 호출해 다른 Hero 위젯과 동일하게
  `<Suspense>`로 스트리밍된다. 1초 tick 실시간 시계는 서버 데이터가 아니므로
  클라이언트 상태로 남아 있다.
- 이 프로젝트는 Cache Components(`use cache`)를 켜지 않았으므로
  (`next.config.ts`에 `cacheComponents: true` 없음), `fetchActiveBreakingNews`/
  `fetchTrendingKeywords`는 "이전 모델" 캐시 API인 `unstable_cache`로 각각
  30초/60초 TTL과 태그(`breaking-news`/`trending-keywords`)를 갖는다.
  `POST /api/revalidate`가 시크릿 헤더 검증 후 `revalidateTag(tag, { expire: 0 })`를
  호출해 즉시 무효화한다. 실제 이벤트(속보 발행 등)가 이 엔드포인트를
  호출하는 파이프라인은 아직 없다 — 엔드포인트만 제공한다.

## 10. 다음 Task에서 확장할 영역

- 실제 메인 화면 레이아웃과 뉴스 카드, 히어로 영역 등 시각적 컴포넌트 구현
- 카테고리별 목록 페이지, 기사 상세 페이지 라우팅 추가
- 속보 배너, 인기 키워드 위젯 등 상호작용 컴포넌트 구현
- 실제 뉴스 데이터 연동, 검색, 댓글 등 이번 Task에서 제외된 기능의 단계적 도입
