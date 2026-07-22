# TASK-012 — 뉴스 데이터 API 통합 및 서버 사이드 데이터 페칭 구조

## 목적

TASK-001 ~ TASK-011까지는 `src/data/mock-*.ts`의 동기 함수를 페이지·컴포넌트가
직접 import해서 호출했다. 이번 Task에서는 이를 **실제 API 연동을 상정한
비동기 데이터 페칭 구조**로 전환한다.

실제 외부 뉴스 API(유료 API, 실제 언론사 데이터)는 사용하지 않는다. 계속
가상의 mock 데이터를 사용하되, 이를 내부 REST 형태의 Route Handler(API) 뒤에
두고, 서버 컴포넌트는 비동기 서비스 계층을 `await`로 호출하는 방식으로
바꾼다. 향후 실제 CMS/DB/외부 API로 교체할 때 서비스 계층 내부 구현만
바꾸면 되도록 설계한다(`docs/architecture.md` 9절에서 예고한 지점).

---

# 선행 조건

- TASK-001 ~ TASK-011 완료
- `pnpm lint`, `pnpm typecheck`, `pnpm build`가 성공한다

---

# 구현 목표

1. 비동기 뉴스 API 서비스 계층 (`src/lib/news-api/`)
2. 이 서비스 계층을 노출하는 Route Handlers (`src/app/api/`)
3. 카테고리 · 태그 · 뉴스 상세 페이지의 데이터 조회를 서비스 계층 호출로 전환
4. 실시간성 위젯(속보 티커, 트렌딩 패널, Featured/Secondary Hero)을 서버에서
   비동기로 조회해 스트리밍(`<Suspense>`)으로 전달
5. 목록형 라우트에 `loading.tsx` 스켈레톤 추가
6. 개발 환경에서만 동작하는 네트워크 지연 · 실패 시뮬레이션(옵트인)

---

# 폴더 구조

```text
src/lib/news-api/
 ├─ simulate.ts     (지연/에러 시뮬레이션, NewsApiError)
 ├─ articles.ts      (fetchLatestArticles, fetchArticleBySlug 등)
 ├─ breaking-news.ts (fetchActiveBreakingNews)
 ├─ trending.ts       (fetchTrendingKeywords)
 └─ index.ts

src/app/api/
 ├─ articles/route.ts            (GET, 목록 + 필터)
 ├─ articles/[slug]/route.ts     (GET, 상세 + 관련 기사)
 ├─ breaking-news/route.ts       (GET)
 └─ trending-keywords/route.ts   (GET)

src/config/
 └─ news-api.ts (환경변수 기반 지연/에러율 설정)
```

기존 `src/data/mock-*.ts` 파일은 삭제하지 않는다 — 서비스 계층이 내부적으로
그대로 재사용하는 "데이터 소스" 역할을 계속한다. 실제 API/DB로 교체할 때는
`src/lib/news-api/*.ts` 내부 구현만 교체한다.

---

# 서비스 계층

`src/lib/news-api/*`의 각 함수는 기존 `mock-news.ts` / `mock-search.ts` /
`mock-breaking-news.ts` / `mock-trending-keywords.ts`의 동기 함수를 감싼
**비동기** 함수다. 시그니처는 기존 헬퍼와 최대한 유사하게 유지하되 모두
`Promise`를 반환한다.

- `fetchLatestArticles`, `fetchPopularArticles`, `fetchArticlesByCategory`,
  `fetchArticleBySlug`, `fetchRelatedArticles`, `fetchFeaturedHeroArticle`,
  `fetchSecondaryHeroArticles`, `fetchArticlesByTagSlug`
- `fetchActiveBreakingNews`
- `fetchTrendingKeywords(limit?)`

각 함수는 호출 시 `simulateNetwork()`를 거친다. 이 함수는

- 개발 환경에서만 짧은 인위적 지연(수백 ms)을 추가해 로딩 상태를 눈으로
  확인할 수 있게 한다.
- `NEWS_API_SIMULATE_ERRORS=true`일 때만 낮은 확률로 `NewsApiError`를
  던진다(기본 비활성 — 빌드/CI가 우연히 실패하지 않도록).
- 프로덕션 빌드(`NODE_ENV=production`)에서는 지연을 넣지 않는다.

같은 요청 안에서 중복 호출을 막기 위해 React `cache()`로 각 함수를 감싼다.

---

# Route Handlers

내부 서버 컴포넌트는 이 Route Handler를 다시 `fetch`로 호출하지 않는다
(같은 서버 안에서 자기 자신의 API를 HTTP로 부르는 것은 불필요한 왕복이므로
피한다 — Next.js 공식 가이드 권장 사항). 대신 서비스 계층 함수를 직접
호출한다. Route Handler는 서비스 계층을 그대로 재사용해 **외부에 노출 가능한
REST API**를 제공하는 용도다(향후 모바일 클라이언트, 다른 서비스에서 호출
가능).

- `GET /api/articles?category=&tag=&contentType=&breaking=&featured=&sort=latest|popular&limit=`
- `GET /api/articles/:slug` → 기사 + 관련 기사 포함, 없으면 404
- `GET /api/breaking-news`
- `GET /api/trending-keywords?limit=`

모든 응답은 JSON이며 기존 mock 데이터 그대로를 직렬화한다(새 언론사/기사를
추가하지 않는다).

---

# 페이지 전환

- `/category/[slug]`: `getArticlesByCategory` 등 동기 호출 → 서비스 계층의
  `fetchArticlesByCategory`/`fetchLatestArticles`/`fetchPopularArticles`
  `await` 호출로 교체
- `/tag/[slug]`: `getArticlesByTagSlug` → `fetchArticlesByTagSlug`
- `/news/[slug]`: `getArticleBySlug`/`getRelatedArticles` →
  `fetchArticleBySlug`/`fetchRelatedArticles`

`generateStaticParams`는 빌드 타임 전용 slug 목록 생성이므로 그대로 동기
함수(`VISIBLE_CATEGORIES`, `getAllTags`, `MOCK_NEWS`)를 사용한다 — 이 부분은
API 호출 대상이 아니다.

---

# 실시간 위젯 스트리밍

다음 위젯은 "실제로 자주 갱신될 수 있는" 데이터이므로 각각 작은 비동기
서버 컴포넌트로 분리하고 `<Suspense>` + 스켈레톤 fallback으로 감싼다. 나머지
레이아웃/페이지는 그대로 즉시 렌더링된다.

- `BreakingTicker` (Header 아래 속보 티커) — `LayoutProvider`에서 스트리밍
- `TrendingPanel`, `FeaturedHero`, `SecondaryNewsGrid` — `HeroSection`에서
  스트리밍

`LiveStatusPanel`(실시간 시계 · 오늘 기사 수 · 진행 중 속보 수)은 이번
Task 범위에서 제외한다 — 클라이언트 전용 로컬 시계 위젯이라 서버 스트리밍의
이점이 적다(다음 Task 후보로 남긴다).

---

# 로딩 상태

`/category/[slug]`, `/tag/[slug]`, `/news/[slug]`에 `loading.tsx`를
추가한다. 기존 `Skeleton` 프리미티브(TASK-002/003)를 재사용하고 새로운
스켈레톤 디자인을 만들지 않는다.

---

# 구현하지 않을 기능

- 실제 외부 뉴스 API/유료 API 키 연동
- 데이터베이스 · CMS 연동
- 검색 페이지(TASK-010, `mock-search`의 검색·자동완성 로직) API 이전 — 태그
  기사 목록 조회만 이번 Task에서 서비스 계층을 거치고, 검색창/자동완성/필터
  자체의 클라이언트 로직은 그대로 둔다
- 실제 캐시 무효화 파이프라인, TTL 기반 재검증(ISR) 구현
- 인증이 필요한 API, rate limiting
- `LiveStatusPanel`의 서버 스트리밍 전환

---

# 완료 조건

- `src/lib/news-api/` 비동기 서비스 계층 도입, 기존 mock 함수는 내부적으로만 사용
- `/api/articles`, `/api/articles/:slug`, `/api/breaking-news`,
  `/api/trending-keywords` Route Handler 동작
- 카테고리 · 태그 · 뉴스 상세 페이지가 서비스 계층을 통해 데이터를 조회한다
- 속보 티커 · 트렌딩 패널 · Featured/Secondary Hero가 `<Suspense>` 스트리밍으로
  전환된다
- 위 3개 라우트에 `loading.tsx` 제공
- 개발 환경 한정 네트워크 지연/에러 시뮬레이션(기본 에러는 비활성)
- pnpm lint 성공
- pnpm typecheck 성공
- pnpm build 성공

---

# 검증

```bash
pnpm lint
pnpm typecheck
pnpm build
```

---

# Claude Code 실행 프롬프트

현재 저장소와 TASK-001~011 결과를 분석한 후 TASK-012만 구현한다.

목표는 `src/data/mock-*.ts` 동기 함수를 직접 호출하던 구조를, 실제 API 연동을
상정한 비동기 서비스 계층(`src/lib/news-api/`)과 이를 노출하는 Route
Handler(`src/app/api/`)로 전환하는 것이다. 실제 외부 뉴스 API나 DB는
사용하지 않고 계속 가상의 mock 데이터를 사용한다.

카테고리 · 태그 · 뉴스 상세 페이지, 그리고 속보 티커 · 트렌딩 패널 ·
Featured/Secondary Hero 위젯의 데이터 조회를 이 서비스 계층 호출로 바꾸고,
실시간성 위젯은 `<Suspense>` 스트리밍으로 전환한다. 기존 컴포넌트의 optional
props(`items`, `keywords`, `article`, `articles`)는 이미 이런 전환을 염두에
두고 설계되어 있으므로 그대로 재사용하고 새 prop을 임의로 추가하지 않는다.

작업 완료 후 lint, typecheck, build를 실행하고 결과를 보고한다.

---

# 다음 Task

TASK-013에서는 검색(TASK-010)의 서버 사이드 전환과 `LiveStatusPanel`의 실시간
스트리밍, 그리고 실제 캐시 재검증(revalidate) 전략을 다룬다.
