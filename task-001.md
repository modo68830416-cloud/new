# TASK-001 — 실시간 종합 뉴스 플랫폼 프로젝트 기반 및 아키텍처 구축

## 0. 프로젝트 공통 전제

이 프로젝트는 기존의 다른 브랜드, 홈페이지, 캐릭터, 건강 플랫폼과 관련 없는 완전한 신규 프로젝트다.

- 서비스 유형: 실시간 속보 중심 종합 뉴스 홈페이지
- 핵심 사용자: 최신 국내외 뉴스를 빠르게 확인하려는 일반 사용자
- 핵심 목표: 빠른 정보 전달, 강렬한 시각적 임팩트, 높은 가독성, 모바일 최적화
- 개발 방식: Claude Code를 이용한 Task 단위 순차 개발
- 기본 언어: 한국어
- 초기 브랜드명: 미확정
- 임시 서비스명: `NOVA NEWS`
- 임시 명칭은 추후 한 곳에서 쉽게 변경할 수 있도록 설정 파일에서 관리한다.

---

## 1. Task 목표

실시간 종합 뉴스 플랫폼의 개발 기반을 구축한다.

이 Task에서는 화려한 메인 화면이나 실제 뉴스 수집 기능을 구현하지 않는다. 이후 `task-002`부터 안정적으로 확장할 수 있도록 프로젝트 구조, 개발 규칙, 공통 설정, 뉴스 데이터 타입, 샘플 데이터, 기본 라우팅을 준비한다.

---

## 2. 반드시 지켜야 할 규칙

1. 다른 프로젝트의 이름, 캐릭터, 색상, 코드, 이미지 또는 자산을 가져오지 않는다.
2. 현재 Task 범위를 넘어서는 기능을 임의로 구현하지 않는다.
3. 기존 프로젝트가 있다면 작업 전에 전체 구조를 먼저 분석한다.
4. 기존 코드를 무분별하게 삭제하거나 구조를 깨뜨리지 않는다.
5. TypeScript의 `any` 사용을 피하고 명확한 타입을 작성한다.
6. 모바일, 태블릿, 데스크톱 반응형 확장을 고려한 구조로 만든다.
7. 모든 설정값은 가능한 한 한곳에서 관리한다.
8. 컴포넌트, 타입, 데이터, 설정을 명확히 분리한다.
9. 실제 언론사 기사를 복사하지 않는다.
10. 실제 언론사 로고, 이미지, 기사 본문을 무단으로 사용하지 않는다.
11. 샘플 뉴스는 완전히 가상의 내용으로 작성한다.
12. 작업 완료 후 변경 파일, 검증 결과, 미완료 사항을 보고한다.

---

## 3. 권장 기술 스택

설치 시점의 최신 안정 버전을 사용한다. 베타, 카나리, 실험 버전은 사용하지 않는다.

- Next.js
- App Router
- React
- TypeScript
- Tailwind CSS
- ESLint
- Prettier
- pnpm
- Lucide React
- clsx
- tailwind-merge

필요하지 않은 라이브러리를 미리 과도하게 설치하지 않는다.

---

## 4. 프로젝트 초기화 요구사항

### 4.1 기본 프로젝트 설정

다음 조건으로 Next.js 프로젝트를 구성한다.

- App Router 사용
- TypeScript 사용
- `src` 디렉터리 사용
- Tailwind CSS 사용
- ESLint 사용
- 절대 경로 별칭 `@/*` 설정
- TypeScript strict 모드 활성화
- 개발 서버, 빌드, 린트, 타입 검사 스크립트 제공

### 4.2 패키지 매니저

`pnpm`을 기본 패키지 매니저로 사용한다.

프로젝트에 다른 패키지 매니저의 잠금 파일이 이미 있다면 현재 상태를 먼저 확인하고, 충돌 없이 정리한다.

### 4.3 package.json 스크립트

최소 다음 명령을 사용할 수 있어야 한다.

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint 또는 현재 Next.js 권장 lint 명령",
    "typecheck": "tsc --noEmit",
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

현재 Next.js 버전에서 `next lint`가 지원되지 않는 경우 공식 권장 방식으로 ESLint 명령을 구성한다.

---

## 5. 기본 폴더 구조

다음 구조를 기본으로 만든다.

```text
src/
├─ app/
│  ├─ layout.tsx
│  ├─ page.tsx
│  ├─ loading.tsx
│  ├─ error.tsx
│  ├─ global-error.tsx
│  └─ not-found.tsx
│
├─ components/
│  ├─ common/
│  ├─ layout/
│  ├─ news/
│  └─ ui/
│
├─ config/
│  └─ site.ts
│
├─ constants/
│  ├─ categories.ts
│  └─ navigation.ts
│
├─ data/
│  ├─ mock-news.ts
│  ├─ mock-breaking-news.ts
│  └─ mock-trending-keywords.ts
│
├─ hooks/
│
├─ lib/
│  ├─ utils.ts
│  └─ format-date.ts
│
├─ styles/
│  └─ globals.css
│
└─ types/
   └─ news.ts

public/
├─ images/
├─ icons/
└─ placeholders/

docs/
└─ architecture.md
```

빈 폴더가 Git에서 사라지는 경우 `.gitkeep`을 사용한다.

---

## 6. 사이트 설정 파일

`src/config/site.ts`에서 다음 값을 관리한다.

```ts
siteName;
siteShortName;
siteDescription;
siteUrl;
defaultLocale;
defaultTheme;
defaultOgImage;
contactEmail;
socialLinks;
```

### 기본값 예시

- `siteName`: NOVA NEWS
- `siteShortName`: NOVA
- `siteDescription`: 실시간 속보와 국내외 주요 뉴스를 빠르게 전달하는 종합 뉴스 플랫폼
- `defaultLocale`: ko-KR

브랜드명이 확정되지 않았으므로 사이트 이름이 여러 파일에 직접 하드코딩되지 않게 한다.

---

## 7. 뉴스 카테고리 정의

최소 다음 카테고리를 정의한다.

- 속보
- 정치
- 경제
- 사회
- 국제
- 산업
- IT·과학
- 문화
- 연예
- 스포츠
- 라이프
- 오피니언

각 카테고리는 다음 정보를 가진다.

```ts
id;
slug;
name;
shortName;
description;
order;
isVisible;
```

카테고리 순서는 설정 파일에서 변경할 수 있어야 한다.

---

## 8. 공통 뉴스 데이터 타입

`src/types/news.ts`에 최소 다음 타입을 정의한다.

### 8.1 NewsCategory

```ts
export interface NewsCategory {
  id: string;
  slug: string;
  name: string;
  shortName?: string;
  description?: string;
  order: number;
  isVisible: boolean;
}
```

### 8.2 NewsSource

```ts
export interface NewsSource {
  id: string;
  name: string;
  url?: string;
  logoUrl?: string;
}
```

### 8.3 Author

```ts
export interface Author {
  id: string;
  name: string;
  role?: string;
  profileImage?: string;
}
```

### 8.4 MediaAsset

```ts
export interface MediaAsset {
  id: string;
  type: "image" | "video";
  url: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
  credit?: string;
}
```

### 8.5 NewsArticle

```ts
export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  summary: string;
  content: string;
  category: NewsCategory;
  source: NewsSource;
  author?: Author;
  publishedAt: string;
  updatedAt?: string;
  thumbnail: MediaAsset;
  heroImage?: MediaAsset;
  isBreaking: boolean;
  isFeatured: boolean;
  isExclusive?: boolean;
  viewCount: number;
  commentCount: number;
  shareCount?: number;
  tags: string[];
}
```

### 8.6 BreakingNewsItem

```ts
export interface BreakingNewsItem {
  id: string;
  articleId?: string;
  title: string;
  timestamp: string;
  level: "normal" | "urgent" | "critical";
  isActive: boolean;
}
```

### 8.7 TrendingKeyword

```ts
export interface TrendingKeyword {
  id: string;
  keyword: string;
  rank: number;
  previousRank?: number;
  change: "up" | "down" | "same" | "new";
  score?: number;
}
```

필요한 경우 중복을 줄이기 위해 타입을 합리적으로 개선할 수 있다. 단, 주요 필드는 빠뜨리지 않는다.

---

## 9. 샘플 데이터 요구사항

실제 언론사 기사나 실제 뉴스 문장을 복사하지 않는다.

### 9.1 뉴스 샘플

- 카테고리별 최소 3개
- 전체 최소 30개 이상
- 한국어 제목
- 한국어 요약
- 완전한 가상 기사
- 서로 다른 발행 시간
- 속보 기사 포함
- 주요 기사 포함
- 조회수와 댓글 수 포함
- 태그 포함

### 9.2 속보 샘플

최소 5개를 작성한다.

속보는 다음 수준을 다양하게 포함한다.

- normal
- urgent
- critical

### 9.3 인기 키워드 샘플

최소 10개를 작성한다.

- 순위
- 이전 순위
- 상승
- 하락
- 유지
- 신규 진입

상태를 다양하게 포함한다.

### 9.4 이미지

초기에는 외부 실제 뉴스 이미지를 사용하지 않는다.

다음 중 하나를 사용한다.

- 로컬 플레이스홀더 이미지
- CSS 그라데이션
- 직접 만든 추상 이미지
- 단순한 색상 블록

---

## 10. 유틸리티 함수

최소 다음 유틸리티를 구현한다.

### 10.1 클래스 결합 함수

`clsx`와 `tailwind-merge`를 사용하는 `cn()` 함수를 만든다.

### 10.2 날짜 표시 함수

한국어 뉴스 서비스에 적합한 날짜 표시 함수를 만든다.

예시:

- 방금 전
- 5분 전
- 2시간 전
- 어제
- 2026. 7. 22.

함수는 잘못된 날짜 입력을 안전하게 처리해야 한다.

---

## 11. 기본 라우팅 및 페이지

### 11.1 루트 페이지 `/`

이 Task에서는 완성형 디자인을 만들지 않는다.

다음 정보만 간단히 표시한다.

- 임시 서비스명
- 서비스 설명
- 프로젝트 초기화 완료 문구
- 등록된 뉴스 수
- 등록된 카테고리 수
- 속보 데이터 수
- 다음 Task 안내

### 11.2 loading.tsx

단순한 로딩 상태를 제공한다.

### 11.3 error.tsx

- 사용자에게 오류가 발생했음을 알린다.
- 다시 시도 버튼을 제공한다.
- 개발 환경에서는 오류 확인이 가능해야 한다.

### 11.4 global-error.tsx

전역 오류 처리 구조를 제공한다.

### 11.5 not-found.tsx

- 찾을 수 없는 페이지임을 표시한다.
- 홈으로 이동하는 링크를 제공한다.

---

## 12. 기본 메타데이터

루트 레이아웃에서 다음 메타데이터를 구성한다.

- title
- title template
- description
- applicationName
- keywords
- authors 또는 creator 자리표시자
- openGraph 기본값
- twitter card 기본값
- robots 기본값

브랜드명이 바뀌면 설정 파일 수정만으로 반영될 수 있게 한다.

---

## 13. 기본 스타일 요구사항

이 Task에서는 디자인 시스템을 완성하지 않는다.

다음만 적용한다.

- 기본 배경색
- 기본 텍스트색
- 읽기 쉬운 기본 폰트
- 브라우저 기본 여백 제거
- `box-sizing: border-box`
- 이미지 최대 너비 처리
- 기본 링크 스타일
- 키보드 포커스 표시
- 모바일 화면에서 가로 스크롤 방지

화려한 애니메이션, 뉴스 카드, 히어로, 글래스 효과는 구현하지 않는다.

---

## 14. 접근성 기본 요구사항

- HTML 문서의 언어를 `ko`로 설정한다.
- 주요 랜드마크 구조를 사용한다.
- 링크와 버튼을 구분한다.
- 키보드 포커스가 보이게 한다.
- 이미지에 대체 텍스트를 제공한다.
- 장식용 이미지는 빈 대체 텍스트를 사용한다.
- 오류 페이지의 버튼은 키보드로 작동해야 한다.

---

## 15. 코드 품질 요구사항

- TypeScript strict 모드에서 오류가 없어야 한다.
- `any` 사용을 피한다.
- 사용하지 않는 import를 제거한다.
- 컴포넌트는 역할별로 분리한다.
- 데이터와 UI 코드를 섞지 않는다.
- 설정값을 여러 파일에 중복 작성하지 않는다.
- 복잡한 주석보다 이해하기 쉬운 코드 구조를 우선한다.
- 불필요한 클라이언트 컴포넌트를 만들지 않는다.
- `"use client"`는 필요한 파일에만 사용한다.

---

## 16. 아키텍처 문서

`docs/architecture.md`를 생성하고 다음 내용을 기록한다.

- 프로젝트 목적
- 사용 기술
- 폴더 구조
- 데이터 흐름
- 서버 컴포넌트 사용 원칙
- 클라이언트 컴포넌트 사용 원칙
- 뉴스 데이터 모델
- 설정 관리 방식
- 향후 API 연결 예정 지점
- 다음 Task에서 확장할 영역

---

## 17. 이번 Task에서 구현하지 않을 기능

다음 기능은 절대 구현하지 않는다.

- 실제 뉴스 API 연동
- RSS 수집
- 뉴스 크롤링
- 실시간 WebSocket
- 데이터베이스
- 회원가입
- 로그인
- 관리자 페이지
- 댓글
- 검색
- AI 요약
- 추천 알고리즘
- 광고
- 다국어
- 완성형 메인 화면
- 고급 애니메이션
- 뉴스 상세 페이지
- 배포 설정

위 기능은 이후 Task에서 단계적으로 구현한다.

---

## 18. 완료 조건

다음 조건을 모두 만족해야 한다.

- [ ] Next.js 프로젝트가 정상 실행된다.
- [ ] App Router를 사용한다.
- [ ] TypeScript strict 모드가 활성화되어 있다.
- [ ] `@/*` 절대 경로 별칭이 작동한다.
- [ ] 요구된 폴더 구조가 생성되어 있다.
- [ ] 사이트 설정 파일이 존재한다.
- [ ] 뉴스 카테고리 상수가 정의되어 있다.
- [ ] 공통 뉴스 타입이 정의되어 있다.
- [ ] 가상 뉴스 데이터가 최소 30개 존재한다.
- [ ] 속보 샘플이 최소 5개 존재한다.
- [ ] 인기 키워드 샘플이 최소 10개 존재한다.
- [ ] 기본 루트 페이지가 데이터 수를 표시한다.
- [ ] 로딩, 오류, 전역 오류, 404 페이지가 존재한다.
- [ ] 기본 메타데이터가 설정되어 있다.
- [ ] `pnpm lint`가 성공한다.
- [ ] `pnpm typecheck`가 성공한다.
- [ ] `pnpm build`가 성공한다.
- [ ] 다른 프로젝트의 이름이나 자산이 포함되지 않는다.
- [ ] 범위 밖 기능을 구현하지 않았다.
- [ ] 아키텍처 문서가 작성되어 있다.

---

## 19. 검증 명령

작업 완료 후 반드시 다음 명령을 실행한다.

```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm build
```

오류가 발생하면 원인을 수정한 뒤 다시 실행한다.

검증하지 않은 상태에서 완료했다고 보고하지 않는다.

---

## 20. Claude Code 최종 실행 프롬프트

아래 지시를 그대로 따른다.

```text
현재 저장소 전체를 먼저 조사한 뒤 TASK-001만 구현하라.

이 프로젝트는 실시간 속보 중심의 신규 종합 뉴스 홈페이지다.
기존의 다른 브랜드, 건강 플랫폼, 캐릭터, 코드 또는 자산을 가져오지 마라.

TASK-001의 목표는 프로젝트 기반과 아키텍처를 구축하는 것이다.
완성형 메인 화면, 실제 뉴스 API, 크롤링, 데이터베이스, 회원 기능,
관리자 기능, 검색, 댓글, AI 요약 기능은 구현하지 마라.

작업 순서:
1. 현재 저장소 구조와 package.json을 분석한다.
2. 필요한 프로젝트 설정과 의존성을 구성한다.
3. 요구된 폴더 구조를 만든다.
4. 사이트 설정, 카테고리, 뉴스 타입을 작성한다.
5. 완전한 가상 뉴스 샘플 데이터를 작성한다.
6. 기본 페이지와 오류 처리 페이지를 만든다.
7. 아키텍처 문서를 작성한다.
8. lint, typecheck, build를 실행한다.
9. 오류가 있으면 수정한 뒤 다시 검증한다.
10. 변경 파일, 설치 패키지, 검증 결과, 미완료 사항을 정리해 보고한다.

기존 코드가 있다면 무조건 삭제하지 말고 구조를 이해한 뒤 안전하게 통합하라.
TypeScript any 사용을 피하고, 설정값을 여러 곳에 하드코딩하지 마라.
현재 Task 범위를 넘어서는 기능을 임의로 추가하지 마라.
```

---

## 21. 작업 완료 보고 형식

Claude Code는 작업 완료 후 다음 형식으로 보고한다.

```text
## TASK-001 완료 보고

### 1. 구현 내용
-

### 2. 생성한 파일
-

### 3. 수정한 파일
-

### 4. 설치한 패키지
-

### 5. 검증 결과
- pnpm lint:
- pnpm typecheck:
- pnpm build:

### 6. 주요 설계 결정
-

### 7. 미완료 또는 주의사항
-

### 8. 다음 Task 준비 상태
-
```
