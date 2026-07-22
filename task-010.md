# TASK-010 — 검색(Search) · 필터(Filter) · 태그(Tag) · 아카이브 UI 구축

## 목적

TASK-001 ~ TASK-009에서 구축한 뉴스 플랫폼을 기반으로
사용자가 원하는 뉴스를 빠르게 탐색할 수 있는 검색 및 필터링 UI를 구축한다.

이번 Task는 **UI, 상태관리 구조, 라우팅, 접근성**까지 구현하며
실제 검색 API 및 인덱싱은 이후 Task에서 연결한다.

---

# 선행 조건

- TASK-001 ~ TASK-009 완료
- 뉴스 카드 시스템 구축
- 카테고리 페이지 구축
- 기사 상세 페이지 구축

---

# 구현 목표

1. 글로벌 검색 페이지
2. 검색 입력(Search Box)
3. 자동완성 UI(Mock)
4. 최근 검색어
5. 인기 검색어
6. 검색 결과 페이지
7. 필터 패널
8. 태그 시스템
9. 정렬(Sort)
10. 날짜 범위 선택 UI
11. 아카이브 페이지
12. 검색 상태(Loading / Empty / Error)

---

# 권장 폴더 구조

```text
src/components/search/
 ├─ search-box/
 ├─ search-suggestions/
 ├─ recent-searches/
 ├─ popular-searches/
 ├─ search-results/
 ├─ filter-panel/
 ├─ tag-filter/
 ├─ sort-selector/
 ├─ archive-calendar/
 └─ search-states/
```

---

# 라우트

```text
/search
/search?q=...
/archive
/tag/[slug]
```

---

# Search Box

지원

- debounce 구조 준비
- Clear 버튼
- Keyboard Navigation
- ESC 닫기
- Enter 검색

실제 API 호출 없음.

---

# 자동완성

Mock 데이터 기반

표시

- 기사
- 카테고리
- 태그
- 추천 검색어

ArrowUp / ArrowDown / Enter 지원

---

# 검색 결과

표시

- 결과 개수
- 검색어 강조
- 뉴스 카드 재사용
- 페이지네이션 자리(UI)

---

# Filter Panel

지원

- 카테고리
- 콘텐츠 유형
- 날짜
- 정렬
- 속보만
- Live만

Desktop: Sidebar

Mobile: Drawer

---

# Tag System

태그 클릭 시

```
/tag/[slug]
```

이동 가능한 구조.

---

# Sort

옵션

- 최신순
- 인기순
- 조회순
- 관련도(Mock)

---

# Archive

UI 제공

- 연도
- 월
- 달력
- 날짜 선택

실제 데이터 없음.

---

# 상태

Loading
Empty
Error

공통 상태 컴포넌트 사용

---

# Preview

```
/search-preview
```

확인

- Search Box
- Suggestions
- Filters
- Results
- Tags
- Archive

---

# 접근성

- search landmark
- aria-expanded
- aria-controls
- combobox
- listbox
- option
- keyboard navigation
- focus-visible

---

# 구현하지 않을 기능

- 실제 검색 엔진
- Elasticsearch
- OpenSearch
- DB
- API
- 음성 검색

---

# 완료 조건

- Search UI
- Suggestion UI
- Filter Panel
- Tag UI
- Sort UI
- Archive UI
- search-preview
- 반응형
- 접근성
- pnpm lint
- pnpm typecheck
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

TASK-001~009를 분석한 뒤 TASK-010만 구현한다.

검색 UI, 자동완성, 필터, 태그, 아카이브를 구현한다.

뉴스 카드 시스템을 재사용하고 Mock 데이터만 사용한다.

실제 검색 API는 구현하지 않는다.

작업 완료 후 lint, typecheck, build를 실행하고 결과를 보고한다.

---

# 다음 Task

TASK-011에서는 사용자 개인화(북마크, 읽기 기록, 다크모드, 설정) UI를 구축한다.
