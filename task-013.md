# TASK-013 — 검색 서버 사이드 전환 · 실시간 현황 스트리밍 · 캐시 재검증 전략

## 목적

TASK-012에서 뉴스 목록/상세/속보/트렌딩에 비동기 서비스 계층
(`src/lib/news-api/`)과 Route Handler(`src/app/api/`)를 도입했다. 이번
Task에서는 TASK-012가 범위에서 제외했던 세 가지를 마저 다룬다.

1. 검색(TASK-010)의 서버 사이드 전환 — 클라이언트에서 직접 순수 함수를
   호출하던 방식을 `/api/search` 호출로 전환한다.
2. `LiveStatusPanel`(실시간 현황)을 다른 Hero 위젯과 같은 방식으로 서버에서
   스트리밍한다.
3. 실제 캐시 재검증(revalidate) 전략 — 속보/트렌딩 데이터에 `unstable_cache`
   기반 TTL 캐시와 태그 무효화 엔드포인트를 도입한다.

---

# 선행 조건

- TASK-001 ~ TASK-012 완료
- `pnpm lint`, `pnpm typecheck`, `pnpm build`가 성공한다

---

# 구현 목표

## 1. 검색 서버 사이드 전환

- `src/lib/news-api/search.ts`: 기존 `mock-search.ts`의 `searchArticles`를
  감싼 비동기 `fetchSearchResults(query, filters, sort)`
- `GET /api/search?q=&category=&contentType=&breaking=&live=&dateFrom=&dateTo=&sort=`
  Route Handler — 콤마로 구분된 다중 값(category, contentType)을
  `SearchFilterState`로 파싱해 서비스 계층을 호출한다.
- `SearchPageContent`를 `useMemo` 동기 계산에서 `/api/search` 호출로
  전환한다. 입력마다 매번 요청하지 않도록 짧게 debounce하고, 오래된 응답이
  최신 응답을 덮어쓰지 않도록 `AbortController`로 이전 요청을 취소한다.
- 로딩/에러 상태는 새로 만들지 않는다 — `SearchResults`/`NewsCardGrid`가
  이미 갖고 있는 `isLoading` / `error` / `onRetry` prop(TASK-007, TASK-010에서
  이미 이런 전환을 염두에 두고 만들어졌다)을 그대로 연결한다.
- 자동완성(`getAutocompleteSuggestions`), 최근/인기 검색어는 이번 Task
  범위 밖이다 — 계속 클라이언트에서 mock 함수를 직접 호출한다.

## 2. `LiveStatusPanel` 스트리밍

- `src/lib/news-api/live-status.ts`: `fetchLiveStatus()` —
  `{ todayArticleCount, breakingCount, lastUpdatedAt }` 반환. 기존
  `LiveStatusPanel` 내부 계산식(오늘 기사 수 = 전체 mock 기사 수, 속보 개수 =
  활성 속보 수, 최근 업데이트 = 속보 최신 항목 우선)을 그대로 서비스 계층으로
  옮긴다.
- `LiveStatusPanelProps`에 `todayArticleCount?`, `breakingCount?`,
  `lastUpdatedAt?`를 선택 필드로 추가한다(다른 Hero 위젯과 동일한 패턴 —
  값이 없으면 컴포넌트가 기존처럼 mock에서 직접 계산한다). 실시간 시계
  자체(1초 tick)는 서버 데이터가 아니므로 그대로 클라이언트 상태로 남는다.
- `LiveStatusPanelServer.tsx` 추가 후 `HeroSection`에서 다른 위젯과 동일하게
  `<Suspense>`로 감싼다.

## 3. 캐시 재검증(revalidate) 전략

이 프로젝트는 Cache Components(`use cache`)를 활성화하지 않았으므로
(`next.config.ts`에 `cacheComponents: true` 없음), "이전 모델"의 캐시 API인
`unstable_cache`/`revalidateTag`를 사용한다.

- `fetchActiveBreakingNews`, `fetchTrendingKeywords`의 실제 데이터 조회
  부분을 `unstable_cache`로 감싸고 각각 `revalidate`(속보 30초, 트렌딩
  60초)와 태그(`breaking-news`, `trending-keywords`)를 지정한다.
- `POST /api/revalidate` — 요청 바디 `{ tag: "breaking-news" | "trending-keywords" }`.
  헤더 `x-revalidate-secret`이 `REVALIDATE_SECRET` 환경변수(미설정 시 개발용
  기본값)와 일치할 때만 `revalidateTag(tag, { expire: 0 })`를 호출하고,
  그렇지 않으면 401을
  반환한다.
- 실제 이벤트(속보 발행, 배치 갱신 등)가 이 엔드포인트를 호출하는 파이프라인은
  구현하지 않는다 — 엔드포인트 자체만 제공한다.

---

# 폴더 구조

```text
src/lib/news-api/
 ├─ search.ts        (신규)
 ├─ live-status.ts   (신규)
 ├─ breaking-news.ts (unstable_cache 적용)
 └─ trending.ts       (unstable_cache 적용)

src/app/api/
 ├─ search/route.ts       (신규)
 └─ revalidate/route.ts   (신규)

src/components/hero/LiveStatusPanel/
 └─ LiveStatusPanelServer.tsx (신규)
```

---

# 구현하지 않을 기능

- 실제 검색 엔진(Elasticsearch/OpenSearch), 형태소 분석, 검색어 하이라이팅
  고도화
- 자동완성 · 최근 검색어 · 인기 검색어의 서버 전환(계속 클라이언트 mock)
- 실제 캐시 무효화를 트리거하는 이벤트/배치 파이프라인(웹훅, 크론 등) — 엔드포인트만 제공
- Cache Components(`use cache` directive) 프로젝트 전면 도입
- 검색 결과 페이지네이션의 실제 동작(계속 `PaginationPlaceholder` UI만)

---

# 완료 조건

- `/search`가 입력/필터 변경 시 `/api/search`를 호출해 결과를 받아온다
- 검색 로딩/에러 상태가 `SearchResults`/`NewsCardGrid`의 기존 prop을 통해
  화면에 반영된다
- `LiveStatusPanel`이 다른 Hero 위젯처럼 `<Suspense>` 스트리밍으로 서버
  데이터를 받는다
- `fetchActiveBreakingNews`/`fetchTrendingKeywords`가 `unstable_cache`로
  캐시되고, `POST /api/revalidate`로 태그 무효화가 가능하다
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

현재 저장소와 TASK-001~012 결과를 분석한 후 TASK-013만 구현한다.

목표는 세 가지다: (1) `/search` 페이지를 클라이언트 직접 계산에서
`/api/search` 호출로 전환하고 이미 존재하는 `SearchResults`/`NewsCardGrid`의
`isLoading`/`error`/`onRetry` prop을 실제로 연결한다. (2) `LiveStatusPanel`을
TASK-012의 `BreakingTicker`/`TrendingPanel`과 같은 방식(서버 컴포넌트 +
`<Suspense>`)으로 전환한다. (3) 속보/트렌딩 데이터에 `unstable_cache` 기반
TTL 캐시와 `revalidateTag`를 호출하는 `/api/revalidate` 엔드포인트를 추가한다.

자동완성/최근검색어/인기검색어, 실제 검색 엔진, 실제 캐시 무효화 파이프라인은
구현하지 않는다.

작업 완료 후 lint, typecheck, build를 실행하고 결과를 보고한다.

---

# 다음 Task

TASK-014에서는 접근성/성능 감사(Lighthouse 기준)와 남은 "준비 중" placeholder
(공유 버튼, 알림 등)의 실제 동작 연결 여부를 검토한다.
