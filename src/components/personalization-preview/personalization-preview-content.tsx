"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Surface } from "@/components/ui/surface";
import { Button } from "@/components/ui/button";
import {
  BookmarkButton,
  BookmarkList,
  ReadingHistoryList,
  ThemeToggle,
  SettingsPanel,
  ClearDataDialog,
} from "@/components/personalization";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useReadingHistory } from "@/hooks/useReadingHistory";
import { useTheme } from "@/hooks/useTheme";
import { MOCK_NEWS } from "@/data/mock-news";
import { Section } from "@/components/ui-preview/section";

const SAMPLE_ARTICLES = MOCK_NEWS.slice(0, 4);

const A11Y_CHECKLIST = [
  "북마크 버튼은 aria-pressed로 저장 상태를 나타내고, 아이콘만이 아니라 aria-label/title로 접근 가능한 이름을 제공한다",
  "북마크 버튼은 카드 전체 stretched link(NewsCardLink)와 중첩된 <a> 없이, NewsShareAction과 동일한 relative z-sticky 패턴으로 독립 클릭된다",
  "다크모드 토글은 Tab/Enter/Space로 조작 가능하며, 현재 상태를 아이콘 색상뿐 아니라 title/aria-label(아이콘형) 또는 텍스트 라벨(segmented형)로도 확인할 수 있다",
  "전체 삭제 등 되돌릴 수 없는 동작은 항상 ClearDataDialog(TASK-003 Modal 재사용) 확인을 거친다",
  "저장/해제, 삭제 결과는 Toast 또는 aria-live 영역으로 알린다",
  "localStorage 접근은 src/lib/storage.ts를 거치며 SSR/파싱 오류에서 항상 안전한 fallback을 반환한다",
];

/**
 * TASK-011 개인화(북마크 · 읽기 기록 · 다크모드 · 설정) 개발용 미리보기
 * 페이지.
 *
 * `BookmarkList`/`ReadingHistoryList`는 실제 `localStorage`에 연결된
 * 컴포넌트다 — "데이터 있음/없음" 두 상태를 모두 확인할 수 있도록, 이
 * 페이지에서 mock 기사 몇 건을 직접 추가/삭제하는 버튼을 제공한다.
 */
export function PersonalizationPreviewContent() {
  const { addBookmark, clearAll: clearBookmarks } = useBookmarks();
  const { recordView, clearAll: clearHistory } = useReadingHistory();
  const { mode, resolvedTheme } = useTheme();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogResult, setDialogResult] = useState<string | null>(null);

  function addSampleBookmarks() {
    for (const article of SAMPLE_ARTICLES) {
      addBookmark({ articleId: article.id, slug: article.slug });
    }
  }

  function addSampleHistory() {
    for (const article of SAMPLE_ARTICLES) {
      recordView({ articleId: article.id, slug: article.slug });
    }
  }

  return (
    <div className="container-dashboard py-12">
      <header className="mb-12">
        <p className="type-metadata mb-3 text-accent-primary">
          Development Only · TASK-011
        </p>
        <h1 className="type-hero-title break-url">개인화 기능 미리보기</h1>
        <p className="type-body mt-4 max-w-prose text-text-secondary">
          북마크, 읽기 기록, 다크모드 · 라이트모드 전환, 설정 페이지 UI를
          한 화면에서 검수하기 위한 개발용 페이지다. 아래 상호작용은 실제
          이 브라우저의 <code>localStorage</code>에 반영된다.
        </p>
      </header>

      <Section
        id="bookmark-button"
        title="1. Bookmark Button"
        description="저장/해제를 토글하고 Toast 피드백을 확인한다. 카드 안에서 쓰일 때와 동일하게 아이콘형 · 라벨형을 모두 제공한다."
      >
        <div className="flex flex-wrap items-center gap-4">
          {SAMPLE_ARTICLES.slice(0, 2).map((article) => (
            <Surface key={article.id} radius="md" className="flex items-center gap-3 p-4">
              <p className="type-caption max-w-40 truncate">{article.title}</p>
              <BookmarkButton articleId={article.id} slug={article.slug} size="sm" />
            </Surface>
          ))}
          {SAMPLE_ARTICLES[2] && (
            <BookmarkButton
              articleId={SAMPLE_ARTICLES[2].id}
              slug={SAMPLE_ARTICLES[2].slug}
              showLabel
            />
          )}
        </div>
      </Section>

      <Section
        id="bookmark-list"
        title="2. Bookmark List"
        description="/bookmarks 페이지가 그대로 사용하는 컴포넌트다. 샘플 데이터를 추가/삭제해 '데이터 있음'과 '데이터 없음' 두 상태를 모두 확인할 수 있다."
      >
        <div className="mb-4 flex flex-wrap gap-2">
          <Button type="button" variant="secondary" size="sm" onClick={addSampleBookmarks}>
            샘플 북마크 4건 추가
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={clearBookmarks}>
            북마크 전체 삭제(빈 상태 보기)
          </Button>
        </div>
        <BookmarkList />
      </Section>

      <Section
        id="reading-history-list"
        title="3. Reading History List"
        description="/history 페이지가 그대로 사용하는 컴포넌트다. 최신순 정렬, 개별/전체 삭제를 확인한다."
      >
        <div className="mb-4 flex flex-wrap gap-2">
          <Button type="button" variant="secondary" size="sm" onClick={addSampleHistory}>
            샘플 읽기 기록 4건 추가
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={clearHistory}>
            읽기 기록 전체 삭제(빈 상태 보기)
          </Button>
        </div>
        <ReadingHistoryList />
      </Section>

      <Section
        id="theme-toggle"
        title="4. Theme Toggle"
        description="Header에서 쓰이는 아이콘형(dark/light 2단)과 설정 페이지에서 쓰이는 segmented형(dark/light/system 3단)을 모두 확인한다."
      >
        <div className="flex flex-wrap items-center gap-8">
          <div className="flex items-center gap-3">
            <p className="type-caption">아이콘형 (Header)</p>
            <ThemeToggle variant="icon" />
          </div>
          <div className="flex flex-col gap-2">
            <p className="type-caption">Segmented형 (설정 페이지)</p>
            <ThemeToggle variant="segmented" />
          </div>
        </div>
        <p className="type-caption mt-4" role="status">
          현재 선택: <strong className="text-text-primary">{mode}</strong> · 실제 적용된 테마:{" "}
          <strong className="text-text-primary">{resolvedTheme}</strong>
        </p>
      </Section>

      <Section
        id="settings-panel"
        title="5. Settings Panel"
        description="/settings 페이지 본문 전체다. 데스크톱은 사이드 탭 + 콘텐츠, 좁은 화면에서는 상단 가로 스크롤 탭으로 바뀐다."
      >
        <Surface radius="lg" className="p-5 sm:p-6">
          <SettingsPanel />
        </Surface>
      </Section>

      <Section
        id="clear-data-dialog"
        title="6. Clear Data Dialog"
        description="되돌릴 수 없는 삭제 동작 전에 항상 거치는 확인 다이얼로그(TASK-003 Modal 재사용)다."
      >
        <Button type="button" variant="danger" onClick={() => setDialogOpen(true)}>
          다이얼로그 열기
        </Button>
        {dialogResult && (
          <p className="type-caption mt-2" role="status">
            {dialogResult}
          </p>
        )}
        <ClearDataDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          title="예시: 모든 데이터 삭제"
          description="이 다이얼로그는 미리보기 전용이며 실제로 아무것도 삭제하지 않는다."
          confirmLabel="삭제"
          onConfirm={() => setDialogResult("확인을 눌렀습니다 (미리보기 — 실제 삭제 없음).")}
        />
      </Section>

      <Section id="a11y" title="7. 접근성 체크리스트">
        <ul className="flex flex-col gap-2">
          {A11Y_CHECKLIST.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-text-secondary">
              <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-success" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
