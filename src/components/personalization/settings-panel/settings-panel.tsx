"use client";

import { useState } from "react";
import { Database, Palette, Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { ThemeToggle } from "@/components/personalization/theme-toggle";
import { ClearDataDialog } from "@/components/personalization/clear-data-dialog";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useReadingHistory } from "@/hooks/useReadingHistory";
import { useFontSizePreference } from "@/hooks/useFontSizePreference";
import { cn } from "@/lib/utils";
import type { FontSizePreference } from "@/types/personalization";

type SectionId = "theme" | "reading" | "data";
type ClearTarget = "bookmarks" | "history" | "all";

const SECTIONS: { id: SectionId; label: string; icon: typeof Palette }[] = [
  { id: "theme", label: "테마", icon: Palette },
  { id: "reading", label: "글자 크기", icon: Type },
  { id: "data", label: "데이터 관리", icon: Database },
];

const FONT_SIZE_OPTIONS: {
  value: FontSizePreference;
  label: string;
  sampleClass: string;
  scale: number;
}[] = [
  { value: "small", label: "작게", sampleClass: "text-sm", scale: 0.9 },
  { value: "default", label: "기본", sampleClass: "text-base", scale: 1 },
  { value: "large", label: "크게", sampleClass: "text-lg", scale: 1.15 },
];

export interface SettingsPanelProps {
  className?: string;
}

/**
 * `/settings` 페이지 본문 (TASK-011).
 *
 * 데스크톱: 왼쪽 사이드 탭 + 오른쪽 콘텐츠(요구사항 "사이드 탭 + 콘텐츠").
 * 모바일: `flex-col`로 세로 스택되며, 탭 목록은 `overflow-x-auto`로 상단
 * 가로 스크롤 영역이 된다(요구사항 "탭을 상단 스크롤 영역으로 전환").
 *
 * 데이터 삭제는 되돌릴 수 없으므로 항상 `ClearDataDialog`(TASK-003 Modal
 * 재사용)로 한 번 더 확인을 받는다.
 */
export function SettingsPanel({ className }: SettingsPanelProps) {
  const [activeSection, setActiveSection] = useState<SectionId>("theme");
  const [clearTarget, setClearTarget] = useState<ClearTarget | null>(null);

  const { count: bookmarkCount, clearAll: clearBookmarks } = useBookmarks();
  const { count: historyCount, clearAll: clearHistory } = useReadingHistory();
  const { fontSize, setFontSize } = useFontSizePreference();
  const { showToast } = useToast();

  const dialogCopy: Record<ClearTarget, { title: string; description: string }> = {
    bookmarks: {
      title: "북마크 전체 삭제",
      description: `저장한 뉴스 ${bookmarkCount}건을 모두 삭제할까요?`,
    },
    history: {
      title: "읽기 기록 전체 삭제",
      description: `읽은 뉴스 ${historyCount}건을 모두 삭제할까요?`,
    },
    all: {
      title: "모든 데이터 삭제",
      description: `북마크 ${bookmarkCount}건과 읽기 기록 ${historyCount}건을 모두 삭제할까요?`,
    },
  };

  function handleConfirmClear() {
    if (clearTarget === "bookmarks" || clearTarget === "all") clearBookmarks();
    if (clearTarget === "history" || clearTarget === "all") clearHistory();
    if (clearTarget) {
      showToast({
        title: `${dialogCopy[clearTarget].title}했습니다`,
        tone: "success",
        durationMs: 3000,
      });
    }
  }

  return (
    <div className={cn("flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10", className)}>
      <div
        role="tablist"
        aria-label="설정 메뉴"
        className="flex gap-1 overflow-x-auto border-b border-border-subtle pb-2 lg:w-52 lg:shrink-0 lg:flex-col lg:border-r lg:border-b-0 lg:pr-4 lg:pb-0"
      >
        {SECTIONS.map((section) => {
          const Icon = section.icon;
          const active = activeSection === section.id;
          return (
            <button
              key={section.id}
              type="button"
              role="tab"
              id={`settings-tab-${section.id}`}
              aria-selected={active}
              aria-controls={`settings-panel-${section.id}`}
              onClick={() => setActiveSection(section.id)}
              className={cn(
                "type-caption inline-flex shrink-0 items-center gap-2 rounded-md px-3 py-2.5 text-left whitespace-nowrap",
                "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
                active
                  ? "bg-accent-primary/15 font-semibold text-accent-primary"
                  : "text-text-secondary hover:bg-surface-elevated hover:text-text-primary",
              )}
            >
              <Icon size={16} aria-hidden />
              {section.label}
            </button>
          );
        })}
      </div>

      <div className="min-w-0 flex-1">
        {activeSection === "theme" && (
          <section
            id="settings-panel-theme"
            role="tabpanel"
            aria-labelledby="settings-tab-theme"
            className="flex flex-col gap-4"
          >
            <div>
              <h2 className="type-card-title">테마</h2>
              <p className="type-caption mt-1">
                다크, 라이트 또는 시스템 설정을 따르도록 선택할 수 있습니다.
              </p>
            </div>
            <ThemeToggle variant="segmented" />
          </section>
        )}

        {activeSection === "reading" && (
          <section
            id="settings-panel-reading"
            role="tabpanel"
            aria-labelledby="settings-tab-reading"
            className="flex flex-col gap-4"
          >
            <div>
              <h2 className="type-card-title">글자 크기</h2>
              <p className="type-caption mt-1">기사 본문을 읽을 때 적용되는 글자 크기입니다.</p>
            </div>
            <div role="group" aria-label="글자 크기 선택" className="flex flex-wrap gap-2">
              {FONT_SIZE_OPTIONS.map((option) => {
                const active = fontSize === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setFontSize(option.value)}
                    className={cn(
                      "touch-target rounded-md border px-4 py-2.5 font-semibold",
                      option.sampleClass,
                      active
                        ? "border-accent-primary bg-accent-primary/15 text-accent-primary"
                        : "border-border-default bg-surface-elevated text-text-secondary hover:border-border-strong hover:text-text-primary",
                    )}
                  >
                    {option.label}
                    {active && <span className="sr-only">(선택됨)</span>}
                  </button>
                );
              })}
            </div>
            <p
              className="type-body reading-width rounded-md border border-border-subtle bg-surface p-4 text-text-secondary"
              style={{
                fontSize: `calc(var(--text-base) * ${
                  FONT_SIZE_OPTIONS.find((option) => option.value === fontSize)?.scale ?? 1
                })`,
              }}
            >
              미리보기: 선택한 글자 크기가 기사 본문에 이렇게 적용됩니다.
            </p>
          </section>
        )}

        {activeSection === "data" && (
          <section
            id="settings-panel-data"
            role="tabpanel"
            aria-labelledby="settings-tab-data"
            className="flex flex-col gap-5"
          >
            <div>
              <h2 className="type-card-title">저장된 데이터 관리</h2>
              <p className="type-caption mt-1">
                이 기기의 브라우저에만 저장되며, 서버로 전송되지 않습니다.
              </p>
            </div>

            <dl className="grid grid-cols-2 gap-3 sm:max-w-sm">
              <div className="rounded-md border border-border-default bg-surface p-4">
                <dt className="type-caption">북마크</dt>
                <dd className="type-data-number mt-1 text-3xl text-text-primary">
                  {bookmarkCount}
                  <span className="type-caption ml-1">건</span>
                </dd>
              </div>
              <div className="rounded-md border border-border-default bg-surface p-4">
                <dt className="type-caption">읽기 기록</dt>
                <dd className="type-data-number mt-1 text-3xl text-text-primary">
                  {historyCount}
                  <span className="type-caption ml-1">건</span>
                </dd>
              </div>
            </dl>

            <div className="flex flex-col gap-2 sm:flex-row">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={bookmarkCount === 0}
                onClick={() => setClearTarget("bookmarks")}
              >
                북마크 전체 삭제
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={historyCount === 0}
                onClick={() => setClearTarget("history")}
              >
                읽기 기록 전체 삭제
              </Button>
              <Button
                type="button"
                variant="danger"
                size="sm"
                disabled={bookmarkCount === 0 && historyCount === 0}
                onClick={() => setClearTarget("all")}
              >
                모든 데이터 삭제
              </Button>
            </div>
          </section>
        )}
      </div>

      <ClearDataDialog
        open={clearTarget !== null}
        onOpenChange={(open) => {
          if (!open) setClearTarget(null);
        }}
        title={clearTarget ? dialogCopy[clearTarget].title : ""}
        description={clearTarget ? dialogCopy[clearTarget].description : undefined}
        confirmLabel="삭제"
        onConfirm={handleConfirmClear}
      />
    </div>
  );
}
