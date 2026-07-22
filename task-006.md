# TASK-006 — 메인 Hero 및 첫 화면(Above the Fold) 구축

## 선행 조건

- TASK-001 ~ TASK-005 완료
- 공통 레이아웃, 디자인 시스템, UI 컴포넌트 사용

---

# 목표

사용자가 홈페이지에 처음 방문했을 때 강한 인상을 주는
**Awwwards 수준의 메인 Hero와 첫 화면 레이아웃**을 구축한다.

이번 Task에서는 메인 화면의 '첫인상'만 완성한다.
뉴스 목록 전체나 상세 페이지는 구현하지 않는다.

---

# 핵심 구성

- Hero Container
- Hero Grid
- 메인 헤드라인(Featured News)
- 보조 헤드라인 4~6개
- 실시간 속보 패널
- 실시간 시계
- Trending Keywords
- Market/Weather 자리(목업)
- Hero Background Motion
- Hero CTA

---

# 레이아웃

```text
----------------------------------------
Header
Breaking Ticker
----------------------------------------
| Featured News | Trending Panel |
|               | Live Status    |
----------------------------------------
| Secondary News Grid            |
----------------------------------------
```

모바일에서는 세로 스택 구조를 사용한다.

---

# Featured Hero

표시 항목

- 대표 이미지(플레이스홀더)
- 카테고리 배지
- 제목
- 요약
- 발행 시각
- 조회수
- 공유 버튼(UI)
- 읽기 버튼

데이터는 TASK-001의 mock 데이터를 사용한다.

---

# Secondary Grid

- 4~6개의 보조 기사
- 카드 크기 차등
- Hover Motion
- Image Zoom
- Metadata 표시

---

# Trending Panel

표시

- 인기 검색어 Top10
- 상승/하락 아이콘
- 순위 변화
- Live 표시

mock-trending-keywords 사용

---

# Live Status

우측 패널 예시

- 현재 시각
- 최근 업데이트
- 오늘 기사 수
- Breaking 개수
- Live Indicator

모두 Mock 데이터

---

# Hero Motion

TASK-004 Motion 사용

- Hero Fade In
- Card Stagger
- Image Scale
- Hover Lift
- Background Glow
- Scroll Reveal

---

# 반응형

지원

- Mobile
- Tablet
- Laptop
- Desktop
- Wide

모바일에서는

Featured → Trending → Secondary 순서

---

# 접근성

- Landmark
- Heading 계층
- 이미지 alt
- 키보드 탐색
- Focus 표시

---

# Preview

개발 페이지

```
/hero-preview
```

확인 항목

- Hero
- Featured
- Secondary
- Trending
- Motion
- Mobile Layout

---

# 구현하지 않을 기능

- 실제 뉴스 API
- 무한스크롤
- 뉴스 상세
- 댓글
- 검색
- 로그인
- 광고

---

# 완료 조건

- Hero 구축
- Featured News
- Secondary Grid
- Trending Panel
- Live Status
- Hero Motion
- 반응형
- 접근성
- hero-preview 제공
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

현재 저장소와 TASK-001~005를 분석한 뒤 TASK-006만 구현한다.

목표는 홈페이지 첫 화면(Above the Fold)을 완성하는 것이다.

반드시 기존 디자인 토큰과 UI 컴포넌트만 사용한다.

mock-news, mock-breaking-news, mock-trending-keywords 데이터를 활용한다.

Hero는 강렬하지만 가독성을 해치지 않아야 하며 모바일에서도 동일한 정보 전달이 가능해야 한다.

작업 완료 후 lint, typecheck, build를 실행하고 결과를 보고한다.

---

# 다음 Task

TASK-007에서는 뉴스 카드 시스템과 카테고리별 리스트 레이아웃을 구축한다.
