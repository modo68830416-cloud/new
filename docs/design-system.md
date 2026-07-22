# 디자인 시스템 문서 (TASK-002)

## 1. 디자인 목표

NOVA NEWS는 실시간 속보 중심의 종합 뉴스 플랫폼이다. 이 디자인 시스템은
다음 인상을 전달하기 위해 만들어졌다.

- 빠르다 / 지금 일어나고 있다
- 강렬하지만 전문적이다
- 미래적이며 데이터가 살아 움직이는 느낌
- 모바일에서도 압도적인 임팩트
- 신뢰할 수 있다 (읽기 어렵거나 저가형 템플릿처럼 보이지 않는다)

TASK-002는 화려한 화면 하나를 만드는 것이 아니라, 이후 모든 화면과
컴포넌트(TASK-003 이후)가 같은 기준으로 만들어지도록 **토큰 체계**를
구축하는 것이 목적이다.

## 2. 디자인 원칙

- 다크 인터페이스를 기본으로 한다. 라이트 테마 전환 UI는 이번 Task의
  범위가 아니다.
- 색상은 항상 CSS 변수(`src/styles/tokens.css`)를 통해서만 사용한다.
  컴포넌트에 HEX 값을 직접 쓰지 않는다.
- 라운드는 통제한다. 전체적으로 모바일 앱처럼 과도하게 둥글게 만들지
  않는다 (`radius-md` 이하를 기본값으로 사용).
- glow, glass, 그라데이션은 핵심 위치(CTA, 실시간 상태, 속보, 헤더/플로팅
  패널)에만 제한적으로 사용한다.
- 속보 단계, 카테고리, 상태는 색상만으로 구분하지 않는다. 텍스트/아이콘을
  함께 사용한다.
- 접근성(WCAG AA 대비, 명확한 포커스, `prefers-reduced-motion`)을 항상
  우선한다.

## 3. 컬러 사용 규칙

모든 색상 토큰은 `src/styles/tokens.css`의 `:root`에 선언되어 있고,
`src/styles/globals.css`의 `@theme inline` 블록을 통해 Tailwind
유틸리티(`bg-background`, `text-text-primary`, `border-border-subtle`
등)로 노출된다.

| 카테고리 | 대표 변수 | 용도 |
| --- | --- | --- |
| background | `--color-background`, `--color-background-secondary` | 페이지 배경 |
| surface | `--color-surface`, `--color-surface-elevated`, `--color-surface-overlay` | 카드/패널/모달 표면 |
| text | `--color-text-primary/secondary/muted/inverse` | 텍스트 계층 |
| border | `--color-border-subtle/default/strong/accent/breaking/focus` | 테두리 |
| accent | `--color-accent-primary`(시안/블루), `--color-accent-secondary`(보라/마젠타) | 포인트 컬러 |
| status | `--color-breaking/urgent/critical/live/verified/exclusive/success/warning/info` | 뉴스 중요도, 상태 |
| category | `--color-category-*` | 카테고리별 포인트 컬러 |
| chart | `--color-chart-1..6` | 데이터 시각화 |
| overlay/focus | `--color-overlay-scrim`, `--color-overlay-hero`, `--color-focus-ring` | 오버레이, 포커스 링 |

**규칙**

- 컴포넌트에서 새로운 색상이 필요하면 먼저 기존 토큰으로 표현할 수
  있는지 검토한다. 정말 새로운 역할이 필요할 때만 `tokens.css`에
  추가한다.
- `accent-secondary`(보라/마젠타)는 강조가 필요한 극히 일부 요소에만
  사용한다. 전체 UI의 주력 색은 `accent-primary`(시안/블루)다.

## 4. 속보 색상 규칙

`BreakingNewsItem.level`(`normal | urgent | critical`)은
`src/config/design-system.ts`의 `breakingLevelStyles`에서 스타일을
관리한다.

| level | 색상 | 표현 |
| --- | --- | --- |
| normal | `--color-breaking` | 기본 속보 레드 + "속보" 라벨 + Radio 아이콘 |
| urgent | `--color-urgent` (+ `--color-breaking` 테두리) | 레드/오렌지 강조 + "긴급" 라벨 + AlertTriangle 아이콘 |
| critical | `--color-critical` | 강한 레드, 높은 대비 + "긴급 속보" 라벨 + Siren 아이콘 + 제한적 `pulse-critical` |

`pulse-critical` 유틸리티(`src/styles/utilities.css`)는 `critical`
단계에만 사용하고, `prefers-reduced-motion: reduce` 환경에서는 자동으로
애니메이션이 꺼진다. 색상만으로 단계를 구분하지 않기 위해 항상 라벨
텍스트와 아이콘을 함께 사용한다.

## 5. 카테고리 색상 규칙

카테고리 색상은 `src/config/design-system.ts`의 `categoryColors`에서
`src/constants/categories.ts`(TASK-001)의 카테고리 목록을 기반으로
파생된다. 새 카테고리가 추가되면 `tokens.css`에 `--color-category-{slug}`
변수를 추가하고 `globals.css`의 `@theme inline` 블록에 매핑을 추가한다.

전체 브랜드 일관성을 위해 채도를 통제했으며, 속보(빨강)를 제외한 나머지
카테고리는 명도/채도 톤을 비슷한 범위로 맞췄다.

## 6. 타이포그래피 단계

`src/styles/utilities.css`에 역할별 `type-*` 유틸리티 클래스가 정의되어
있다 (`display`, `hero-title`, `page-title`, `section-title`,
`article-title`, `card-title`, `body`, `caption`, `metadata`, `label`,
`breaking-ticker`, `data-number`).

- 폰트는 기존 TASK-001의 Geist(영문/숫자)를 기본으로 하고, 한글은
  시스템 고가독성 산세리프(`Apple SD Gothic Neo`, `Malgun Gothic`)로
  대체했다. Pretendard 등 전용 한글 웹폰트는 라이선스 파일을 프로젝트에
  포함해야 하므로, 이번 토큰 Task에서는 무거운 폰트 자산을 추가하지
  않고 시스템 폰트로 안전하게 대체했다. 필요 시 `next/font/local`로
  Pretendard를 추가하고 `--font-sans` 변수만 교체하면 된다.
- 대형 제목(`text-5xl` ~ `text-8xl`)은 `clamp()` 기반으로 반응형 크기를
  가지며, 약한 음수 자간(`letter-spacing`)이 적용된다.
- 데이터 숫자는 `type-data-number`(모노스페이스 + `tabular-nums`)를
  사용한다.
- 텍스트 잘림/읽기 폭 유틸리티: Tailwind 코어의 `line-clamp-1/2/3`을
  그대로 사용하고, 긴 URL 줄바꿈은 `break-url`, 기사 본문 읽기 폭은
  `reading-width`(68ch) 유틸리티를 사용한다.

## 7. 간격 시스템

4px 기준 spacing scale(`--space-0` ~ `--space-32`)을
`src/styles/tokens.css`와 `src/constants/design-tokens.ts`
(`SPACING_SCALE`)에 정의했다. Tailwind의 기본 spacing 유틸리티(`p-4`,
`gap-6` 등)도 동일하게 4px(0.25rem) 배수 체계이므로, 실제 레이아웃에서는
Tailwind 기본 유틸리티를 우선 사용하고 `--space-*` 변수는 CSS 값이 직접
필요한 경우(그라데이션, SVG, 인라인 스타일 계산 등)에 사용한다.

## 8. 그리드 구조

- `container-news`(88rem/1408px): 전체 뉴스 데스크톱 레이아웃
- `container-article`(44rem/704px): 기사 읽기 영역
- `container-dashboard`(96rem/1536px): 데이터 대시보드/디자인 시스템
  미리보기 등 넓은 영역
- 모바일 좌우 패딩: `--container-padding-mobile`(1rem)

12열 그리드는 Tailwind의 `grid grid-cols-12`와 `col-span-*` 유틸리티로
구현할 수 있도록 별도 커스텀 클래스 없이 남겨두었다 (예: 메인 기사
`col-span-7`~`col-span-8`, 보조 기사 `col-span-4`~`col-span-5`). 실제
그리드 레이아웃 구현은 TASK-003 이후 컴포넌트 작업에서 진행한다.

## 9. 반응형 기준

| 이름 | 최소 폭 | Tailwind 접두어 |
| --- | --- | --- |
| Mobile | 0px | (기본) |
| Large mobile | 430px | `xs:` (커스텀 추가) |
| Tablet | 768px | `md:` |
| Laptop | 1024px | `lg:` |
| Desktop | 1280px | `xl:` |
| Wide desktop | 1536px | `2xl:` |

Tailwind 기본 브레이크포인트(`sm/md/lg/xl/2xl`)는 그대로 유지했고, "large
mobile" 구간만 `--breakpoint-xs`(430px)로 보강했다. 모바일 우선으로
스타일을 작성하고, 터치 영역은 `touch-target` 유틸리티(최소
44×44px)를 사용한다.

## 10. 모션 원칙

- duration: `instant(100ms) / fast(160ms) / normal(260ms) / slow(480ms) /
  dramatic(850ms)`
- easing: `standard / enter / exit / emphasis / spring`
- 정보 전달을 방해하지 않는 선에서만 모션을 사용하고, 속보는 짧고
  명확한 모션만 사용한다.
- `critical` 속보의 `pulse-critical`을 제외하면 반복 애니메이션을
  기본으로 두지 않는다.
- 모든 모션은 `@media (prefers-reduced-motion: reduce)`에서 자동으로
  즉시 전환되도록 `globals.css`에서 전역 처리했다 (`animation-duration`,
  `transition-duration`을 0.01ms로 강제).

## 11. 접근성 기준

- 배경(`--color-background` 계열)과 주요 텍스트(`--color-text-primary`)는
  WCAG AA 이상의 명암비를 갖도록 값을 선택했다. `text-muted`처럼 흐린
  텍스트는 본문이 아닌 메타데이터/캡션에만 제한적으로 사용한다.
- `:focus-visible`에 `outline`을 제거하지 않고 `--color-focus-ring`으로
  항상 명확하게 표시한다.
- 속보 단계, 카테고리, 상태(성공/경고/정보 등)는 색상 단독으로
  구분하지 않고 라벨 텍스트 또는 아이콘을 함께 사용한다.
- `prefers-reduced-motion: reduce` 환경을 지원한다 (섹션 10 참고).

## 12. 금지 사례

- 컴포넌트에 HEX 값을 직접 하드코딩하는 것
- 모든 요소를 과도하게 둥글게 만드는 것 (`radius-xl`/`radius-full`을
  일반 카드에 남용)
- glow/네온/블러를 모든 카드·버튼에 적용하는 것
- 속보와 일반 뉴스를 시각적으로 구분하지 않는 것
- 상태를 색상만으로 표현하는 것
- 완성형 Header/Footer/Navigation/NewsCard/Hero/속보 티커/검색 UI/인증/
  관리자 화면을 이 Task에서 구현하는 것 (TASK-003 이후 범위)

## 13. 새로운 토큰 추가 방법

1. `src/styles/tokens.css`의 `:root`에 새 CSS 변수를 추가한다(용도별
   섹션 주석 아래에 배치).
2. Tailwind 유틸리티로 노출해야 한다면 `src/styles/globals.css`의
   `@theme inline` 블록에 `--같은-이름: var(--같은-이름);` 형태로
   매핑을 추가한다 (브레이크포인트처럼 컴파일 타임 상수가 필요한
   경우에만 `@theme`에 정적 값으로 추가한다).
3. 여러 화면에서 반복 렌더링해야 하는 값(카테고리, 상태, 스케일 등)은
   `src/constants/design-tokens.ts` 또는 `src/config/design-system.ts`에
   타입과 함께 추가한다.
4. `/design-system` 페이지에 새 토큰을 확인할 수 있는 샘플을
   추가한다(`src/components/design-system/*`).
5. 이 문서를 갱신한다.

## 14. 다음 Task에서의 사용 방법

TASK-003(공통 UI 컴포넌트: Button, Badge, Card, Input 등)은 이 문서와
`src/styles/tokens.css`, `src/config/design-system.ts`,
`src/constants/design-tokens.ts`에 정의된 토큰만 사용해서 구현한다.
새로운 색상·간격·라운드 값을 임의로 추가하지 않고, 부족한 토큰이
발견되면 먼저 이 디자인 시스템에 토큰을 추가한 뒤 컴포넌트에서
사용한다.

## 15. 관련 파일

```text
src/styles/tokens.css                              CSS 변수 (source of truth)
src/styles/utilities.css                            type-*, glass-*, gradient-*, z-* 등 유틸리티
src/styles/globals.css                               reset, base, @theme 매핑
src/config/design-system.ts                          타입 + 설정 (카테고리/속보/그리드/모션 등)
src/constants/design-tokens.ts                        미리보기용 토큰 목록 상수
src/components/design-system/                         /design-system 페이지 구성 컴포넌트
src/app/design-system/page.tsx                        개발용 미리보기 라우트
```
