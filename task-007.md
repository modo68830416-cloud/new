# TASK-007 — 뉴스 카드 시스템 및 카테고리별 리스트 레이아웃 구축

## 0. Task 개요

이 Task는 `TASK-001`부터 `TASK-006`까지 완료된 뉴스 플랫폼 프로젝트를 기준으로 진행한다.

이번 Task의 목표는 홈페이지, 카테고리 페이지, 검색 결과, 추천 영역 등에서 반복 사용할 수 있는 **정식 뉴스 카드 시스템**과 **카테고리별 뉴스 리스트 레이아웃**을 구축하는 것이다.

단순히 비슷한 카드 여러 개를 만드는 방식이 아니라, 하나의 뉴스 데이터가 화면의 목적과 중요도에 따라 여러 형태로 표현될 수 있도록 확장 가능한 컴포넌트 구조를 설계한다.

---

## 1. 선행 조건

작업 전 다음 항목을 확인한다.

- `TASK-001`: 프로젝트 기반, 뉴스 타입, mock 데이터가 존재한다.
- `TASK-002`: 디자인 토큰이 정상 적용되어 있다.
- `TASK-003`: 공통 UI 컴포넌트가 존재한다.
- `TASK-004`: 공통 모션 시스템이 존재한다.
- `TASK-005`: Header, Navigation, Footer, BreakingTicker가 존재한다.
- `TASK-006`: 메인 Hero 및 Featured News 구조가 존재한다.
- `pnpm lint`, `pnpm typecheck`, `pnpm build`가 성공한다.

기존 구현과 충돌하는 경우 현재 구조를 먼저 분석하고, 중복 컴포넌트를 만들지 않는다.

---

## 2. 핵심 목표

다음을 구현한다.

1. 재사용 가능한 뉴스 카드 패밀리
2. 뉴스 메타데이터 표현 시스템
3. 중요도와 기사 유형별 시각적 구분
4. 카테고리 섹션 레이아웃
5. 최신 뉴스 리스트
6. 인기 뉴스 순위 리스트
7. 사진 중심 뉴스 그리드
8. 영상 뉴스 카드
9. 오피니언 카드
10. 로딩, 빈 상태, 오류 상태
11. 반응형 레이아웃
12. 이미지 최적화
13. 개발용 미리보기 페이지
14. 컴포넌트 사용 문서

---

## 3. 설계 원칙

### 3.1 하나의 카드로 모든 상황을 처리하지 않는다

과도한 prop 조합을 가진 거대한 `NewsCard` 하나를 만들지 않는다.

다음과 같이 목적이 분명한 카드 컴포넌트를 제공한다.

- 대표 기사
- 일반 그리드 기사
- 가로형 리스트 기사
- 압축형 기사
- 사진 기사
- 영상 기사
- 속보 기사
- 오피니언 기사
- 순위 기사

공통되는 이미지, 제목, 메타데이터 로직은 내부 Primitive로 분리한다.

### 3.2 데이터와 표현을 분리한다

카드 내부에서 mock 데이터를 직접 import하지 않는다.

페이지 또는 섹션 컴포넌트가 데이터를 전달한다.

### 3.3 기존 토큰 재사용

- 새로운 브랜드 컬러를 임의로 만들지 않는다.
- 기존 spacing, radius, shadow, typography, motion token을 사용한다.
- 카테고리 색상은 `TASK-002` 설정을 사용한다.
- Badge, Surface, Skeleton 등은 `TASK-003` 컴포넌트를 우선 사용한다.

### 3.4 뉴스 가독성 우선

장식보다 다음을 우선한다.

- 제목 가독성
- 기사 중요도 구분
- 발행 시간
- 언론사 또는 작성자
- 카테고리
- 이미지와 제목의 관계
- 모바일 터치 편의성

---

## 4. 권장 폴더 구조

현재 저장소 구조에 맞게 조정할 수 있으나 역할은 유지한다.

```text
src/
├─ components/
│  └─ news/
│     ├─ primitives/
│     │  ├─ news-image.tsx
│     │  ├─ news-title.tsx
│     │  ├─ news-summary.tsx
│     │  ├─ news-meta.tsx
│     │  ├─ news-source.tsx
│     │  ├─ news-actions.tsx
│     │  └─ news-card-link.tsx
│     │
│     ├─ cards/
│     │  ├─ featured-news-card.tsx
│     │  ├─ standard-news-card.tsx
│     │  ├─ horizontal-news-card.tsx
│     │  ├─ compact-news-card.tsx
│     │  ├─ breaking-news-card.tsx
│     │  ├─ photo-news-card.tsx
│     │  ├─ video-news-card.tsx
│     │  ├─ opinion-news-card.tsx
│     │  └─ ranked-news-card.tsx
│     │
│     ├─ lists/
│     │  ├─ latest-news-list.tsx
│     │  ├─ ranked-news-list.tsx
│     │  ├─ compact-news-list.tsx
│     │  └─ news-feed.tsx
│     │
│     ├─ grids/
│     │  ├─ news-card-grid.tsx
│     │  ├─ photo-news-grid.tsx
│     │  └─ category-news-grid.tsx
│     │
│     ├─ sections/
│     │  ├─ category-section.tsx
│     │  ├─ latest-news-section.tsx
│     │  ├─ popular-news-section.tsx
│     │  ├─ photo-news-section.tsx
│     │  ├─ video-news-section.tsx
│     │  └─ opinion-section.tsx
│     │
│     ├─ states/
│     │  ├─ news-card-skeleton.tsx
│     │  ├─ news-list-skeleton.tsx
│     │  ├─ news-empty-state.tsx
│     │  └─ news-error-state.tsx
│     │
│     ├─ news.types.ts
│     └─ index.ts
│
├─ app/
│  └─ news-preview/
│     └─ page.tsx
│
└─ docs/
   └─ news-components.md
```

---

## 5. 뉴스 데이터 타입 점검 및 확장

`TASK-001`에서 만든 뉴스 타입을 우선 사용한다.

현재 타입에 필요한 필드가 없다면 기존 사용처를 깨뜨리지 않는 방식으로 선택 필드를 추가한다.

권장 필드 예시:

```ts
export type NewsContentType =
  "article" | "breaking" | "photo" | "video" | "opinion" | "live";

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  summary?: string;
  category: NewsCategory;
  contentType?: NewsContentType;
  image?: {
    src: string;
    alt: string;
    blurDataURL?: string;
  };
  source?: string;
  author?: string;
  publishedAt: string;
  updatedAt?: string;
  viewCount?: number;
  commentCount?: number;
  duration?: string;
  isBreaking?: boolean;
  isLive?: boolean;
  isExclusive?: boolean;
  isPremium?: boolean;
  rank?: number;
}
```

### 타입 원칙

- `any` 사용 금지
- 카드 variant를 문자열 아무 값으로 받지 않는다.
- 필요한 union type을 정의한다.
- 컴포넌트 props는 명시적으로 작성한다.
- 날짜는 내부적으로 ISO 문자열을 사용한다.
- UI에서 날짜 형식을 표시할 때 공통 유틸리티를 사용한다.

---

## 6. 공통 News Primitive

### 6.1 NewsImage

역할:

- Next.js `Image` 기반
- aspect ratio 관리
- fallback 처리
- blur placeholder 지원
- 이미지 overlay 지원
- hover zoom 지원
- priority 여부 전달
- sizes 속성 최적화

필수 props 예시:

```ts
interface NewsImageProps {
  src?: string;
  alt: string;
  ratio?: "16:9" | "4:3" | "3:2" | "1:1" | "portrait";
  priority?: boolean;
  sizes?: string;
  overlay?: "none" | "subtle" | "strong";
  enableZoom?: boolean;
}
```

이미지가 없는 경우 깨진 이미지 아이콘을 보여주지 않는다.
디자인 시스템에 맞는 중립적인 fallback surface를 제공한다.

### 6.2 NewsTitle

지원:

- heading level 선택
- line clamp 1~4
- 크기 variant
- hover 상태
- 긴 한국어 제목 대응

제목 전체를 억지로 한 줄에 넣지 않는다.

### 6.3 NewsSummary

- 2줄 또는 3줄 제한
- 카드 크기에 따라 선택적 노출
- 모바일에서 불필요하면 숨길 수 있음
- 제목과 중복되는 요약을 하드코딩하지 않음

### 6.4 NewsMeta

표현 가능 항목:

- 언론사
- 작성자
- 발행 시간
- 수정 시간
- 조회수
- 댓글 수
- 영상 길이
- Live 상태

메타데이터가 많더라도 한 카드에 모두 표시하지 않는다.
카드 variant별로 필요한 정보만 노출한다.

### 6.5 NewsCardLink

카드 전체 클릭 영역을 접근성 있게 처리한다.

주의:

- 카드 내부에 중첩된 링크를 만들지 않는다.
- 공유 버튼 등 별도 인터랙션이 있으면 클릭 구조를 안전하게 설계한다.
- 키보드 포커스가 명확해야 한다.
- 제목 링크의 의미가 스크린리더에 전달되어야 한다.

---

## 7. 뉴스 카드 패밀리

## 7.1 FeaturedNewsCard

사용 위치:

- 카테고리 대표 기사
- 주요 기획 기사
- 메인페이지 중간 대형 섹션

구성:

- 큰 이미지
- 카테고리 배지
- 선택적 속보·독점·Live 배지
- 대형 제목
- 요약
- 언론사 또는 작성자
- 발행 시각
- 선택적 CTA

반응형:

- 데스크톱: 이미지와 콘텐츠를 좌우 분할 가능
- 모바일: 이미지 위, 텍스트 아래
- 제목 크기는 `clamp()` 또는 기존 responsive typography token 사용

---

## 7.2 StandardNewsCard

가장 일반적인 카드다.

구성:

- 이미지
- 카테고리
- 제목
- 발행 시간
- 선택적 요약
- 선택적 조회수

지원 크기:

```text
small
medium
large
```

카드 크기에 따라 정보 밀도를 조절한다.

---

## 7.3 HorizontalNewsCard

사용 위치:

- 최신 뉴스 피드
- 카테고리 페이지 리스트
- 관련 기사
- 검색 결과의 향후 기반

구성:

- 좌측 또는 우측 썸네일
- 제목
- 요약
- 카테고리
- 메타데이터

반응형:

- 작은 모바일에서는 이미지 폭을 줄이거나 상단형으로 전환
- 제목이 지나치게 압축되지 않도록 최소 콘텐츠 폭 고려

---

## 7.4 CompactNewsCard

사용 위치:

- 사이드바
- 관련 뉴스
- 실시간 업데이트
- 작은 화면의 압축 목록

구성:

- 선택적 순번
- 짧은 제목
- 시간
- 선택적 작은 썸네일

요약은 표시하지 않는다.

---

## 7.5 BreakingNewsCard

일반 카드보다 높은 긴급성을 표현한다.

구성:

- BreakingBadge
- 중요도 단계
- 제목
- 발생 또는 업데이트 시각
- 선택적 위치·주제 라벨

원칙:

- 카드 전체를 빨간색으로 채우지 않는다.
- 기존 breaking token을 제한적으로 사용한다.
- critical 상태도 과도한 반복 애니메이션을 사용하지 않는다.
- reduced motion을 지원한다.

---

## 7.6 PhotoNewsCard

사진이 핵심인 기사에 사용한다.

구성:

- 큰 이미지
- 어두운 overlay
- 하단 제목
- 사진 뉴스 표시
- 카테고리 또는 출처

이미지 위 텍스트 대비를 반드시 확보한다.

---

## 7.7 VideoNewsCard

구성:

- 썸네일
- 재생 아이콘
- 영상 길이
- 제목
- 카테고리
- 발행 시각

주의:

- 이번 Task에서는 실제 영상 재생 기능을 구현하지 않는다.
- 링크 이동 또는 UI 표시만 제공한다.
- 재생 아이콘에 접근성 라벨을 제공한다.

---

## 7.8 OpinionNewsCard

일반 뉴스와 시각적으로 구분하되 전체 브랜드에서 벗어나지 않는다.

구성:

- 필자 사진 또는 이니셜 fallback
- 필자명
- 직책 또는 소개
- 칼럼 제목
- 발행 시각
- 오피니언 카테고리 표시

과도한 인물 카드 스타일로 만들지 않는다.

---

## 7.9 RankedNewsCard

인기 뉴스 순위를 표현한다.

구성:

- 순위 숫자
- 제목
- 카테고리
- 선택적 순위 변화
- 선택적 조회수
- 선택적 작은 썸네일

순위 숫자는 tabular number를 사용한다.

상승·하락은 색상만으로 표현하지 않는다.

---

## 8. 리스트 컴포넌트

## 8.1 LatestNewsList

최신순 기사를 시간 흐름에 따라 표현한다.

지원:

- 세로 리스트
- 구분선
- 시간 그룹
- `더 보기` UI
- skeleton 상태
- empty 상태

이번 Task에서는 실제 페이지네이션 API를 구현하지 않는다.

### 권장 표시

- 발행 시각
- 카테고리
- 제목
- 요약
- 썸네일
- 언론사

---

## 8.2 RankedNewsList

- 1위부터 10위까지
- 데스크톱 사이드바 또는 모바일 독립 섹션
- 순위 변화 표현
- 동일한 높이를 억지로 강제하지 않음

---

## 8.3 CompactNewsList

- 5~8개 압축 뉴스
- 이미지 표시 여부 설정
- 실시간 또는 관련 뉴스에 사용
- 적절한 구분선과 터치 영역 제공

---

## 8.4 NewsFeed

여러 카드 variant를 조합하는 피드 컨테이너다.

지원:

- list
- grid
- mixed

단, 복잡한 masonry 외부 라이브러리는 추가하지 않는다.

---

## 9. 그리드 컴포넌트

## 9.1 NewsCardGrid

지원 열 수:

- 모바일: 1열
- 태블릿: 2열
- 데스크톱: 3열 또는 4열
- wide: 콘텐츠 밀도에 따라 최대 4열

props를 통해 열 수를 제한적으로 선택할 수 있다.

CSS Grid를 우선 사용한다.

---

## 9.2 CategoryNewsGrid

권장 구성:

```text
대표 기사 1개 + 보조 기사 4개
```

데스크톱 예시:

```text
┌──────────────────────┬─────────────┐
│                      │ 보조 기사 1 │
│     대표 기사        ├─────────────┤
│                      │ 보조 기사 2 │
├───────────┬──────────┴─────────────┤
│ 보조 3    │ 보조 4                 │
└───────────┴────────────────────────┘
```

정확한 모양보다 정보 계층과 반응형 안정성을 우선한다.

모바일에서는 단순한 세로 흐름으로 전환한다.

---

## 9.3 PhotoNewsGrid

- 사진 중심 카드 3~6개
- 다양한 크기 조합 가능
- 모바일에서 균일한 1열 또는 2열
- 텍스트 대비 보장
- layout shift 방지

---

## 10. 카테고리 섹션

`CategorySection`은 카테고리 페이지 전체가 아니라 메인페이지 안에서 카테고리별 묶음을 표시하는 재사용 섹션이다.

구성:

- 섹션 제목
- 카테고리 컬러 인디케이터
- 더 보기 링크
- 대표 기사
- 보조 기사
- 선택적 compact list

props 예시:

```ts
interface CategorySectionProps {
  title: string;
  category: NewsCategory;
  featured: NewsItem;
  items: NewsItem[];
  href: string;
  layout?: "featured-grid" | "standard-grid" | "list";
}
```

---

## 11. 특화 섹션

### 11.1 LatestNewsSection

- 최신 뉴스 리스트
- 마지막 업데이트 시간
- 더 보기 버튼
- 실제 자동 갱신은 구현하지 않음

### 11.2 PopularNewsSection

- RankedNewsList 사용
- Top 10
- 순위 변화 mock 데이터 가능

### 11.3 PhotoNewsSection

- PhotoNewsGrid 사용
- 사진 뉴스 라벨
- 이미지 중심

### 11.4 VideoNewsSection

- VideoNewsCard 사용
- 영상 길이 표시
- 재생 기능 없음

### 11.5 OpinionSection

- OpinionNewsCard 사용
- 다양한 필자
- 기사와 필자 정보 분리

---

## 12. 이미지 최적화

반드시 Next.js Image 최적화를 사용한다.

### 요구사항

- width/height 또는 fill + 고정 aspect ratio
- 올바른 `sizes`
- 첫 화면 외 이미지는 기본 lazy loading
- 첫 화면 핵심 이미지에만 priority
- 이미지 alt 필수
- 이미지 없는 경우 fallback
- layout shift 방지
- 원격 이미지 도메인이 필요하면 Next.js 설정에 안전하게 추가

### 금지사항

- 모든 이미지에 priority 사용
- 원본 초고해상도 이미지를 무조건 다운로드
- CSS background-image로 핵심 뉴스 이미지 처리
- 의미 없는 alt 텍스트
- 이미지 비율이 카드마다 제멋대로 바뀌는 구조

---

## 13. 카드 인터랙션 및 모션

`TASK-004` 모션 시스템을 사용한다.

지원 가능한 효과:

- 카드 hover lift
- 이미지 scale
- 제목 또는 화살표 이동
- focus ring
- list stagger reveal
- skeleton shimmer

원칙:

- 카드가 크게 흔들리거나 회전하지 않는다.
- 뉴스 소비를 방해하는 장식 모션을 금지한다.
- transform과 opacity 중심으로 구현한다.
- 터치 기기에서는 hover 의존 기능을 사용하지 않는다.
- reduced motion에서는 효과를 줄인다.

---

## 14. 로딩 상태

다음 skeleton을 구현한다.

- StandardNewsCard skeleton
- HorizontalNewsCard skeleton
- CompactNewsCard skeleton
- FeaturedNewsCard skeleton
- News list skeleton
- Grid skeleton

실제 콘텐츠 크기와 유사하게 만들어 layout shift를 최소화한다.

---

## 15. Empty State

뉴스가 없는 경우 다음을 제공한다.

- 명확한 제목
- 짧은 설명
- 선택적 다른 카테고리 이동 버튼
- 장식 아이콘은 선택 사항

예시:

```text
아직 등록된 뉴스가 없습니다.
새로운 소식이 업데이트되면 이곳에 표시됩니다.
```

---

## 16. Error State

데이터를 불러오지 못한 경우 사용할 공통 상태를 제공한다.

구성:

- 오류 메시지
- 다시 시도 버튼 UI
- 홈 또는 다른 섹션 이동 링크

이번 Task에서는 실제 fetch 재시도 로직이 없어도 컴포넌트 인터페이스는 준비한다.

---

## 17. 반응형 기준

### Mobile

- 카드 1열 우선
- 작은 카드도 최소 터치 영역 유지
- 메타데이터가 여러 줄로 과도하게 밀리지 않도록 조절
- 요약은 필요한 카드에서만 표시
- 사진 카드 overlay 텍스트 가독성 확인

### Tablet

- 2열 grid
- featured와 list 조합 가능
- 사이드바는 하단 이동 가능

### Desktop

- 3~4열 grid
- 대표 기사와 보조 기사 비대칭 구성
- 인기 뉴스 사이드 패널 배치 가능

### Wide Desktop

- 콘텐츠 최대 폭 유지
- 카드가 지나치게 넓어지지 않도록 한다.
- 여백만 과도하게 늘어나지 않도록 grid를 조정한다.

---

## 18. 접근성

반드시 다음을 지원한다.

- 의미 있는 heading 계층
- article 요소 사용
- time 요소에 `dateTime`
- 이미지 alt
- 링크 목적이 제목만으로 명확
- 키보드 탐색
- focus-visible
- 순위 변화의 텍스트 대안
- 영상 카드 재생 표시의 aria-label
- 색상 외 상태 구분
- reduced motion

스크린리더가 같은 제목을 불필요하게 두 번 읽지 않도록 한다.

---

## 19. SEO 및 시맨틱 구조

이번 Task에서는 전체 SEO 페이지를 구현하지 않지만 컴포넌트의 시맨틱 구조를 올바르게 작성한다.

권장:

- 뉴스 한 건: `<article>`
- 제목: 문맥에 맞는 `<h2>` 또는 `<h3>`
- 발행일: `<time dateTime="...">`
- 목록: 필요 시 `<ul>` / `<li>`
- 링크: 실제 기사 URL을 받을 수 있는 구조

div만 중첩한 카드 구조를 피한다.

---

## 20. 개발용 Preview 페이지

다음 페이지를 만든다.

```text
/news-preview
```

이 페이지에서 최소 다음을 확인할 수 있어야 한다.

### 카드

- FeaturedNewsCard
- StandardNewsCard small / medium / large
- HorizontalNewsCard
- CompactNewsCard
- BreakingNewsCard normal / urgent / critical
- PhotoNewsCard
- VideoNewsCard
- OpinionNewsCard
- RankedNewsCard

### 리스트 및 그리드

- LatestNewsList
- RankedNewsList
- CompactNewsList
- NewsCardGrid
- CategoryNewsGrid
- PhotoNewsGrid

### 상태

- Loading
- Empty
- Error
- 이미지 없는 카드
- 긴 제목
- 긴 언론사 이름
- 메타데이터 일부 누락
- reduced motion 환경

Preview 페이지는 mock 데이터만 사용한다.

---

## 21. 문서화

다음 문서를 작성한다.

```text
docs/news-components.md
```

포함 내용:

- 카드 종류별 목적
- 카드 선택 기준
- 사용 예시
- 필수 props
- 선택 props
- 데이터 타입
- 이미지 규칙
- 제목 줄 수 규칙
- 메타데이터 표시 규칙
- 반응형 동작
- 접근성 원칙
- 금지 사례
- 새로운 카드 variant 추가 절차

---

## 22. 테스트 권장 항목

프로젝트에 테스트 환경이 이미 있다면 최소한 다음을 테스트한다.

- 제목과 링크 렌더링
- 이미지 없는 fallback
- breaking level 표시
- rank 렌더링
- time 요소 dateTime
- 키보드 포커스
- optional field 누락 시 오류 없음

새로운 대규모 테스트 프레임워크를 이번 Task에서 무리하게 도입하지 않는다.

---

## 23. 이번 Task에서 구현하지 않을 기능

다음은 구현하지 않는다.

- 실제 뉴스 API
- 데이터베이스
- 크롤링
- 무한 스크롤
- 실제 페이지네이션 서버 로직
- 검색 기능
- 기사 상세 페이지
- 댓글
- 좋아요
- 북마크 저장
- 공유 기능의 실제 동작
- 실제 영상 플레이어
- 광고 카드
- 개인화 추천
- 사용자 행동 추적
- 관리자 기능
- 카테고리 라우트 전체 완성
- 메인페이지 전체 통합

---

## 24. 완료 조건

다음 조건을 모두 충족한다.

- [ ] 기존 TASK-001~006 구조를 유지했다.
- [ ] 뉴스 공통 Primitive가 구현되어 있다.
- [ ] FeaturedNewsCard가 구현되어 있다.
- [ ] StandardNewsCard가 구현되어 있다.
- [ ] HorizontalNewsCard가 구현되어 있다.
- [ ] CompactNewsCard가 구현되어 있다.
- [ ] BreakingNewsCard가 구현되어 있다.
- [ ] PhotoNewsCard가 구현되어 있다.
- [ ] VideoNewsCard가 구현되어 있다.
- [ ] OpinionNewsCard가 구현되어 있다.
- [ ] RankedNewsCard가 구현되어 있다.
- [ ] LatestNewsList가 구현되어 있다.
- [ ] RankedNewsList가 구현되어 있다.
- [ ] CompactNewsList가 구현되어 있다.
- [ ] NewsCardGrid가 구현되어 있다.
- [ ] CategoryNewsGrid가 구현되어 있다.
- [ ] PhotoNewsGrid가 구현되어 있다.
- [ ] CategorySection이 구현되어 있다.
- [ ] Latest, Popular, Photo, Video, Opinion 섹션이 구현되어 있다.
- [ ] 뉴스별 loading skeleton이 제공된다.
- [ ] empty 상태가 제공된다.
- [ ] error 상태가 제공된다.
- [ ] Next.js Image 최적화를 적용했다.
- [ ] 모바일, 태블릿, 데스크톱에서 안정적으로 동작한다.
- [ ] 키보드 탐색이 가능하다.
- [ ] `/news-preview` 페이지가 동작한다.
- [ ] `docs/news-components.md`가 작성되어 있다.
- [ ] 디자인 토큰 외 임의 색상과 spacing을 남용하지 않았다.
- [ ] 범위 밖 기능을 구현하지 않았다.
- [ ] `pnpm lint`가 성공한다.
- [ ] `pnpm typecheck`가 성공한다.
- [ ] `pnpm build`가 성공한다.

---

## 25. 화면 검증

다음 너비에서 `/news-preview`를 확인한다.

```text
375px
430px
768px
1024px
1440px
1920px
```

확인 사항:

- 가로 스크롤이 없다.
- 카드 제목이 컨테이너 밖으로 나가지 않는다.
- 이미지 비율이 유지된다.
- 이미지 로딩으로 layout shift가 크게 발생하지 않는다.
- 긴 제목이 정상적으로 clamp 처리된다.
- 카드 전체 링크의 포커스가 명확하다.
- 사진 카드의 텍스트 대비가 충분하다.
- 인기 순위 숫자가 정렬된다.
- 모바일 터치 영역이 충분하다.
- hover가 없는 환경에서도 정보가 손실되지 않는다.

---

## 26. 명령 검증

```bash
pnpm lint
pnpm typecheck
pnpm build
```

모든 명령이 성공해야 한다.

가능하다면 개발 서버에서 Preview 페이지도 직접 확인한다.

---

## 27. Claude Code 최종 실행 프롬프트

```text
현재 저장소 전체와 TASK-001~006 결과를 먼저 분석한 뒤 TASK-007만 구현하라.

이 프로젝트는 실시간 속보 중심의 종합 뉴스 플랫폼이다.
이번 작업의 목표는 메인페이지, 카테고리 페이지, 검색 결과 및 추천 영역에서
재사용할 수 있는 정식 뉴스 카드 시스템과 카테고리별 리스트 레이아웃을 구축하는 것이다.

반드시 구현할 것:

1. NewsImage, NewsTitle, NewsSummary, NewsMeta 등 뉴스 Primitive
2. FeaturedNewsCard
3. StandardNewsCard
4. HorizontalNewsCard
5. CompactNewsCard
6. BreakingNewsCard
7. PhotoNewsCard
8. VideoNewsCard
9. OpinionNewsCard
10. RankedNewsCard
11. LatestNewsList
12. RankedNewsList
13. CompactNewsList
14. NewsCardGrid
15. CategoryNewsGrid
16. PhotoNewsGrid
17. CategorySection
18. Latest, Popular, Photo, Video, Opinion 섹션
19. 카드 및 리스트 Skeleton
20. Empty 및 Error 상태
21. /news-preview 개발용 미리보기 페이지
22. docs/news-components.md 문서

개발 원칙:

- TASK-002 디자인 토큰을 사용하라.
- TASK-003 공통 UI 컴포넌트를 재사용하라.
- TASK-004 모션 토큰과 reduced motion 처리를 사용하라.
- 하나의 거대한 NewsCard에 모든 variant를 몰아넣지 마라.
- 카드 내부에서 mock 데이터를 직접 import하지 마라.
- 데이터를 props로 전달하라.
- 색상, spacing, duration을 임의로 하드코딩하지 마라.
- Next.js Image를 사용하고 sizes, aspect ratio, fallback을 처리하라.
- article, time, heading 등 시맨틱 HTML을 사용하라.
- 키보드와 스크린리더 접근성을 지원하라.
- 모바일 우선으로 구현하라.
- any를 사용하지 마라.
- 기존 컴포넌트를 중복 구현하지 마라.
- 다른 프로젝트의 브랜드나 자산을 가져오지 마라.

이번 Task에서 구현하지 말 것:

- 실제 뉴스 API
- 크롤링
- 데이터베이스
- 무한 스크롤
- 서버 페이지네이션
- 검색 기능
- 뉴스 상세 페이지
- 댓글
- 북마크
- 실제 공유 기능
- 실제 영상 플레이어
- 광고
- 개인화 추천
- 관리자 기능
- 메인페이지 전체 통합

작업 완료 후 반드시 다음을 실행하라.

1. pnpm lint
2. pnpm typecheck
3. pnpm build

오류가 있으면 수정한 뒤 다시 실행하라.

마지막으로 다음 형식으로 보고하라.

- 구현 내용
- 생성 파일
- 수정 파일
- 카드 종류별 설명
- 반응형 처리
- 접근성 처리
- 이미지 최적화
- Preview 페이지 경로
- 검증 명령 결과
- 미완료 또는 주의사항
- TASK-008 준비 상태
```

---

## 28. 작업 완료 보고 형식

```text
## TASK-007 완료 보고

### 1. 구현 내용
-

### 2. 생성한 파일
-

### 3. 수정한 파일
-

### 4. 뉴스 카드
- Featured:
- Standard:
- Horizontal:
- Compact:
- Breaking:
- Photo:
- Video:
- Opinion:
- Ranked:

### 5. 리스트 및 그리드
-

### 6. 상태 UI
- Loading:
- Empty:
- Error:

### 7. 반응형 처리
-

### 8. 접근성 처리
-

### 9. 이미지 최적화
-

### 10. Preview 페이지
- 경로:
- 확인 가능 항목:

### 11. 검증 결과
- pnpm lint:
- pnpm typecheck:
- pnpm build:

### 12. 미완료 또는 주의사항
-

### 13. 다음 TASK 준비 상태
-
```

---

## 29. 다음 Task 연결

`TASK-008`에서는 이번 Task에서 만든 카드와 리스트를 활용하여 다음을 구축한다.

- 실시간 속보 센터
- 라이브 업데이트 타임라인
- 인기 뉴스 및 트렌드 허브
- 실시간 키워드 변화
- 뉴스 업데이트 상태
- 데이터 자동 갱신을 위한 UI 구조
- 실시간 데이터가 없는 경우의 fallback

실제 외부 뉴스 API 연결은 이후 별도의 데이터 통합 Task에서 진행한다.
