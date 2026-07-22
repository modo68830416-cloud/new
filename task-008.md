# TASK-008 — 실시간 속보 센터 및 트렌드 허브 구축

## 목적

TASK-001 ~ TASK-007에서 구축한 레이아웃과 뉴스 카드 시스템을 활용하여
실시간 뉴스 중심의 '속보 센터'와 '트렌드 허브' UI를 구축한다.

이번 Task에서는 UI와 상태 관리 구조만 구현하며,
실제 외부 뉴스 API 연결은 이후 Task에서 진행한다.

---

# 선행 조건

- TASK-001 ~ TASK-007 완료
- mock 뉴스 데이터 존재
- 뉴스 카드 시스템 구축 완료
- 공통 모션 및 디자인 시스템 사용

---

# 구현 목표

다음 기능의 UI를 구축한다.

1. 실시간 속보 센터
2. Live Update Timeline
3. Breaking News Feed
4. 실시간 인기 뉴스
5. 실시간 검색어
6. 급상승 키워드
7. 뉴스 업데이트 상태
8. 자동 새로고침 UI
9. 데이터 없음(Fallback) 처리

---

# 폴더 구조

```text
src/components/live/
 ├─ breaking-center/
 ├─ live-timeline/
 ├─ trending-hub/
 ├─ keyword-panel/
 ├─ refresh-status/
 ├─ update-banner/
 └─ auto-refresh/
```

---

# Breaking Center

구성

- 최신 속보
- 중요도 표시
- Live Badge
- 업데이트 시간
- 기사 카드

지원

- 최신순 정렬
- 중요도 색상 구분
- Skeleton
- Empty
- Error

---

# Live Timeline

시간순으로 업데이트 내역을 표시한다.

구성

- 시간
- 기사 제목
- 카테고리
- 상태 아이콘

모션

- 새로운 항목 추가 애니메이션
- Reduced Motion 지원

---

# Trending Hub

표시

- 인기 뉴스 Top10
- 많이 본 기사
- 많이 공유된 기사(UI만)
- 급상승 기사

모든 데이터는 mock 사용

---

# Keyword Panel

표시

- 실시간 검색어
- 상승
- 하락
- 신규
- 순위 변화

색상만으로 상태를 표현하지 않는다.

---

# Refresh Status

UI만 구현

표시

- 마지막 갱신 시각
- 자동 갱신 여부
- 연결 상태
- 수동 새로고침 버튼(UI)

실제 API 호출 없음

---

# Update Banner

새로운 뉴스가 있다고 가정한 상태 표시

예시

"새로운 속보 5건이 있습니다"

버튼

"새로고침"

동작은 Mock

---

# Auto Refresh

UI 상태

- ON
- OFF

향후 실제 polling과 연결할 수 있도록 구조 설계

---

# 반응형

Desktop

- Breaking Center + Trending Hub 2열

Tablet

- 1~2열

Mobile

- 세로 스택

---

# 접근성

- Live Region 고려
- aria-live="polite"
- 키보드 탐색
- Focus 관리

---

# Preview

```
/live-preview
```

확인 항목

- Breaking Feed
- Timeline
- Trending
- Keyword
- Refresh Status
- Empty
- Loading
- Error

---

# 구현하지 않을 기능

- 실제 뉴스 API
- WebSocket
- SSE
- Polling
- Database
- 로그인

---

# 완료 조건

- Breaking Center
- Live Timeline
- Trending Hub
- Keyword Panel
- Refresh Status
- Update Banner
- Auto Refresh UI
- live-preview
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

현재 저장소와 TASK-001~007 결과를 분석한 후 TASK-008만 구현한다.

목표는 실시간 속보 센터와 트렌드 허브 UI 구축이다.

모든 데이터는 mock 데이터를 사용하며,
향후 API 연결이 쉽도록 컴포넌트 구조를 설계한다.

기존 뉴스 카드 시스템을 적극 재사용하고,
새로운 디자인 토큰이나 중복 컴포넌트를 만들지 않는다.

작업 완료 후 lint, typecheck, build를 실행하고 결과를 보고한다.

---

# 다음 Task

TASK-009에서는 카테고리 페이지와 뉴스 상세 페이지 레이아웃을 구축한다.
