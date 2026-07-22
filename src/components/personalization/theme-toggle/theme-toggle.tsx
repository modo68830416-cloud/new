"use client";

import { Moon, Sun, SunMoon } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import type { ThemeMode } from "@/types/personalization";

const MODE_OPTIONS: { mode: ThemeMode; label: string; icon: typeof Sun }[] = [
  { mode: "light", label: "라이트", icon: Sun },
  { mode: "dark", label: "다크", icon: Moon },
  { mode: "system", label: "시스템 기본값", icon: SunMoon },
];

export interface ThemeToggleProps {
  /**
   * "icon": Header 등 좁은 공간에서 쓰는 다크/라이트 2단 아이콘 토글.
   * "segmented": 설정 페이지에서 쓰는 다크/라이트/시스템 3단 선택 그룹
   * (라벨 텍스트를 항상 함께 보여준다).
   */
  variant?: "icon" | "segmented";
  className?: string;
}

/**
 * 다크모드 · 라이트모드 전환 UI (TASK-011).
 *
 * 접근성: 키보드로 조작 가능한 일반 `<button>`이며, 현재 상태를 아이콘
 * 색상에만 의존하지 않고 `aria-label`/`title`(icon 변형) 또는 눈에 보이는
 * 텍스트 라벨 + `aria-pressed`(segmented 변형)로도 확인할 수 있다.
 */
export function ThemeToggle({ variant = "icon", className }: ThemeToggleProps) {
  const { mode, resolvedTheme, setMode, toggleResolvedTheme } = useTheme();

  if (variant === "icon") {
    const nextLabel = resolvedTheme === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환";
    const currentLabel = resolvedTheme === "dark" ? "다크 모드" : "라이트 모드";

    return (
      <IconButton
        type="button"
        label={`${nextLabel} (현재: ${currentLabel})`}
        title={`${nextLabel} (현재: ${currentLabel})`}
        icon={resolvedTheme === "dark" ? <Moon size={18} aria-hidden /> : <Sun size={18} aria-hidden />}
        variant="ghost"
        onClick={toggleResolvedTheme}
        className={className}
      />
    );
  }

  return (
    <div
      role="group"
      aria-label="테마 선택"
      className={cn("flex flex-wrap gap-2", className)}
    >
      {MODE_OPTIONS.map((option) => {
        const active = mode === option.mode;
        const Icon = option.icon;
        return (
          <button
            key={option.mode}
            type="button"
            aria-pressed={active}
            onClick={() => setMode(option.mode)}
            className={cn(
              "touch-target inline-flex items-center gap-2 rounded-md border px-4 py-2.5 text-sm font-semibold",
              "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
              active
                ? "border-accent-primary bg-accent-primary/15 text-accent-primary"
                : "border-border-default bg-surface-elevated text-text-secondary hover:border-border-strong hover:text-text-primary",
            )}
          >
            <Icon size={16} aria-hidden />
            {option.label}
            {active && <span className="sr-only">(선택됨)</span>}
          </button>
        );
      })}
    </div>
  );
}
