# TASK-015 — 검색 자동완성 · 인기 검색어 서버 사이드 전환

## 목적

TASK-013에서 검색 실행(`searchArticles`)만 서버 사이드로 전환하고 자동완성 ·
최근 검색어 · 인기 검색어는 범위 밖으로 남겨뒀다. 이번 Task에서는 그중
서버로 옮기는 것이 타당한 두 가지 — 자동완성, 인기 검색어 — 를 마저
전환한다.

"최근 검색어"는 사용자 로컬 브라우징 이력이라 애초에 서버 개념이 성립하지
않는다(TASK-011 개인화 데이터와 동일하게 `localStorage` 전용). 이번 Task에서도
그대로 둔다.

---

# 선행 조건

- TASK-001 ~ TASK-014 완료
- `pnpm lint`, `pnpm typecheck`, `pnpm build`가 성공한다

---

# 구현 목표

1. `src/lib/news-api/suggestions.ts`: 기존 `mock-search.ts`의
   `getAutocompleteSuggestions`를 감싼 비동기 `fetchAutocompleteSuggestions(query, limitPerGroup?)`
2. `GET /api/search/suggestions?q=&limitPerGroup=` Route Handler — 위 서비스
   함수를 재사용
3. "인기 검색어"는 트렌딩 키워드와 데이터가 완전히 같으므로(`getPopularSearchKeywords`가
   내부적으로 `MOCK_TRENDING_KEYWORDS`를 그대로 정렬) 새 엔드포인트를 만들지
   않고 TASK-012의 기존 `GET /api/trending-keywords`를 그대로 재사용한다
4. `useSearchCombobox` 훅
   - 자동완성(`suggestionGroups`)을 `useMemo` 동기 계산에서 debounce된
     검색어(`debouncedQuery`, 이미 TASK-010에서 준비됨)가 바뀔 때마다
     `/api/search/suggestions`를 호출하는 구조로 전환. `AbortController`로
     오래된 응답이 최신 응답을 덮어쓰지 않게 한다
   - 인기 검색어(`popularOptions`)는 마운트 시 한 번만 `/api/trending-keywords?limit=6`을 호출
   - 최근 검색어(`recentOptions`)는 변경하지 않는다(`useRecentSearches`, localStorage)
5. `SearchBox`: 자동완성 응답을 기다리는 동안 "일치하는 추천 결과가
   없습니다" 문구가 잠깐 깜빡이지 않도록 로딩 상태를 반영

---

# 폴더 구조

```text
src/lib/news-api/
 └─ suggestions.ts (신규)

src/app/api/search/
 └─ suggestions/route.ts (신규)
```

---

# 구현하지 않을 기능

- 최근 검색어의 서버 전환(성격상 서버 개념이 성립하지 않음 — 계속 localStorage)
- 실제 검색 엔진 기반 자동완성 랭킹/오타 교정
- 자동완성 응답 캐싱(TASK-013의 `unstable_cache`를 자동완성에는 적용하지
  않는다 — 검색어별 카디널리티가 너무 높아 캐시 적중률이 낮다)

---

# 완료 조건

- `SearchBox` 자동완성이 `/api/search/suggestions`를 호출한다
- 인기 검색어가 `/api/trending-keywords`를 호출한다
- 최근 검색어는 그대로 `localStorage` 기반으로 동작한다
- 자동완성 로딩 중 "결과 없음" 문구가 깜빡이지 않는다
- pnpm lint 성공 (특히 `react-hooks/set-state-in-effect` 위반 없음)
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

현재 저장소와 TASK-001~014 결과를 분석한 후 TASK-015만 구현한다.

목표는 `SearchBox`의 자동완성과 인기 검색어를 클라이언트 직접 계산에서
API 호출로 전환하는 것이다. 인기 검색어는 새 엔드포인트를 만들지 않고
TASK-012의 `/api/trending-keywords`를 재사용한다. 최근 검색어는 서버로
옮기지 않는다(사용자 로컬 데이터).

`useEffect` 안에서 setState를 동기적으로 호출하지 않도록 주의한다
(`react-hooks/set-state-in-effect` — 이 저장소의 eslint 설정이 감지한다).

작업 완료 후 lint, typecheck, build를 실행하고 결과를 보고한다.

---

# 다음 Task

TASK-016에서는 `NewsShareAction`을 실제 뉴스 카드에 연결할지(TASK-014에서
만든 `useShareArticle` 재사용), 실제 캐시 무효화 이벤트 파이프라인(속보
발행 시 자동 revalidate 호출) 중 우선순위를 정해 진행한다.
