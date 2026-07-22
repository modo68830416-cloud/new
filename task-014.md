# TASK-014 — 접근성/성능 감사 및 "준비 중" Placeholder 정리

## 목적

TASK-001 ~ TASK-013에 걸쳐 쌓인 "준비 중"(`aria-disabled` + `title`) 자리표시자
중 이후 Task에서 실제 기능이 이미 갖춰졌는데도 그대로 남아 있는 것이 있는지
점검하고, 정말 이번 Task 범위를 벗어나는 것은 이유를 남긴 채 유지한다.
동시에 컴포넌트 전반의 접근성 · 성능을 코드 레벨에서 감사하고 발견된 문제를
고친다.

**참고**: 이 저장소 환경에는 Chrome/Chromium과 Lighthouse가 설치돼 있지 않다
(오프라인 sandbox, 헤드리스 브라우저 없음). 따라서 이번 감사는 실제
Lighthouse 실행이 아니라 코드 리뷰 기반 수동 감사다 — WCAG 2.1 AA 기준,
Next.js 공식 성능 가이드 기준으로 점검한다.

---

# 선행 조건

- TASK-001 ~ TASK-013 완료
- `pnpm lint`, `pnpm typecheck`, `pnpm build`가 성공한다

---

# 감사 결과

## 1. Placeholder 재검토

| 위치 | 상태 | 조치 |
| --- | --- | --- |
| `FeaturedHero`의 "기사 읽기" 버튼 | TASK-009에서 `/news/[slug]` 상세 페이지가 이미 존재하는데도 여전히 `aria-disabled="true"` 상태로 남아 있었다(진짜 `disabled` 속성은 아니어서 실제로는 클릭 가능하지만 아무 동작도 하지 않는 불일치 상태). | `LinkButton`으로 교체해 실제 기사로 연결 |
| `FeaturedHero`의 공유 버튼 | 동일하게 방치된 placeholder. `ShareButtons`(TASK-009, 기사 상세 페이지)는 이미 실제 공유 인텐트 + 클립보드 복사가 동작한다. | Web Share API(`navigator.share`) 우선 사용, 미지원 환경은 클립보드 복사로 폴백하는 `useShareArticle` 훅을 추가해 연결 |
| `Footer`의 "이용약관"/"개인정보처리방침" | `<a href="#" aria-disabled="true">`. 앵커 요소는 `aria-disabled`만으로 키보드 활성화를 막지 못해, 스크린리더에는 "비활성"으로 안내되지만 실제로는 여전히 포커스/클릭이 가능한 불일치 상태(경미한 접근성 결함). | 실제 콘텐츠를 꾸며내지 않고, "준비 중"임을 솔직하게 안내하는 최소한의 실제 페이지 `/terms`, `/privacy`를 만들어 진짜 링크로 연결 |
| `NewsShareAction`(뉴스 카드 공유 버튼 primitive) | 실제로는 어떤 카드에도 아직 렌더링되지 않는 미사용 primitive(`onShare` 콜백을 받는 구조만 준비돼 있음). | 카드 레이아웃에 새 버튼을 추가하는 것은 TASK-007에서 확정한 카드 디자인을 임의로 바꾸는 것이므로 이번 Task에서 다루지 않는다. `onShare`에 `useShareArticle`을 연결하는 것은 다음 Task 후보로 남긴다. |
| `PaginationPlaceholder`(카테고리/태그/검색) | 이미 `disabled` 속성(진짜 HTML 비활성)을 정확히 사용하고 있어 접근성 결함은 없다. 다만 mock 데이터가 카테고리당 3건 안팎이라 실제 페이지네이션을 구현해도 체감 가치가 낮다. | 이번 Task에서 실제 페이지 이동 기능은 구현하지 않는다(그대로 유지) |

## 2. 접근성 감사(코드 레벨)

- Modal(`Radix Dialog`), Dropdown(`Radix DropdownMenu`) — 포커스 트랩 · Escape ·
  방향키 탐색을 Radix가 자동 처리. 문제 없음.
- SearchBox 콤보박스 — ARIA 1.2 콤보박스 패턴(`role="combobox"`,
  `aria-expanded`, `aria-activedescendant`, `role="listbox"`/`"option"`)을
  이미 직접 구현. 문제 없음.
- 다크/라이트 테마 색상 대비 — TASK-011에서 WCAG AA 기준으로 이미 검증됨.
  이후 Task에서 새 색상 토큰을 추가하지 않았으므로 재검증 대상 없음.
- Skip Link, 랜드마크(header/nav/main/footer) — TASK-001부터 유지, 문제 없음.
- 위 표의 `FeaturedHero`/`Footer` placeholder 2건은 실제 결함으로 확인돼 수정.

## 3. 성능 감사(코드 레벨)

- 이미지: `next/image` 전면 사용. 예외 2건(`AuthorCard`, `NewsSourceLine`의
  40~56px 아바타 `<img>`)은 이미 `eslint-disable` 주석으로 "최적화 대상이
  아닌 장식 요소"라는 근거가 남아 있고, 현재 mock 데이터에는
  `author.profileImage`가 설정된 적이 없어 실행되지도 않는 경로다 — 추가
  조치 불필요.
- 폰트: `next/font/google`(Geist/Geist Mono)로 자체 호스팅, 외부 네트워크
  왕복 없음. 문제 없음.
- 서버/클라이언트 컴포넌트 경계: TASK-012~013에서 도입한 `*Server.tsx`
  패턴 덕분에 Hero/속보 위젯 등은 필요한 조각만 비동기 서버 컴포넌트로
  분리돼 있다. 새로 추가하는 `FeaturedHero` 공유 버튼도 전체 `FeaturedHero`를
  클라이언트로 바꾸지 않고, 버튼 하나만 별도의 작은 클라이언트 컴포넌트로
  분리한다(`FeaturedHeroShareButton`).

---

# 구현 목표

1. `src/hooks/useShareArticle.ts` — `navigator.share` 우선, 실패/미지원 시
   클립보드 복사로 폴백하는 공유 훅. 결과에 따라 호출부가 Toast를 띄울 수
   있도록 상태(성공/복사됨/실패)를 반환한다.
2. `FeaturedHero`
   - "기사 읽기": `Button`(placeholder) → `LinkButton href="/news/[slug]"`
   - 공유 버튼: 새 `FeaturedHeroShareButton.tsx`(작은 client 컴포넌트)로
     교체, `useShareArticle` + 기존 `useToast` 연결
3. `/terms`, `/privacy` 라우트 추가 — 실제 법적 문서를 작성하지 않고, 데모
   프로젝트임을 밝히는 짧고 정직한 안내문을 제공한다.
4. `Footer`의 두 링크를 `Link href="/terms"` / `Link href="/privacy"`로 교체

---

# 구현하지 않을 기능

- 실제 Lighthouse/axe-core 자동 실행(환경에 Chrome 없음) — 코드 리뷰로 대체
- `NewsShareAction`을 실제 뉴스 카드에 연결(카드 레이아웃 변경 필요, 범위 밖)
- 실제 페이지네이션(mock 데이터 규모상 가치 낮음)
- 실제 이용약관/개인정보처리방침 법률 문서 작성

---

# 완료 조건

- `FeaturedHero`의 "기사 읽기"가 실제 기사 상세 페이지로 이동한다
- `FeaturedHero`의 공유 버튼이 Web Share API 또는 클립보드 복사로 실제 동작하고 Toast로 결과를 알린다
- `/terms`, `/privacy`가 실제 라우트로 존재하고 Footer에서 연결된다
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

현재 저장소와 TASK-001~013 결과를 분석한 후 TASK-014만 구현한다.

`FeaturedHero`의 "기사 읽기"/공유 버튼처럼 이후 Task에서 실제 기능이 갖춰졌는데도
여전히 "준비 중" placeholder로 남아 있는 것을 찾아 연결하고, `Footer`의
`aria-disabled` 앵커 패턴처럼 실제 접근성 결함이 있는 곳을 고친다. 새 카드
디자인 추가, 실제 페이지네이션, 법률 문서 작성은 하지 않는다. Chrome/Lighthouse가
설치돼 있지 않으므로 자동 감사 대신 코드 레벨 리뷰로 접근성/성능을 점검한다.

작업 완료 후 lint, typecheck, build를 실행하고 결과를 보고한다.

---

# 다음 Task

TASK-015에서는 `NewsShareAction`을 실제 뉴스 카드에 연결할지, 검색
자동완성/최근/인기 검색어의 서버 전환, 또는 실제 캐시 무효화 이벤트
파이프라인(속보 발행 시 자동 revalidate 호출) 중 우선순위를 정해 진행한다.
