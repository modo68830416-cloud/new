# TASK-002 — 2026 실시간 종합 뉴스 플랫폼 디자인 시스템 구축

## 0. 선행 조건

이 Task는 `task-001.md`가 완료된 프로젝트를 기준으로 진행한다.

작업 전에 반드시 다음을 확인한다.

- Next.js App Router 프로젝트가 정상 실행되는가
- TypeScript strict 모드가 활성화되어 있는가
- Tailwind CSS가 정상 적용되는가
- `src/config/site.ts`가 존재하는가
- 뉴스 카테고리, 뉴스 타입, 샘플 데이터가 준비되어 있는가
- `pnpm lint`, `pnpm typecheck`, `pnpm build`가 성공하는가

선행 조건이 충족되지 않았다면 기존 구조를 먼저 분석하고, 최소한의 범위에서 문제를 수정한 후 TASK-002를 진행한다.

---

## 1. Task 목표

실시간 속보 중심 종합 뉴스 플랫폼에 사용할 고급 디자인 시스템을 구축한다.

이번 Task의 핵심은 개별 페이지를 화려하게 만드는 것이 아니라, 이후 모든 화면과 컴포넌트가 같은 기준으로 만들어지도록 다음 요소를 체계화하는 것이다.

- 컬러 시스템
- 타이포그래피
- 간격 시스템
- 레이아웃 그리드
- 반응형 기준
- 테두리와 라운드
- 그림자와 깊이
- 글래스·블러 효과
- 인터랙션 상태
- 모션 토큰
- 뉴스 중요도 표현
- 다크 모드 기반
- 접근성 기준

---

## 2. 프로젝트 디자인 방향

### 2.1 핵심 이미지

이 플랫폼은 다음 인상을 전달해야 한다.

- 빠르다
- 지금 일어나고 있다
- 강렬하다
- 전문적이다
- 미래적이다
- 신뢰할 수 있다
- 데이터가 살아 움직이는 느낌이 있다
- 모바일에서도 압도적인 임팩트가 있다

### 2.2 시각적 방향

다음 디자인 언어를 조합한다.

- 다크 인터페이스 기반
- 높은 명암 대비
- 속보용 강렬한 레드
- 전기적인 블루 또는 시안 포인트
- 제한적인 보라색·마젠타 그라데이션
- 대형 타이포그래피
- 정교한 그리드
- 비대칭 구도
- 레이어형 카드
- 반투명 패널
- 미세한 빛 번짐
- 선명한 테두리
- 데이터 터미널 느낌
- 과도하지 않은 고급 모션

### 2.3 금지 방향

다음은 피한다.

- 일반 블로그처럼 평범한 흰색 카드 나열
- 모든 요소에 과도한 네온
- 지나치게 둥근 모바일 앱 스타일
- 저가형 뉴스 템플릿 느낌
- 형광색 남용
- 읽기 어려운 장식용 폰트
- 지나치게 많은 그라데이션
- 배경과 텍스트 대비 부족
- 모든 요소가 움직이는 산만한 화면
- 속보와 일반 뉴스의 구분이 없는 구조

---

## 3. 디자인 토큰 구조

다음 파일 구조를 생성하거나 현재 구조에 맞게 안전하게 확장한다.

```text
src/
├─ styles/
│  ├─ globals.css
│  ├─ tokens.css
│  └─ utilities.css
│
├─ config/
│  └─ design-system.ts
│
├─ constants/
│  └─ design-tokens.ts
│
└─ components/
   └─ design-system/
      ├─ design-system-preview.tsx
      ├─ color-preview.tsx
      ├─ typography-preview.tsx
      ├─ spacing-preview.tsx
      └─ motion-preview.tsx
```

Tailwind 버전에 따라 CSS 변수와 Tailwind 설정 방식을 공식 권장 구조로 적용한다.

---

## 4. 컬러 시스템

### 4.1 기본 원칙

모든 주요 색상은 CSS 변수로 관리한다.

직접 HEX 값을 컴포넌트마다 하드코딩하지 않는다.

다음 범주를 정의한다.

- background
- surface
- elevated surface
- text
- muted text
- border
- accent
- breaking news
- urgent
- critical
- success
- warning
- info
- category colors
- chart colors
- overlay
- focus ring

### 4.2 기본 다크 테마

권장 방향은 다음과 같다.

```css
--background: 매우 어두운 블루 블랙 --background-secondary: 블랙에 가까운 네이비
  --surface: 약간 밝은 블루 그레이 --surface-elevated: 한 단계 밝은 패널
  --text-primary: 거의 흰색 --text-secondary: 차가운 회색 --text-muted: 중간
  회색 --border-subtle: 낮은 투명도의 흰색 --border-strong: 높은 투명도의 흰색;
```

### 4.3 핵심 포인트 컬러

다음 역할을 구분한다.

- `accent-primary`: 전기적인 블루 또는 시안
- `accent-secondary`: 보라색 또는 마젠타
- `breaking`: 선명한 뉴스 레드
- `urgent`: 주황색에 가까운 경고색
- `critical`: 강한 적색
- `live`: 실시간 상태 표시용 레드
- `verified`: 신뢰 상태 표시용 블루
- `exclusive`: 독점 기사 표시용 보라색

### 4.4 속보 단계 색상

`BreakingNewsItem.level`과 연결되는 디자인 토큰을 만든다.

```text
normal   → 기본 속보 레드
urgent   → 레드 + 오렌지 강조
critical → 강한 레드 + 높은 대비 + 제한적인 펄스 표현
```

색상만으로 상태를 구분하지 않는다. 텍스트, 아이콘 또는 배지 형태를 함께 사용한다.

### 4.5 카테고리 색상

각 뉴스 카테고리에 고유한 포인트 컬러를 제공하되, 전체 브랜드 일관성을 깨지 않도록 채도를 통제한다.

예시:

- 속보: red
- 정치: blue
- 경제: emerald
- 사회: amber
- 국제: cyan
- 산업: indigo
- IT·과학: violet
- 문화: pink
- 연예: fuchsia
- 스포츠: lime
- 라이프: orange
- 오피니언: slate

카테고리 색상은 설정 파일에서 관리한다.

---

## 5. 타이포그래피 시스템

### 5.1 기본 원칙

한국어 뉴스 가독성을 최우선으로 한다.

다음 역할을 분리한다.

- Display
- Hero title
- Page title
- Section title
- Article title
- Card title
- Body
- Caption
- Metadata
- Label
- Breaking ticker
- Data number

### 5.2 권장 폰트 구성

라이선스와 웹 성능을 확인한 뒤 다음과 같은 방향으로 구성한다.

- 한국어 본문: Pretendard 또는 동등한 고가독성 산세리프
- 영문·숫자 강조: Geist, Inter 또는 동등한 폰트
- 데이터 숫자: tabular numbers 지원 폰트

외부 폰트를 사용한다면 Next.js Font 최적화를 적용한다.

### 5.3 폰트 크기 토큰

최소 다음 범위를 정의한다.

```text
text-xs
text-sm
text-base
text-lg
text-xl
text-2xl
text-3xl
text-4xl
text-5xl
text-6xl
text-7xl
text-8xl
```

단순 고정값만 사용하지 말고, 대형 제목에는 `clamp()` 기반 반응형 크기를 적용한다.

### 5.4 줄 높이와 자간

- 본문은 편안한 줄 높이를 사용한다.
- 뉴스 제목은 조밀하지만 답답하지 않게 설정한다.
- 대형 제목은 약한 음수 자간을 허용한다.
- 속보 티커는 높은 가독성을 위해 과도한 자간을 사용하지 않는다.
- 숫자와 시간은 가능한 경우 tabular 숫자를 사용한다.

### 5.5 텍스트 잘림 유틸리티

다음 유틸리티를 제공한다.

- 1줄 말줄임
- 2줄 말줄임
- 3줄 말줄임
- 긴 URL 줄바꿈
- 기사 본문용 적정 읽기 폭

---

## 6. 간격 시스템

4px 또는 8px 기반의 일관된 spacing scale을 사용한다.

최소 다음 토큰을 제공한다.

```text
space-0
space-1
space-2
space-3
space-4
space-5
space-6
space-8
space-10
space-12
space-16
space-20
space-24
space-32
```

임의의 픽셀 값을 반복해서 사용하지 않는다.

---

## 7. 레이아웃 및 그리드 시스템

### 7.1 최대 콘텐츠 폭

다음 용도를 구분한다.

- 전체 뉴스 데스크톱 레이아웃
- 기사 읽기 영역
- 넓은 데이터 대시보드 영역
- 모바일 패딩

### 7.2 데스크톱 그리드

기본적으로 12열 그리드를 고려한다.

뉴스 메인 화면에서 향후 다음과 같은 배치가 가능해야 한다.

- 메인 기사 7~8열
- 보조 기사 4~5열
- 실시간 트렌드 사이드바
- 전체 폭 속보 티커
- 비대칭 뉴스 카드 모자이크

### 7.3 브레이크포인트

Tailwind 기본 브레이크포인트를 검토한 뒤 뉴스 플랫폼에 맞게 명확한 기준을 문서화한다.

최소 구분:

- mobile
- large mobile
- tablet
- laptop
- desktop
- wide desktop

### 7.4 모바일 우선

- 모바일 기본 스타일을 먼저 작성한다.
- 터치 영역은 최소 44×44px를 권장한다.
- 가로 스크롤이 필요한 영역은 목적이 분명해야 한다.
- 주요 뉴스 제목이 지나치게 작아지지 않아야 한다.
- 데스크톱 요소를 단순 축소하지 않는다.

---

## 8. 라운드 시스템

뉴스 플랫폼의 전문성과 미래적인 느낌을 위해 라운드를 통제한다.

권장 토큰:

```text
radius-none
radius-xs
radius-sm
radius-md
radius-lg
radius-xl
radius-full
```

원칙:

- 작은 배지와 상태표시는 pill 형태 허용
- 일반 뉴스 카드는 중간 이하 라운드
- 대형 히어로는 제한적인 큰 라운드
- 모든 박스를 과도하게 둥글게 만들지 않는다

---

## 9. 테두리 시스템

다음 역할을 분리한다.

- subtle border
- default border
- strong border
- accent border
- breaking border
- focus border

반투명 테두리를 활용하되, 밝은 모니터와 어두운 모니터 모두에서 구분 가능해야 한다.

---

## 10. 그림자와 깊이 시스템

최소 다음 단계의 그림자를 정의한다.

```text
shadow-none
shadow-xs
shadow-sm
shadow-md
shadow-lg
shadow-glow
shadow-breaking
```

원칙:

- 일반 카드에 강한 그림자를 남용하지 않는다.
- 다크 배경에서는 그림자만이 아니라 테두리와 밝기 차이로 깊이를 표현한다.
- glow는 핵심 CTA, 실시간 상태, 속보 강조에 제한적으로 사용한다.
- 텍스트에 과도한 네온 그림자를 적용하지 않는다.

---

## 11. 글래스 및 블러 시스템

다음 토큰 또는 유틸리티를 정의한다.

- glass-subtle
- glass-default
- glass-strong
- backdrop-blur-low
- backdrop-blur-medium
- backdrop-blur-high

원칙:

- 텍스트 가독성을 해치지 않는다.
- 모든 카드에 글래스를 적용하지 않는다.
- 헤더, 플로팅 패널, 속보 레이어 등 핵심 위치에 제한한다.
- 저사양 기기에서 과도한 블러가 성능을 해치지 않도록 한다.

---

## 12. 그라데이션 시스템

최소 다음 역할을 정의한다.

- brand gradient
- breaking gradient
- data gradient
- hero overlay
- image readability overlay
- surface glow

그라데이션은 CSS 변수 또는 공통 유틸리티로 관리한다.

컴포넌트마다 새로운 그라데이션을 임의로 만들지 않는다.

---

## 13. 상태 및 인터랙션 토큰

모든 인터랙티브 요소에 다음 상태를 고려한다.

- default
- hover
- active
- focus-visible
- disabled
- loading
- selected
- pressed
- visited

뉴스 링크의 visited 상태는 사용자 경험을 해치지 않는 범위에서 구분할 수 있도록 설계한다.

---

## 14. 모션 디자인 토큰

이번 Task에서는 복잡한 애니메이션 컴포넌트를 만들지 않는다.

다음 모션 기준과 CSS 변수를 만든다.

### 14.1 지속 시간

```text
duration-instant
duration-fast
duration-normal
duration-slow
duration-dramatic
```

권장 범위:

- instant: 80~120ms
- fast: 140~180ms
- normal: 220~300ms
- slow: 400~600ms
- dramatic: 700~1000ms

### 14.2 easing

다음 목적별 easing을 정의한다.

- standard
- enter
- exit
- emphasis
- spring-like

### 14.3 기본 모션 원칙

- 정보 전달을 방해하지 않는다.
- 속보는 짧고 명확한 모션을 사용한다.
- 중요한 변화에만 모션을 사용한다.
- 스크롤 애니메이션은 과도하게 반복하지 않는다.
- `prefers-reduced-motion`을 반드시 지원한다.
- critical 속보의 펄스는 제한적이고 접근성을 고려한다.

---

## 15. 접근성 요구사항

### 15.1 색상 대비

- 일반 텍스트는 WCAG AA 수준을 목표로 한다.
- 큰 텍스트도 충분한 대비를 유지한다.
- 흐린 회색 텍스트를 과도하게 사용하지 않는다.

### 15.2 포커스

- 키보드 포커스가 명확하게 보여야 한다.
- 포커스 링은 배경과 충분히 구분되어야 한다.
- 단순히 outline을 제거하지 않는다.

### 15.3 색상 독립성

- 상승/하락, 속보 단계, 상태를 색상만으로 표현하지 않는다.
- 아이콘, 텍스트, 패턴 또는 형태를 함께 사용한다.

### 15.4 모션 감소

다음 환경에서는 애니메이션을 줄이거나 제거한다.

```css
@media (prefers-reduced-motion: reduce);
```

---

## 16. 디자인 시스템 설정 파일

`src/config/design-system.ts` 또는 동등한 파일에서 다음 정보를 관리한다.

```ts
themeName;
colorMode;
categoryColors;
breakingLevelStyles;
containerWidths;
breakpoints;
radii;
shadows;
motionDurations;
motionEasings;
zIndexScale;
```

타입을 명확히 정의한다.

---

## 17. Z-index 시스템

임의로 `z-[9999]`를 남용하지 않는다.

최소 다음 레이어를 정의한다.

```text
base
content
sticky
header
dropdown
overlay
modal
toast
criticalAlert
```

---

## 18. 디자인 시스템 미리보기 페이지

개발용 미리보기 페이지를 만든다.

권장 경로:

```text
/design-system
```

이 페이지는 운영용 콘텐츠가 아니라 개발 검수용이다.

다음 내용을 표시한다.

### 18.1 색상

- 배경
- 표면
- 텍스트
- 테두리
- 포인트
- 속보 단계
- 카테고리 색상

### 18.2 타이포그래피

- Display
- Hero
- Heading
- Body
- Caption
- Metadata
- Data number
- Breaking ticker

### 18.3 간격

spacing scale을 시각적으로 확인할 수 있어야 한다.

### 18.4 라운드와 그림자

각 radius와 shadow 단계의 샘플을 제공한다.

### 18.5 상태

- default
- hover
- active
- focus
- disabled
- loading

### 18.6 모션

duration과 easing 차이를 간단히 확인할 수 있는 샘플을 제공한다.

미리보기 페이지는 향후 제거하거나 개발 환경에서만 노출할 수 있는 구조로 만든다.

---

## 19. 기본 UI 샘플

완전한 공통 컴포넌트 시스템은 TASK-003에서 구현한다.

이번 Task에서는 디자인 토큰 검증 목적의 최소 샘플만 만든다.

예시:

- 기본 버튼 모양
- 속보 배지
- 카테고리 배지
- 표면 패널
- 링크 상태
- 포커스 상태
- 로딩 상태

재사용 가능한 정식 Button, Card, Modal 등은 만들지 않는다.

---

## 20. globals.css 정리

`globals.css`는 다음 역할만 담당하도록 정리한다.

- CSS 변수 선언
- 기본 reset
- body 기본 스타일
- 선택 영역 스타일
- 스크롤바 기본 스타일
- 포커스 기본 스타일
- reduced motion 처리
- 공통 텍스트 렌더링
- 배경 기본 처리

복잡한 컴포넌트 스타일을 `globals.css`에 몰아넣지 않는다.

---

## 21. 문서화

다음 문서를 작성한다.

```text
docs/design-system.md
```

문서에 포함할 내용:

- 디자인 목표
- 디자인 원칙
- 컬러 사용 규칙
- 속보 색상 규칙
- 카테고리 색상 규칙
- 타이포그래피 단계
- 간격 시스템
- 그리드 구조
- 반응형 기준
- 모션 원칙
- 접근성 기준
- 금지 사례
- 새로운 토큰 추가 방법
- 다음 Task에서의 사용 방법

---

## 22. 이번 Task에서 구현하지 않을 기능

다음 기능은 구현하지 않는다.

- 완성형 Header
- 완성형 Footer
- 완성형 Navigation
- 뉴스 카드 시스템
- 메인 Hero
- 실시간 속보 티커 완성본
- 트렌드 차트
- 검색 UI
- 뉴스 상세 페이지
- 실제 뉴스 API
- 데이터베이스
- 회원 기능
- 관리자 기능
- Framer Motion 기반 복잡한 애니메이션
- 페이지 전환 애니메이션
- 완성형 다크·라이트 테마 전환 UI
- 실제 브랜드 로고 디자인

---

## 23. 완료 조건

다음 조건을 모두 만족해야 한다.

- [ ] TASK-001 구조를 유지한다.
- [ ] CSS 변수 기반 디자인 토큰이 정의되어 있다.
- [ ] 다크 테마 기본 컬러 시스템이 구현되어 있다.
- [ ] 속보 단계별 색상과 스타일이 정의되어 있다.
- [ ] 카테고리별 색상 설정이 존재한다.
- [ ] 타이포그래피 계층이 정의되어 있다.
- [ ] 반응형 폰트 크기가 적용되어 있다.
- [ ] spacing scale이 정의되어 있다.
- [ ] container와 grid 기준이 정의되어 있다.
- [ ] radius scale이 정의되어 있다.
- [ ] shadow scale이 정의되어 있다.
- [ ] glass와 blur 유틸리티가 정의되어 있다.
- [ ] gradient 역할이 정의되어 있다.
- [ ] 상태별 스타일 기준이 존재한다.
- [ ] motion duration과 easing 토큰이 존재한다.
- [ ] `prefers-reduced-motion`을 지원한다.
- [ ] z-index scale이 정의되어 있다.
- [ ] `/design-system` 미리보기 페이지가 동작한다.
- [ ] 디자인 시스템 문서가 작성되어 있다.
- [ ] 주요 색상 대비가 충분하다.
- [ ] 컴포넌트마다 색상을 하드코딩하지 않았다.
- [ ] 범위 밖의 완성형 UI를 구현하지 않았다.
- [ ] `pnpm lint`가 성공한다.
- [ ] `pnpm typecheck`가 성공한다.
- [ ] `pnpm build`가 성공한다.

---

## 24. 검증 항목

### 24.1 화면 검증

다음 화면 폭에서 `/design-system`을 확인한다.

- 375px
- 430px
- 768px
- 1024px
- 1440px
- 1920px

확인 사항:

- 가로 스크롤이 발생하지 않는다.
- 텍스트가 잘리지 않는다.
- 색상 이름과 샘플이 일치한다.
- 포커스 상태가 명확하다.
- 대형 타이포그래피가 모바일에서 넘치지 않는다.
- 다크 배경에서 경계가 구분된다.

### 24.2 명령 검증

```bash
pnpm lint
pnpm typecheck
pnpm build
```

모든 명령이 성공해야 한다.

---

## 25. Claude Code 최종 실행 프롬프트

```text
현재 저장소 전체와 TASK-001 결과를 먼저 분석한 뒤 TASK-002만 구현하라.

이 프로젝트는 실시간 속보 중심의 신규 종합 뉴스 플랫폼이다.
TASK-002의 목표는 이후 모든 화면에서 사용할 2026년형 디자인 시스템을 구축하는 것이다.

핵심 방향:
- 다크 인터페이스
- 높은 명암 대비
- 강렬한 속보 레드
- 전기적인 블루 또는 시안 포인트
- 제한적인 보라·마젠타 강조
- 대형 타이포그래피
- 정교한 뉴스 그리드
- 반투명 표면
- 제한적인 glow
- 빠르고 전문적인 뉴스 플랫폼 이미지

반드시 구현할 것:
1. CSS 변수 기반 컬러 토큰
2. 속보 단계별 스타일
3. 카테고리별 컬러
4. 타이포그래피 계층
5. 간격, 라운드, 테두리, 그림자 토큰
6. glass, blur, gradient 기준
7. 반응형 container와 grid 기준
8. 상태별 인터랙션 기준
9. motion duration과 easing 토큰
10. reduced motion 지원
11. z-index scale
12. /design-system 개발용 미리보기 페이지
13. docs/design-system.md 문서

주의:
- 완성형 Header, Footer, 뉴스 카드, Hero는 구현하지 마라.
- 실제 뉴스 API, 데이터베이스, 검색, 회원 기능을 추가하지 마라.
- 색상을 각 컴포넌트에 직접 하드코딩하지 마라.
- 모든 박스를 과도하게 둥글게 만들지 마라.
- 네온과 glow를 남용하지 마라.
- 가독성과 접근성을 희생하지 마라.
- 다른 프로젝트의 브랜드, 캐릭터, 자산을 가져오지 마라.
- 기존 TASK-001 구조를 무분별하게 변경하거나 삭제하지 마라.

작업 완료 후:
1. pnpm lint
2. pnpm typecheck
3. pnpm build

를 실행하고 오류가 있으면 수정하라.

마지막으로 생성 파일, 수정 파일, 주요 디자인 결정,
검증 결과, 다음 TASK 준비 상태를 정리해서 보고하라.
```

---

## 26. 작업 완료 보고 형식

```text
## TASK-002 완료 보고

### 1. 구현 내용
-

### 2. 생성한 파일
-

### 3. 수정한 파일
-

### 4. 디자인 토큰 요약
- 컬러:
- 타이포그래피:
- 간격:
- 라운드:
- 그림자:
- 모션:
- 반응형:

### 5. 미리보기 페이지
- 경로:
- 확인 가능한 항목:

### 6. 접근성 적용
-

### 7. 검증 결과
- pnpm lint:
- pnpm typecheck:
- pnpm build:

### 8. 미완료 또는 주의사항
-

### 9. 다음 TASK 준비 상태
-
```

---

## 27. 다음 Task 연결

다음 단계인 `TASK-003`에서는 이번 Task에서 만든 디자인 토큰을 사용하여 정식 공통 UI 컴포넌트를 구축한다.

예정 컴포넌트:

- Button
- IconButton
- Badge
- LiveBadge
- BreakingBadge
- CategoryBadge
- Card
- Surface
- Input
- SearchInput
- Tabs
- Tooltip
- Skeleton
- Divider
- Avatar
- Dialog
- Drawer
- Toast

TASK-003에서는 새로운 색상과 간격을 임의로 추가하지 않고, TASK-002의 토큰을 우선 사용해야 한다.
