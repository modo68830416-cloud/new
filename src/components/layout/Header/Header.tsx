"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";
import { LiveBadge } from "@/components/ui/live-badge";
import { SearchInput } from "@/components/ui/search-input";
import { Navigation } from "@/components/layout/Navigation";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { ThemeToggle } from "@/components/personalization";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export interface HeaderProps {
  className?: string;
}

/** 이 값(px) 이상 스크롤되면 헤더가 축소되고 blur 배경이 강해진다 */
const SHRINK_THRESHOLD = 12;

/**
 * 전역 Global Header.
 *
 * - Sticky + 스크롤 시 높이 축소 + Blur 배경 (Shadow 토큰 사용)
 * - 스크롤 방향과 무관하게 항상 화면 상단에 고정된다
 * - 로고 / 데스크톱 카테고리 메뉴 / 검색 버튼(UI만) / 다크모드·라이트모드
 *   토글(TASK-011, `ThemeToggle`) / 모바일 메뉴 버튼 / Live 표시
 */
export function Header({ className }: HeaderProps) {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    let ticking = false;

    function update() {
      setScrolled(window.scrollY > SHRINK_THRESHOLD);
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-header w-full overflow-hidden border-b border-border-subtle",
          "transition-[background-color,box-shadow] duration-[var(--duration-normal)] ease-[var(--ease-standard)]",
          scrolled ? "glass-strong shadow-md" : "bg-background/85 shadow-none",
          className,
        )}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,#0284c7_0%,#2563eb_55%,#4338ca_100%)] opacity-[0.7] dark:opacity-[0.85]"
        />

        <div
          className={cn(
            "container-news relative flex items-center justify-between gap-2",
            "transition-[height] duration-[var(--duration-normal)] ease-[var(--ease-standard)]",
            scrolled ? "h-14" : "h-16 sm:h-20",
          )}
        >
          <div className="flex min-w-0 items-center gap-1 lg:gap-6">
            <IconButton
              label={mobileNavOpen ? "메뉴 닫기" : "전체 메뉴 열기"}
              icon={mobileNavOpen ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
              variant="ghost"
              className="text-white hover:bg-white/15 focus-visible:outline-white lg:hidden"
              aria-expanded={mobileNavOpen}
              aria-haspopup="dialog"
              onClick={() => setMobileNavOpen((prev) => !prev)}
            />

            <Link
              href="/"
              className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span className="text-lg font-extrabold tracking-tight text-white sm:text-xl">
                {siteConfig.siteShortName}
              </span>
              <span className="type-caption hidden font-normal text-white/75 sm:inline">
                {siteConfig.siteName}
              </span>
            </Link>

            <Navigation className="ml-2" />
          </div>

          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <LiveBadge className="hidden md:inline-flex" />

            <div role="search" className="contents">
              {searchOpen ? (
                <SearchInput
                  autoFocus
                  size="sm"
                  containerClassName="w-36 xs:w-48 sm:w-56"
                  placeholder="검색어를 입력하세요"
                  aria-label="뉴스 검색"
                  onBlur={() => setSearchOpen(false)}
                  onKeyDown={(event) => {
                    // SearchInput 내부 handleKeyDown(Enter→onSearch)보다 이 prop이
                    // 우선 적용되므로(props 전개가 마지막), Enter/Escape를 여기서
                    // 함께 처리한다.
                    if (event.key === "Escape") {
                      setSearchOpen(false);
                      return;
                    }
                    if (event.key === "Enter") {
                      const trimmed = event.currentTarget.value.trim();
                      if (!trimmed) return;
                      setSearchOpen(false);
                      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
                    }
                  }}
                />
              ) : (
                <IconButton
                  label="검색 열기"
                  icon={<Search size={18} aria-hidden />}
                  variant="ghost"
                  className="text-white hover:bg-white/15 focus-visible:outline-white"
                  onClick={() => setSearchOpen(true)}
                />
              )}
            </div>

            <ThemeToggle
              variant="icon"
              className="hidden text-white hover:bg-white/15 focus-visible:outline-white sm:inline-flex"
            />
          </div>
        </div>
      </header>

      <MobileNavigation open={mobileNavOpen} onOpenChange={setMobileNavOpen} />
    </>
  );
}
