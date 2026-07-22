# TASK-003 — 공통 UI 컴포넌트 시스템 구축

## 목표

TASK-002에서 정의한 디자인 토큰만 사용하여 재사용 가능한 UI 컴포넌트 라이브러리를 구축한다.

## 선행 조건

- TASK-001 완료
- TASK-002 완료
- 디자인 토큰 및 /design-system 페이지 정상 동작

## 구현 대상

다음 컴포넌트를 공통 라이브러리 형태로 구현한다.

### 기본

- Button
- IconButton
- LinkButton
- Badge
- Divider
- Surface
- Card

### 뉴스 전용

- BreakingBadge
- LiveBadge
- CategoryBadge
- NewsMeta
- TimeAgo
- ViewCount
- TrendingIndicator

### 입력

- Input
- SearchInput
- Textarea
- Select
- Checkbox
- Switch

### 피드백

- Skeleton
- Spinner
- EmptyState
- ErrorState
- Toast

### 오버레이

- Modal
- Drawer
- Tooltip
- Dropdown

## 폴더 구조

```text
src/components/ui/
  button/
  badge/
  card/
  input/
  modal/
  toast/
  ...
```

각 컴포넌트는 다음 파일 구조를 따른다.

```text
component/
 ├─ index.ts
 ├─ component.tsx
 ├─ component.types.ts
 └─ component.test.tsx (선택)
```

## 개발 원칙

- 디자인 토큰 외 색상 하드코딩 금지
- Tailwind 클래스 중복 최소화
- cn() 유틸 사용
- forwardRef 사용
- 접근성(ARIA) 지원
- 키보드 조작 지원
- 모바일 우선 설계
- any 사용 금지

## Story / Preview

개발용 UI Preview 페이지를 추가한다.

경로

```
/ui-preview
```

다음 항목을 모두 확인 가능해야 한다.

- 버튼 종류
- 배지 종류
- 입력 요소
- 카드
- 로딩
- Toast
- Modal
- Drawer
- Tooltip

## 구현하지 않을 기능

- 실제 뉴스 API
- Header
- Footer
- Hero
- 뉴스 리스트
- 뉴스 상세
- 검색 기능
- 로그인

## 완료 조건

- 모든 컴포넌트 재사용 가능
- 디자인 토큰만 사용
- Dark Mode 대응
- Hover / Focus / Disabled 상태 지원
- 반응형 확인
- 접근성 확인
- pnpm lint 성공
- pnpm typecheck 성공
- pnpm build 성공

## 검증

```bash
pnpm lint
pnpm typecheck
pnpm build
```

## Claude Code 실행 프롬프트

현재 저장소를 분석한 뒤 TASK-003만 구현한다.

목표는 공통 UI 컴포넌트 시스템 구축이다.

반드시 TASK-002 디자인 토큰만 사용한다.

새로운 색상이나 spacing을 임의로 만들지 않는다.

Button, Badge, Card, Input, Modal, Drawer, Tooltip, Toast, Skeleton 등 재사용 가능한 컴포넌트를 구축한다.

개발 완료 후 lint, typecheck, build를 실행하고 결과를 보고한다.
