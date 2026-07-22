# TASK-005 — Header · Navigation · Footer · Breaking Ticker 레이아웃 구축

## 선행 조건

- TASK-001 ~ TASK-004 완료
- 디자인 토큰, UI 컴포넌트, 모션 시스템 사용

---

# 목표

뉴스 플랫폼의 공통 레이아웃을 구축한다.

이번 Task에서는 다음을 구현한다.

- Global Header
- Top Utility Bar
- Desktop Navigation
- Mobile Navigation
- Sticky Header
- Breaking News Ticker
- Footer
- Layout Provider

실제 뉴스 목록과 Hero는 구현하지 않는다.

---

# 폴더 구조

```text
src/components/layout/
 ├─ Header/
 ├─ TopBar/
 ├─ Navigation/
 ├─ MobileNavigation/
 ├─ BreakingTicker/
 ├─ Footer/
 └─ LayoutProvider/
```

---

# Header

포함 요소

- 로고
- 카테고리 메뉴
- 검색 버튼(UI만)
- 다크모드 자리(기능 없음)
- 메뉴 버튼
- Live 표시

조건

- Sticky Header
- 스크롤 시 높이 축소
- Blur Background
- Shadow Token 사용
- Mobile 최적화

---

# Navigation

Desktop

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

지원

- Hover
- Active
- Keyboard Navigation

---

# Mobile Navigation

- Drawer 기반
- Swipe 고려
- Focus Trap
- ESC 종료
- Overlay

---

# Breaking News Ticker

지원

- Auto Scroll
- Pause on Hover
- Keyboard Focus
- 긴 제목 말줄임
- Live Badge
- Breaking Badge

데이터

TASK-001 mock-breaking-news 사용

---

# Footer

포함

- 사이트명
- 카테고리
- 이용약관 자리
- 개인정보처리방침 자리
- 문의 이메일
- Copyright

---

# Layout Provider

App Router에서 공통 Layout 관리

구성

```
TopBar
Header
BreakingTicker
Main Slot
Footer
```

---

# Motion

TASK-004 Motion 사용

- Header Hide/Show
- Sticky Transition
- Drawer Animation
- Breaking Ticker
- Hover

---

# 접근성

- Landmark
- nav
- header
- footer
- main
- aria-current
- aria-expanded
- Skip Navigation

---

# Preview

다음 페이지 제공

```
/layout-preview
```

확인

- Desktop
- Tablet
- Mobile
- Sticky
- Drawer
- Footer
- BreakingTicker

---

# 구현하지 않을 기능

- Hero
- 뉴스 카드
- 뉴스 상세
- 검색 기능
- 로그인
- 광고
- API

---

# 완료 조건

- Header 구현
- Desktop Navigation
- Mobile Drawer
- Sticky Header
- BreakingTicker
- Footer
- LayoutProvider
- layout-preview
- 반응형
- 접근성
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

현재 저장소와 TASK-001~004 결과를 분석한 후 TASK-005만 구현한다.

공통 레이아웃(Header, Navigation, Mobile Drawer, Breaking Ticker, Footer)를 구축한다.

반드시 기존 디자인 토큰과 공통 UI 컴포넌트만 사용한다.

BreakingTicker는 mock-breaking-news 데이터를 사용한다.

검색 기능이나 실제 뉴스 기능은 구현하지 않는다.

완료 후 lint, typecheck, build를 실행하고 결과를 보고한다.

---

# 다음 Task

TASK-006에서는 Awwwards 수준의 메인 Hero 및 첫 화면 레이아웃을 구축한다.
