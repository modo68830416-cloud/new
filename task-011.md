# TASK-011 — 사용자 개인화(북마크 · 읽기 기록 · 다크모드 · 설정) UI 구축

## 목적

TASK-001 ~ TASK-010에서 구축한 뉴스 플랫폼에 로그인 없이도 사용할 수 있는
개인화 기능의 UI와 클라이언트 상태 관리 구조를 구축한다.

회원가입, 로그인, 서버 동기화는 이번 Task 범위가 아니다.
모든 개인화 데이터는 브라우저 `localStorage`에 저장하며,
향후 실제 계정 시스템과 연동하기 쉬운 구조로 설계한다.

---

# 선행 조건

- TASK-001 ~ TASK-010 완료
- 뉴스 카드 시스템(TASK-007), Header/Layout(TASK-005), 뉴스 상세 페이지(TASK-009) 존재
- `pnpm lint`, `pnpm typecheck`, `pnpm build`가 성공한다

---

# 구현 목표

1. 북마크(저장한 뉴스) 저장 · 해제 · 목록
2. 읽기 기록(최근 본 뉴스) 자동 기록 · 목록 · 개별/전체 삭제
3. 다크모드 · 라이트모드 실제 전환 기능
   - TASK-002는 다크 테마 토큰만 정의했고, TASK-005 Header의 다크모드 버튼은
     "기능 없음" 자리표시자였다. 이번 Task에서 실제 전환 기능을 연결한다.
4. 사용자 설정 페이지(테마, 글자 크기, 데이터 저장 관리)
5. 뉴스 카드 · 뉴스 상세 페이지에 북마크 버튼 연결
6. 마이페이지 성격의 개인화 허브 라우트

실제 서버 동기화, 회원 시스템, 알림 발송은 구현하지 않는다.

---

# 폴더 구조

```text
src/components/personalization/
 ├─ bookmark-button/
 ├─ bookmark-list/
 ├─ reading-history-list/
 ├─ theme-toggle/
 ├─ settings-panel/
 └─ clear-data-dialog/

src/hooks/
 ├─ useBookmarks.ts
 ├─ useReadingHistory.ts
 └─ useTheme.ts

src/lib/
 └─ storage.ts   (localStorage 안전 wrapper: SSR-safe, JSON parse 오류 방어)

app/
 ├─ bookmarks/
 ├─ history/
 └─ settings/
```

---

# 북마크

기능

- 뉴스 카드 · 뉴스 상세 페이지에 북마크 토글 버튼 배치
- 저장 시 시각적 피드백(Toast 재사용)
- `/bookmarks` 페이지에서 저장한 뉴스를 목록으로 확인(TASK-007 카드/리스트 재사용)
- 개수 표시
- 전체 삭제 옵션

저장 데이터 예시

```ts
interface BookmarkEntry {
  articleId: string;
  slug: string;
  savedAt: string;
}
```

---

# 읽기 기록

기능

- 뉴스 상세 페이지 진입 시 자동 기록
- 최신순 정렬
- 최대 보관 개수 제한(예: 50개, 초과 시 오래된 항목 제거)
- `/history` 페이지에서 목록 확인
- 개별 삭제 · 전체 삭제

저장 데이터 예시

```ts
interface ReadingHistoryEntry {
  articleId: string;
  slug: string;
  viewedAt: string;
}
```

---

# 다크모드 전환

기능

- Header의 기존 다크모드 자리(TASK-005)에 실제 토글 연결
- 최초 진입 시 `prefers-color-scheme`을 기본값으로 사용
- 사용자가 명시적으로 선택하면 `localStorage`에 저장하고 우선 적용
- `/settings` 페이지에도 동일한 토글 제공
- 테마 전환 시 깜빡임(FOUC)을 최소화한다

TASK-002에서 정의한 다크 테마 토큰을 기반으로 하되,
라이트 테마 값도 대비 기준(WCAG AA)을 만족하도록 정의한다.
새로운 색상 체계를 임의로 만들지 않고 기존 토큰 구조를 확장한다.

---

# 설정 페이지

`/settings`에서 다음을 제공한다.

- 테마(다크 · 라이트 · 시스템 기본값)
- 글자 크기(작게 · 기본 · 크게) — 본문 읽기용
- 저장된 데이터 관리(북마크 · 읽기 기록 전체 삭제, 확인 다이얼로그 사용)
- 현재 저장 데이터 요약(북마크 수, 읽기 기록 수)

실제 알림 설정, 언어 설정, 계정 설정은 UI를 추가하지 않는다.

---

# 개인화 허브

간단한 `/bookmarks`, `/history`, `/settings` 각 페이지가 서로 이동 가능하도록
공통 서브 내비게이션(탭 또는 링크)을 제공한다.

빈 상태(북마크 없음 · 읽기 기록 없음)는 TASK-007의 Empty 상태 컴포넌트를 재사용한다.

---

# 반응형

Desktop

- 설정 페이지: 사이드 탭 + 콘텐츠
- 북마크 · 히스토리: 카드 그리드 또는 리스트

Mobile

- 설정 페이지: 세로 스택, 탭을 상단 스크롤 영역으로 전환
- 북마크 · 히스토리: 단일 열 리스트

---

# 접근성

- 북마크 버튼: `aria-pressed`로 저장 상태 표시, 아이콘만이 아니라 접근 가능한 라벨 제공
- 다크모드 토글: 키보드 조작 가능, 현재 상태를 텍스트로도 확인 가능
- 데이터 삭제는 되돌릴 수 없으므로 확인 다이얼로그(TASK-003 Modal 재사용) 사용
- 설정 변경에 대한 상태 알림은 `aria-live` 또는 Toast 사용
- 저장 개수, 삭제 결과 등 상태를 색상만으로 표현하지 않는다

---

# Preview

```
/personalization-preview
```

확인 항목

- Bookmark Button (저장/해제)
- Bookmark List (데이터 있음 · 없음)
- Reading History List (데이터 있음 · 없음)
- Theme Toggle (dark/light/system)
- Settings Panel
- Clear Data Dialog

---

# 구현하지 않을 기능

- 실제 회원가입 · 로그인
- 서버 데이터 동기화
- 소셜 로그인
- 실제 푸시 알림 발송
- 프로필 이미지 업로드
- 결제 · 구독
- 다국어 설정

---

# 완료 조건

- Bookmark 저장 · 해제 · 목록 · 삭제
- Reading History 자동 기록 · 목록 · 삭제
- 다크모드 · 라이트모드 실제 전환(시스템 기본값 포함)
- Settings 페이지(테마, 글자 크기, 데이터 관리)
- 뉴스 카드 · 상세 페이지에 북마크 버튼 연결
- localStorage 접근이 SSR 환경에서 오류를 일으키지 않는다
- /personalization-preview 제공
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

현재 저장소와 TASK-001~010 결과를 분석한 후 TASK-011만 구현한다.

목표는 북마크, 읽기 기록, 다크모드 전환, 설정 페이지 UI와
localStorage 기반 클라이언트 상태 관리 구조를 구축하는 것이다.

기존 뉴스 카드 시스템(TASK-007), UI 컴포넌트(TASK-003), 디자인 토큰(TASK-002),
Header의 다크모드 자리(TASK-005)를 재사용하고 새로운 디자인 토큰이나
중복 컴포넌트를 만들지 않는다.

실제 로그인, 서버 동기화, 알림 발송 기능은 구현하지 않는다.

작업 완료 후 lint, typecheck, build를 실행하고 결과를 보고한다.

---

# 다음 Task

TASK-012에서는 실제 뉴스 API/데이터 통합과 서버 사이드 데이터 페칭 구조를 진행한다.
