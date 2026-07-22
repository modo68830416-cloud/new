# TASK-016 — 뉴스 카드 공유 버튼 연결

## 목적

TASK-007에서 `NewsShareAction`(공유 버튼 UI primitive, `onShare` 콜백을 받는
구조)을 만들어 뒀지만 실제로는 어떤 카드에도 렌더링되지 않았고, TASK-014에서
`FeaturedHero`에만 실제 공유 동작(`useShareArticle` — Web Share API 우선,
클립보드 복사 폴백)을 연결했다. 이번 Task에서는 이 동작을 뉴스 카드 9종
전체에 연결한다.

---

# 선행 조건

- TASK-001 ~ TASK-015 완료
- `pnpm lint`, `pnpm typecheck`, `pnpm build`가 성공한다

---

# 구현 목표

1. `useShareArticle`(TASK-014)이 공유 결과에 따른 Toast 안내까지 내부에서
   처리하도록 정리한다 — 현재 `FeaturedHeroShareButton`에만 있는
   성공/복사됨/실패 Toast 분기를 훅으로 옮겨, 이후 호출부(카드 공유 버튼
   포함)가 매번 같은 분기를 반복하지 않게 한다.
2. `src/components/news/primitives/news-share-button.tsx`에 `NewsShareButton`
   추가 — `article: NewsArticle`을 받아 `useShareArticle`로 공유하고,
   기존 `NewsShareAction`(TASK-007 UI, stretched link 위에서 독립적으로
   클릭되는 stacking 처리가 이미 돼 있음)을 그대로 렌더링한다.
   `BookmarkButton`(TASK-011)과 동일한 역할 분담 — 상태/동작은 이 컴포넌트가,
   시각적 표현은 기존 primitive가 담당한다.
3. 카드 9종(`StandardNewsCard`, `BreakingNewsCard`, `FeaturedNewsCard`,
   `HorizontalNewsCard`, `OpinionNewsCard`, `VideoNewsCard`,
   `CompactNewsCard`, `RankedNewsCard`, `PhotoNewsCard`)에 `NewsShareButton`을
   `BookmarkButton` 바로 옆에 배치한다. 카드마다 이미 정해진 배치 방식
   (`ml-auto` 우측 정렬 / `shrink-0` / photo 카드의 이미지 위 절대 위치)을
   그대로 따르고 새로운 레이아웃을 만들지 않는다.

---

# 폴더 구조

```text
src/components/news/primitives/
 └─ news-share-button.tsx (신규)
```

---

# 구현하지 않을 기능

- `NewsShareAction`/`NewsShareButton` 자체의 시각 디자인 변경(TASK-007 그대로)
- 카드 레이아웃 자체의 재설계(버튼 배치만 기존 `BookmarkButton` 옆에 추가)
- 공유 이력 저장, 공유 횟수 카운트 등 새로운 데이터 모델

---

# 완료 조건

- 카드 9종 모두에서 공유 버튼이 실제로 동작한다(Web Share API 또는 클립보드
  복사 + Toast 안내)
- `FeaturedHeroShareButton`이 정리된 `useShareArticle`을 그대로 사용한다
  (중복된 Toast 분기 제거)
- 카드 전체 링크(stretched link)와 공유 버튼이 중첩 클릭 없이 독립적으로
  동작한다(`NewsShareAction`의 기존 `z-sticky` 처리 재사용)
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

현재 저장소와 TASK-001~015 결과를 분석한 후 TASK-016만 구현한다.

목표는 TASK-007의 `NewsShareAction`과 TASK-014의 `useShareArticle`을 연결해
뉴스 카드 9종 모두에 실제로 동작하는 공유 버튼을 추가하는 것이다. 새 카드
레이아웃을 설계하지 않고, 각 카드에 이미 있는 `BookmarkButton` 배치 방식을
그대로 따른다.

작업 완료 후 lint, typecheck, build를 실행하고 결과를 보고한다.

---

# 다음 Task

TASK-017에서는 실제 캐시 무효화 이벤트 파이프라인(속보 발행 시 자동
revalidate 호출)을 다룰지, 아니면 이번까지 쌓인 기능들의 종합 회귀 테스트
(E2E 또는 수동 시나리오 점검)를 우선할지 결정한다.
