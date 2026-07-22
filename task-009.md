# TASK-009 — 카테고리 페이지 및 뉴스 상세 페이지 구축

## 목적

TASK-001 ~ TASK-008에서 구축한 컴포넌트를 기반으로
카테고리 목록 페이지와 뉴스 상세 페이지 레이아웃을 구축한다.

이번 Task에서는 UI와 라우팅 구조를 완성하며,
실제 API 연동은 이후 Task에서 진행한다.

---

# 선행 조건

- TASK-001 ~ TASK-008 완료
- 뉴스 카드 시스템 완료
- Hero 및 Layout 완료
- Live UI 완료

---

# 구현 목표

다음 페이지를 구축한다.

1. 카테고리 메인 페이지
2. 카테고리 뉴스 목록
3. 뉴스 상세 페이지
4. 기사 본문
5. 기사 메타 정보
6. 관련 기사
7. 공유 버튼(UI)
8. 읽기 진행 표시(Read Progress)
9. 목차(Table of Contents)
10. 작성자 정보

---

# 폴더 구조

```text
app/
 ├─ category/
 │   └─ [slug]/
 └─ news/
     └─ [slug]/
```

---

# Category Page

포함

- 카테고리 제목
- 설명
- Featured News
- 최신 뉴스
- 인기 뉴스
- 페이지네이션 자리(UI)

---

# News Detail

표시

- 제목
- 부제목
- 대표 이미지
- 카테고리
- 작성자
- 발행일
- 수정일
- 조회수
- 본문(Mock)

---

# 본문

지원

- H2
- H3
- Paragraph
- List
- Quote
- Image Placeholder

실제 CMS 연결 없음

---

# Read Progress

상단 Progress Bar

스크롤 위치에 따라 변화

---

# TOC

본문 Heading 기반

현재 위치 Highlight

---

# Related News

뉴스 카드 재사용

- 같은 카테고리
- 최신 기사

Mock 사용

---

# Author Card

표시

- 이름
- 소개
- 작성 기사 수(Mock)

---

# Share UI

버튼

- Facebook
- X
- LinkedIn
- Copy Link

실제 공유 기능 없음

---

# 반응형

Desktop

본문 + Sidebar

Mobile

본문 우선

Sidebar 하단

---

# 접근성

- article
- aside
- nav
- time
- heading
- aria-current

---

# Preview

```
/article-preview
```

확인

- Category
- Detail
- TOC
- Related
- Author
- Progress

---

# 구현하지 않을 기능

- 실제 댓글
- 로그인
- 북마크
- 좋아요
- API
- 광고

---

# 완료 조건

- Category Page
- News Detail
- TOC
- Progress
- Related
- Author
- Share UI
- article-preview
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

현재 저장소와 TASK-001~008 결과를 분석한 후 TASK-009만 구현한다.

목표는 카테고리 페이지와 뉴스 상세 페이지 UI 구축이다.

기존 뉴스 카드 시스템을 재사용하고,
본문, TOC, Read Progress, Related News를 구현한다.

실제 API나 댓글 기능은 구현하지 않는다.

작업 완료 후 lint, typecheck, build를 실행하고 결과를 보고한다.

---

# 다음 Task

TASK-010에서는 검색(Search), 필터(Filter), 태그(Tag), 아카이브 UI를 구축한다.
