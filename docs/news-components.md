# 뉴스 카드 시스템 (TASK-007)

`src/components/news/` 아래에 있는 뉴스 카드/리스트/그리드/섹션 컴포넌트
사용 가이드다. 미리보기 페이지는 [`/news-preview`](/news-preview)에서 모든
variant와 상태를 확인할 수 있다.

```ts
import {
  StandardNewsCard,
  NewsCardGrid,
  CategorySection,
  // ...
} from "@/components/news";
```

모든 export는 `src/components/news/index.ts` 배럴을 통해 제공된다.

---

## 1. 설계 원칙

- **목적이 분명한 카드만 만든다.** 모든 상황을 하나의 `NewsCard`로 처리하지
  않는다. 9종의 카드는 각자 다른 화면 맥락(대표 기사, 일반 그리드, 리스트,
  압축 목록, 속보, 사진, 영상, 오피니언, 순위)을 위해 존재한다.
- **데이터와 표현을 분리한다.** 카드/리스트/그리드/섹션은 `mock-news`를
  직접 import하지 않는다. 항상 `article` / `articles` / `featured` /
  `items` props로 데이터를 받는다. 페이지·섹션 컴포넌트가 데이터를
  준비해서 내려준다 (`/news-preview`의
  `src/components/news-preview/news-preview-data.ts` 참고).
- **기존 토큰/컴포넌트를 재사용한다.** 새 색상·spacing·duration을 만들지
  않는다. `Badge`, `CategoryBadge`, `BreakingBadge`, `LiveBadge`, `Surface`,
  `Card`, `Skeleton`, `EmptyState`, `ErrorState`, `TimeAgo`, `ViewCount`,
  `TrendingIndicator`(모두 TASK-003), `FadeIn`/`SlideUp`/`Stagger`(TASK-004)
  를 그대로 조합한다.
- **뉴스 가독성이 장식보다 우선한다.** 제목 가독성, 기사 중요도, 발행
  시각, 언론사/작성자, 카테고리, 이미지-제목 관계, 모바일 터치 편의성을
  항상 우선한다.

---

## 2. 폴더 구조

```text
src/components/news/
├─ primitives/     # 모든 카드가 공유하는 저수준 조립 블록
├─ cards/          # 목적이 분명한 카드 9종
├─ lists/          # 카드를 세로로 나열하는 컨테이너 4종
├─ grids/          # 카드를 그리드로 배치하는 컨테이너 3종
├─ sections/       # 제목 + 리스트/그리드를 묶은 재사용 섹션 6종
├─ states/         # skeleton / empty / error 공통 UI
├─ news.types.ts   # 이 시스템 전체가 공유하는 타입 정의
└─ index.ts         # 공개 API 배럴
```

---

## 3. 데이터 타입

카드 시스템은 새로운 평탄화된 `NewsItem` 타입을 만들지 않고, TASK-001의
`NewsArticle`(`src/types/news.ts`)을 그대로 사용한다. `NewsArticle`은 이미
`category`(`NewsCategory`), `source`(`NewsSource`), `thumbnail`
(`MediaAsset`)을 포함한 완전한 모델이고, `Header`/`FeaturedHero`/
`SecondaryNewsGrid`/`BreakingTicker` 등 기존 컴포넌트와 동일한 데이터
계약을 공유해야 카드가 실제로 재사용 가능하기 때문이다.

TASK-007에서는 다음 **선택(optional) 필드**만 추가했다 — 모두 optional이라
기존 사용처(위 컴포넌트들, `mock-news.ts`)를 깨뜨리지 않는다.

```ts
export type NewsContentType =
  | "article" | "breaking" | "photo" | "video" | "opinion" | "live";

// NewsArticle에 추가된 선택 필드
contentType?: NewsContentType;
isLive?: boolean;
isPremium?: boolean;
duration?: string; // "03:24" 같은 영상 길이 표시용
```

순위 변동(`TrendingKeywordChange` = `"up" | "down" | "same" | "new"`)은
TASK-001에서 이미 정의된 타입을 그대로 재사용하며, 순위 카드/리스트는
`RankedNewsListItem`(`{ article, rank, change?, delta? }`)으로 기사와 순위
컨텍스트를 함께 전달받는다.

`any`는 사용하지 않는다. 카드 크기, 이미지 비율, 레이아웃 등은 모두 명시적
union 타입(`NewsCardSize`, `NewsImageRatio`, `NewsFeedLayout`,
`CategorySectionLayout` 등, `news.types.ts`)으로 정의되어 있다.

---

## 4. Primitives

| 이름 | 역할 |
| --- | --- |
| `NewsImage` | `next/image` 기반 고정 종횡비 이미지. `src` 없으면 fallback surface, `overlay`/`overlayContent`로 오버레이, `enableZoom`으로 hover 확대 |
| `NewsTitle` | heading 레벨과 시각적 크기를 분리. `lineClamp`(1~4)로 제목을 강제로 한 줄에 넣지 않음 |
| `NewsSummary` | 2~3줄 요약. `hideOnMobile`로 작은 카드에서 숨김 |
| `NewsCardMeta` | 카테고리·언론사·작성자·시간·조회수·댓글수·길이·Live를 조합하는 메타 행 (전달된 필드만 표시) |
| `NewsSourceLine` | 필자 아바타(사진 또는 이니셜 fallback) + 이름 + 직책/언론사 |
| `NewsCardLink` | "Stretched link" 패턴으로 카드 전체를 클릭 영역으로 만든다 |
| `NewsShareAction` | 카드 전체 링크 위에서 독립적으로 클릭되는 보조 인터랙션 예시(공유 버튼, UI만) |

### NewsImage 비율

`"16:9" | "4:3" | "3:2" | "1:1" | "portrait"` 중 카드 목적에 맞게 고정값을
사용한다. 카드마다 비율이 제멋대로 바뀌지 않도록 카드 컴포넌트 내부에서
기본값을 정해두었다 (예: StandardNewsCard/HorizontalNewsCard는 각각
`16:9`/`4:3` 고정).

### NewsCardLink — 카드 전체 클릭 영역

카드 안에 실제 `<a>` 태그는 제목을 감싸는 것 하나뿐이다. `NewsCardLink`가
`::after` 가상 요소를 `position:absolute; inset:0`으로 카드 전체에 펼쳐서,
카드 어디를 클릭해도 그 하나의 링크가 반응한다.

- 카드 내부에 중첩된 링크를 만들지 않는다.
- 스크린 리더는 접근 가능한 이름(제목 텍스트)을 한 번만 읽는다.
- 카드 컨테이너(`article`)는 반드시 `newsCardContainerClassName`
  (`relative` + `focus-within` 포커스 링)을 가져야 한다 — 모든 카드
  컴포넌트가 이미 적용한다.
- 공유 버튼처럼 별도 인터랙션이 필요하면 `NewsShareAction`처럼 stretched
  link보다 높은 stacking 레이어(`z-sticky`)에 둔다.

---

## 5. 카드 9종 — 선택 기준

| 카드 | 언제 쓰나 | 요약 표시 | 이미지 |
| --- | --- | --- | --- |
| `FeaturedNewsCard` | 카테고리 대표 기사, 메인 중간 대형 섹션 | O (기본) | 큰 이미지, 데스크톱 좌우 분할 |
| `StandardNewsCard` | 가장 일반적인 그리드 카드 | size에 따라 다름 | 16:9 |
| `HorizontalNewsCard` | 최신 뉴스 피드, 카테고리 리스트 | O (기본) | 4:3 고정폭 썸네일 |
| `CompactNewsCard` | 사이드바, 실시간 업데이트, 압축 목록 | 없음 | 선택적 소형 |
| `BreakingNewsCard` | 속보 전용 | 없음 | 없음 (텍스트 중심) |
| `PhotoNewsCard` | 사진이 핵심인 기사 | 없음 (제목만 오버레이) | 큰 이미지 + 어두운 overlay |
| `VideoNewsCard` | 영상 기사 (재생 기능 없음, UI만) | 없음 | 16:9 + 재생 아이콘 + 길이 |
| `OpinionNewsCard` | 칼럼/사설 | O (기본) | 없음, 필자 아바타로 대체 |
| `RankedNewsCard` | 인기 뉴스 순위 항목 | 없음 | 선택적 소형(1:1) |

### 필수 / 선택 props

모든 카드는 최소 `article: NewsArticle`을 필수로 받는다. 그 외에는 모두
선택(optional)이며, 표에 없는 세부 옵션은 각 카드 파일의
`XxxNewsCardProps`(예: `FeaturedNewsCardProps`)를 참고한다. 공통 선택
props:

- `className?: string`
- `priority?: boolean` — **첫 화면에 노출되는 카드에만** true로 전달한다
  (그 외에는 기본 false, `next/image`가 lazy loading한다).
- `titleLevel?: "h2" | "h3" | "h4" | "h5"` — 카드가 어떤 heading 계층
  안에 놓이는지에 따라 호출부가 지정한다 (기본값은 카드마다 다르며, 보통
  `h3`/`h4`).

### 사용 예시

```tsx
import { StandardNewsCard } from "@/components/news";
import { MOCK_NEWS } from "@/data/mock-news";

<StandardNewsCard article={MOCK_NEWS[0]} size="medium" priority />
```

```tsx
import { BreakingNewsCard } from "@/components/news";

<BreakingNewsCard article={article} level="critical" topicLabel="긴급 대피" />
```

---

## 6. 리스트 4종

| 이름 | 구성 | 비고 |
| --- | --- | --- |
| `LatestNewsList` | `HorizontalNewsCard` 세로 나열 | `groupByDate`로 발행 날짜별 구분선(현재 시각에 의존하지 않고 기사 날짜만으로 그룹핑해 SSR/CSR 불일치가 없다) |
| `RankedNewsList` | `RankedNewsCard` 세로 나열 | `items: RankedNewsListItem[]`, `limit`(기본 10) |
| `CompactNewsList` | `CompactNewsCard` 세로 나열 | `limit`(기본 8), `showThumbnail` |
| `NewsFeed` | `layout="list" \| "grid" \| "mixed"` | mixed는 첫 기사만 `StandardNewsCard size="large"`, 나머지는 그리드 |

모든 리스트/그리드는 `isLoading` / `error` / (빈 배열) 세 가지 비동기
상태를 공통 인터페이스(`NewsAsyncStateProps`)로 지원한다.

---

## 7. 그리드 3종

- **`NewsCardGrid`** — `StandardNewsCard` 그리드. `columns: 2 | 3 | 4`
  (모바일 1열 → `sm` 2열 → `lg` `columns`열 고정).
- **`CategoryNewsGrid`** — 대표 기사 1개(`FeaturedNewsCard`, 2열×2행) +
  보조 기사 4개(`StandardNewsCard size="small"`). 모바일에서는 단순한
  세로 흐름으로 전환된다. 정확한 비주얼보다 정보 계층과 반응형 안정성을
  우선한다.
- **`PhotoNewsGrid`** — `PhotoNewsCard` 3~6개. `featuredFirst`(기본
  true, 기사 3개 이상)일 때 첫 타일을 2×2로 크게 배치한다.

---

## 8. CategorySection & 특화 섹션

`CategorySection`은 **카테고리 페이지 전체가 아니라** 메인페이지 안에서
카테고리별 묶음을 보여주는 재사용 섹션이다. `layout` prop으로 내부 구성을
바꾼다.

```ts
interface CategorySectionProps {
  title: string;
  category: NewsCategory;
  featured: NewsArticle;
  items: NewsArticle[];
  href: string;
  layout?: "featured-grid" | "standard-grid" | "list";
  compactItems?: NewsArticle[]; // 선택적 압축 리스트
}
```

특화 섹션 5종(`LatestNewsSection`, `PopularNewsSection`,
`PhotoNewsSection`, `VideoNewsSection`, `OpinionSection`)은 섹션
제목 + `아이콘 배지`(있는 경우) + `더 보기` 링크 + 해당 리스트/그리드를
조합한 최소한의 래퍼다. 실제 자동 갱신, 실시간 데이터 연동은 구현하지
않는다 (`lastUpdated`는 정적 문자열을 받아 표시만 한다).

---

## 9. 로딩 / 빈 상태 / 오류

- **Skeleton** — `FeaturedNewsCardSkeleton`, `StandardNewsCardSkeleton`,
  `HorizontalNewsCardSkeleton`, `CompactNewsCardSkeleton`,
  `NewsListSkeleton`, `NewsGridSkeleton`. 실제 카드와 동일한 종횡비/여백을
  사용해 layout shift를 최소화한다.
- **Empty** — `NewsEmptyState` (`@/components/ui/empty-state` 래핑).
  기본 문구: "아직 등록된 뉴스가 없습니다. / 새로운 소식이 업데이트되면
  이곳에 표시됩니다." `actionHref`로 다른 카테고리 이동 버튼을 추가할 수
  있다.
- **Error** — `NewsErrorState` (`@/components/ui/error-state` 래핑,
  `"use client"`). `onRetry` 콜백과 `homeHref` 링크 인터페이스만 준비되어
  있고, 실제 fetch 재시도 로직은 구현하지 않는다. **주의:** 함수(이벤트
  핸들러) props는 Server Component에서 직접 내려줄 수 없으므로, 정적
  페이지에서 데모할 때는 `onRetry`를 정의하는 부분을 별도의
  `"use client"` 컴포넌트로 분리한다 (`/news-preview`의
  `ErrorStateDemo` 참고).

모든 리스트/그리드 컴포넌트는 `isLoading` / `error` / 빈 배열을 직접
받아 위 상태를 자동으로 렌더링한다.

---

## 10. 이미지 규칙

- 항상 `next/image`(`NewsImage` primitive)를 사용한다. `fill` + 고정
  종횡비 wrapper로 layout shift를 방지한다.
- `sizes`는 카드 크기에 맞게 지정되어 있다 (예: 3열 그리드 카드는
  `(min-width: 1024px) 33vw, ...`).
- `priority`는 **첫 화면 핵심 이미지에만** 전달한다. 그 외에는 항상
  `loading="lazy"`(next/image 기본값)다.
- `alt`는 항상 필수다. `MediaAsset.alt`를 그대로 사용한다.
- 이미지가 없으면(`src` 빈 문자열/undefined) 깨진 이미지 아이콘 대신
  중립적인 `Surface` fallback(아이콘 + `role="img"` `aria-label`)을
  보여준다.
- 이미지 위 텍스트가 필요하면(`PhotoNewsCard`, `VideoNewsCard`)
  `overlay="strong"` 또는 `overlayContent`로 대비를 확보한다. CSS
  `background-image`로 핵심 뉴스 이미지를 처리하지 않는다.
- 원격 이미지 도메인이 필요해지면 `next.config.ts`의 `images` 설정에
  안전하게 추가한다 (현재는 로컬 SVG 플레이스홀더만 사용).

---

## 11. 제목 / 메타데이터 규칙

- 제목은 기본 2줄 `line-clamp`. 카드 크기에 따라 1~4줄까지 조정 가능
  (`NewsTitleProps.lineClamp`). 억지로 한 줄에 밀어넣지 않는다.
- 긴 한국어 제목은 `break-keep`으로 단어 단위 줄바꿈된다.
- 메타데이터는 카드마다 필요한 것만 보여준다 — `NewsCardMeta`는 전달된
  필드만 렌더링하므로, 카드 컴포넌트가 어떤 prop을 넘기느냐로 밀도를
  조절한다 (예: `CompactNewsCard`는 시간만, `FeaturedNewsCard`는
  언론사·작성자·시간·조회수).
- 발행/수정 시각은 항상 `TimeAgo`(`<time dateTime="...">`)를 사용한다.

---

## 12. 반응형 동작

- **Mobile(기본)** — 카드 1열, 최소 터치 영역(`touch-target`, 44×44px),
  요약은 필요한 카드에서만.
- **Tablet(`sm`, 640px~)** — 그리드 2열, `HorizontalNewsCard`는 요약이
  나타남.
- **Laptop/Desktop(`lg`, 1024px~)** — 그리드 3~4열, `FeaturedNewsCard`
  좌우 분할, `CategoryNewsGrid` 대표+보조 비대칭 배치.
- **Wide(`xl`/`2xl`)** — `container-dashboard`/`container-news`가 콘텐츠
  최대 폭을 제한해 카드가 과도하게 넓어지지 않는다.

375 / 430 / 768 / 1024 / 1440 / 1920px에서 가로 스크롤이 없어야 하며,
`/news-preview`에서 브라우저 폭을 조정해 확인한다.

---

## 13. 접근성 원칙

- 뉴스 한 건은 `<article>`(카드 컴포넌트의 최상위 요소).
- 제목은 문맥에 맞는 heading(기본 `h3`/`h4`, `titleLevel`로 조정).
- 발행/수정 시각은 `<time dateTime="...">` (`TimeAgo`).
- 카드 전체 클릭 영역은 "stretched link" 패턴으로 구현되어, 실제
  `<a>`는 카드당 1개뿐이다 — 스크린 리더가 같은 제목을 두 번 읽지
  않는다.
- 키보드 포커스 시 카드 전체에 focus ring이 표시된다
  (`newsCardContainerClassName`의 `focus-within` 처리).
- 순위 변화는 `TrendingIndicator`(아이콘 + `sr-only` 텍스트)로 색상 외
  대안을 제공한다.
- 영상 카드의 재생 아이콘은 `role="img" aria-label="동영상 재생"`으로
  감싼다.
- `prefers-reduced-motion: reduce`에서는 `BreakingBadge`의 critical
  pulse, `Stagger`/`FadeIn`/`SlideUp`의 등장 애니메이션, hover 확대가
  모두 축소되거나 제거된다(TASK-004 모션 시스템이 이미 처리).

---

## 14. 금지 사례 (하지 않은 것 / 하면 안 되는 것)

- 하나의 거대한 `NewsCard`에 모든 variant를 몰아넣지 않는다.
- 카드 내부에서 `mock-news`를 직접 import하지 않는다.
- 색상/spacing/duration을 임의로 하드코딩하지 않는다 (기존 CSS
  변수/Tailwind 스케일만 사용).
- 모든 이미지에 `priority`를 주지 않는다.
- CSS `background-image`로 핵심 뉴스 이미지를 처리하지 않는다.
- 카드 안에 중첩된 `<a>` 태그를 만들지 않는다.
- 실제 뉴스 API, DB, 크롤링, 무한 스크롤, 서버 페이지네이션, 검색, 기사
  상세 페이지, 댓글, 북마크, 실제 공유/영상 재생, 광고, 개인화 추천,
  관리자 기능, 카테고리 라우트 전체, 메인페이지 전체 통합 — 이번
  Task에서 구현하지 않는다 (TASK-008 이후).

---

## 15. 새로운 카드 variant 추가 절차

1. 정말 새로운 variant가 필요한지 먼저 확인한다 — 기존 9종 중 하나의
   prop(`size`, `layout` 등)으로 해결되지 않는지 검토한다.
2. `src/components/news/cards/`에 `xxx-news-card.tsx`를 추가한다. 반드시:
   - `article: NewsArticle`을 props로 받는다 (mock 직접 import 금지).
   - 최상위 요소는 `<article className={cn(newsCardContainerClassName, ...)}>`.
   - 제목은 `NewsTitle` + `NewsCardLink`로 감싼다 (stretched link 1개).
   - 이미지가 있다면 `NewsImage`를 사용한다 (`next/image` 직접 사용 금지).
   - 배지/메타는 `NewsCardMeta`와 TASK-003 배지 컴포넌트를 재사용한다.
3. Props 인터페이스는 해당 카드 파일에 `export interface XxxNewsCardProps`
   로 정의하고, 카드 전용이 아닌 공용 타입(예: 새 union)은
   `news.types.ts`에 추가한다.
4. 대응하는 skeleton이 필요하면 `states/news-card-skeleton.tsx`에 추가한다.
5. `src/components/news/index.ts`에 export를 추가한다.
6. `/news-preview`(`src/components/news-preview/news-preview-content.tsx`)
   에 최소 1개 데모를 추가하고, 이 문서(`docs/news-components.md`)의
   카드 표를 갱신한다.
7. `pnpm lint && pnpm typecheck && pnpm build`를 통과시킨다.
