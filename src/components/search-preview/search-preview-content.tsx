"use client";

import { useMemo, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SubSection } from "@/components/ui-preview/section";
import {
  ArchiveCalendar,
  FilterDrawer,
  FilterPanel,
  PopularSearches,
  RecentSearches,
  SearchBox,
  SearchResults,
  SearchSuggestions,
  SortSelector,
  TagFilter,
  useRecentSearches,
} from "@/components/search";
import {
  DEFAULT_SEARCH_FILTERS,
  getAutocompleteSuggestions,
  getPopularSearchKeywords,
  getPopularTags,
  searchArticles,
  type SearchFilterState,
  type SearchSortOption,
  type SuggestionOption,
} from "@/data/mock-search";

const CHECKLIST = [
  "Search Box — role=\"search\" 랜드마크 + role=\"combobox\" 입력, debounce 구조, Clear 버튼, ArrowUp/ArrowDown/Enter 탐색, ESC 닫기",
  "자동완성(Suggestions) — Mock 데이터 기반 기사/카테고리/태그/추천 검색어, role=\"listbox\"/role=\"option\", aria-activedescendant",
  "최근 검색어 — 브라우저 localStorage 기반 mock 상태, 전체 삭제",
  "인기 검색어 — 트렌딩 키워드(Mock) + 순위 변동 표시",
  "검색 결과 — 결과 개수 + 검색어 강조 + TASK-007 뉴스 카드/그리드 재사용 + 페이지네이션 자리(UI)",
  "Filter Panel — 카테고리/콘텐츠 유형/날짜/정렬/속보만/Live만, 데스크톱 사이드바 + 모바일 Drawer(TASK-003)",
  "Tag System — 태그 클릭 시 /tag/[slug] 이동",
  "Sort — 최신순/인기순/조회순/관련도(Mock)",
  "Archive — 연도/월/달력/날짜 선택 UI (실제 데이터 없음)",
  "상태 — Loading/Empty/Error는 TASK-007 공통 상태 컴포넌트 재사용",
  "실제 검색 API·Elasticsearch·DB·음성 검색은 구현하지 않는다",
];

const DEMO_QUERY_SUGGESTIONS = "정";

function useSuggestionsDemo() {
  const [query, setQuery] = useState(DEMO_QUERY_SUGGESTIONS);
  const groups = useMemo(() => getAutocompleteSuggestions(query), [query]);
  return { query, setQuery, groups };
}

type ResultsDemoMode = "results" | "loading" | "empty" | "error";

/**
 * 검색/필터/태그/아카이브 UI 개발용 미리보기 페이지 (TASK-010).
 *
 * `@/data/mock-search`만 사용하며, 실제 라우트(`/search`, `/tag/[slug]`,
 * `/archive`)와 동일한 컴포넌트를 재사용해 검수한다. 실제 검색 API는
 * 구현하지 않는다.
 */
export function SearchPreviewContent() {
  const [filters, setFilters] = useState<SearchFilterState>(DEFAULT_SEARCH_FILTERS);
  const [sort, setSort] = useState<SearchSortOption>("latest");
  const [resultsMode, setResultsMode] = useState<ResultsDemoMode>("results");
  const [resultsQuery, setResultsQuery] = useState("배터리");

  const suggestionsDemo = useSuggestionsDemo();
  const { items: recentItems, clearAll: clearRecent } = useRecentSearches();

  const recentOptions: SuggestionOption[] = useMemo(
    () =>
      recentItems.map((term) => ({
        id: `preview-recent-${encodeURIComponent(term)}`,
        type: "recent" as const,
        label: term,
        href: `/search?q=${encodeURIComponent(term)}`,
      })),
    [recentItems],
  );

  const popularOptions: SuggestionOption[] = useMemo(
    () =>
      getPopularSearchKeywords(6).map((keyword) => ({
        id: `preview-popular-${keyword.id}`,
        type: "popular" as const,
        label: keyword.keyword,
        href: `/search?q=${encodeURIComponent(keyword.keyword)}`,
        rank: keyword.rank,
        change: keyword.change,
      })),
    [],
  );

  const resultsArticles = useMemo(
    () => searchArticles(resultsQuery, filters, sort),
    [resultsQuery, filters, sort],
  );

  const popularTags = useMemo(() => getPopularTags(14), []);

  return (
    <div className="container-dashboard py-12">
      <header className="mb-12 flex flex-col gap-3">
        <p className="type-caption text-text-muted">TASK-010</p>
        <h1 className="type-page-title">검색 · 필터 · 태그 · 아카이브 미리보기</h1>
        <p className="type-body max-w-prose text-text-secondary">
          Mock 데이터만 사용하는 검색 UI 컴포넌트를 한 화면에서 검수합니다. 실제 검색
          엔진·API·음성 검색은 포함하지 않습니다.
        </p>
      </header>

      <Section
        id="search-box"
        title="1. Search Box"
        description="role=search 랜드마크 + 콤보박스(role=combobox). 입력 후 ArrowDown/ArrowUp으로 옵션을 탐색하고 Enter로 선택/검색, Esc로 드롭다운을 닫을 수 있습니다. Clear 버튼은 텍스트가 있을 때만 나타납니다."
      >
        <div className="flex flex-col gap-6">
          <SubSection title="기본(md)">
            <SearchBox className="max-w-xl" placeholder="예: 배터리, 정치, IT" />
          </SubSection>
          <SubSection title="작은 사이즈(sm) + 초기값">
            <SearchBox size="sm" defaultValue="야구" className="max-w-sm" />
          </SubSection>
        </div>
      </Section>

      <Section
        id="suggestions"
        title="2. 자동완성(Suggestions)"
        description="기사 / 카테고리 / 태그 / 추천 검색어 4개 그룹 중 결과가 있는 그룹만 표시됩니다. 아래 입력은 이 섹션 전용 데모입니다(실제 키보드 탐색은 위 Search Box에서 확인하세요)."
      >
        <div className="flex max-w-md flex-col gap-3">
          <input
            value={suggestionsDemo.query}
            onChange={(event) => suggestionsDemo.setQuery(event.target.value)}
            placeholder="자동완성 데모 검색어"
            className="h-10 rounded-md border border-border-default bg-surface px-3 text-sm text-text-primary"
          />
          <div className="rounded-md border border-border-default bg-surface p-1">
            <SearchSuggestions groups={suggestionsDemo.groups} onSelect={() => undefined} />
          </div>
        </div>
      </Section>

      <Section
        id="recent-popular"
        title="3. 최근 검색어 / 인기 검색어"
        description="최근 검색어는 브라우저 localStorage에 저장되는 mock 상태입니다(Search Box에서 검색을 실행하면 쌓입니다). 인기 검색어는 트렌딩 키워드(Mock)를 순위 기준으로 보여줍니다."
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="rounded-md border border-border-default bg-surface p-1">
            <RecentSearches
              options={recentOptions}
              onSelect={() => undefined}
              onClearAll={clearRecent}
            />
            {recentOptions.length === 0 && (
              <p className="type-caption px-3 py-4 text-center text-text-muted">
                아직 최근 검색어가 없습니다. 위 Search Box에서 검색해 보세요.
              </p>
            )}
          </div>
          <div className="rounded-md border border-border-default bg-surface p-1">
            <PopularSearches options={popularOptions} onSelect={() => undefined} />
          </div>
        </div>
      </Section>

      <Section
        id="results"
        title="4. 검색 결과"
        description="TASK-007 뉴스 카드/그리드 시스템을 그대로 재사용합니다. 아래 버튼으로 로딩/빈 결과/오류 상태를 확인할 수 있습니다."
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <input
              value={resultsQuery}
              onChange={(event) => setResultsQuery(event.target.value)}
              placeholder="검색 결과 데모 검색어"
              className="h-9 w-48 rounded-md border border-border-default bg-surface px-3 text-xs text-text-primary"
            />
            <Button
              size="sm"
              variant={resultsMode === "results" ? "primary" : "secondary"}
              onClick={() => setResultsMode("results")}
            >
              정상 결과
            </Button>
            <Button
              size="sm"
              variant={resultsMode === "loading" ? "primary" : "secondary"}
              onClick={() => setResultsMode("loading")}
            >
              Loading
            </Button>
            <Button
              size="sm"
              variant={resultsMode === "empty" ? "primary" : "secondary"}
              onClick={() => setResultsMode("empty")}
            >
              Empty
            </Button>
            <Button
              size="sm"
              variant={resultsMode === "error" ? "primary" : "secondary"}
              onClick={() => setResultsMode("error")}
            >
              Error
            </Button>
          </div>

          <SearchResults
            query={resultsQuery}
            articles={resultsMode === "empty" ? [] : resultsArticles}
            isLoading={resultsMode === "loading"}
            error={resultsMode === "error" ? "검색 결과를 불러오지 못했습니다(Mock)." : null}
            onRetry={() => setResultsMode("results")}
          />
        </div>
      </Section>

      <Section
        id="filters"
        title="5. Filter Panel & Sort"
        description="데스크톱은 사이드바(lg 이상에서만 보임), 모바일은 Drawer(TASK-003)입니다. 정렬(Sort Selector)은 필터 패널 상단과 독립 컴포넌트로 모두 확인할 수 있습니다."
      >
        <div className="flex flex-col gap-6">
          <SubSection title="Sort Selector(독립 사용)">
            <SortSelector value={sort} onChange={setSort} className="max-w-40" />
          </SubSection>
          <SubSection title="모바일 Filter Drawer">
            <FilterDrawer
              filters={filters}
              onFiltersChange={setFilters}
              sort={sort}
              onSortChange={setSort}
              onReset={() => {
                setFilters(DEFAULT_SEARCH_FILTERS);
                setSort("latest");
              }}
            />
          </SubSection>
          <SubSection title="데스크톱 Filter Panel(lg 이상)">
            <FilterPanel
              filters={filters}
              onFiltersChange={setFilters}
              sort={sort}
              onSortChange={setSort}
              onReset={() => {
                setFilters(DEFAULT_SEARCH_FILTERS);
                setSort("latest");
              }}
              className="!block max-w-xs"
            />
          </SubSection>
        </div>
      </Section>

      <Section
        id="tags"
        title="6. Tag System"
        description="태그를 클릭하면 /tag/[slug]로 이동합니다. slug는 태그 문자열 자체를 사용합니다(NewsArticle.tags 재사용, 새 필드 추가 없음)."
      >
        <TagFilter tags={popularTags} label="인기 태그" />
      </Section>

      <Section
        id="archive"
        title="7. Archive"
        description="연도/월/달력/날짜 선택 UI만 제공하며, 실제 날짜별 기사 데이터 연동은 하지 않습니다."
      >
        <div className="max-w-md">
          <ArchiveCalendar />
        </div>
      </Section>

      <SubSection title="완료 조건 체크리스트">
        <div className="rounded-md border border-border-default bg-surface p-6">
          <ul className="flex flex-col gap-3">
            {CHECKLIST.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-text-secondary">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-success" aria-hidden />
                <span className="type-body">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </SubSection>
    </div>
  );
}
