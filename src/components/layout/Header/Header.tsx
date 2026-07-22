"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Menu, Moon, Search, X } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";
import { LiveBadge } from "@/components/ui/live-badge";
import { SearchInput } from "@/components/ui/search-input";
import { Navigation } from "@/components/layout/Navigation";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { siteConfig } from "@/config/site";
import { transitionStandard } from "@/animations/transitions";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

export interface HeaderProps {
  className?: string;
}

/** 이 값(px) 이상 스크롤되면 헤더가 축소되고 blur 배경이 강해진다 */
const SHRINK_THRESHOLD = 12;
/** 이 값(px)을 지나 아래로 스크롤할 때만 헤더를 숨긴다 (최상단 부근 튐 방지) */
const HIDE_THRESHOLD = 96;

/**
 * 전역 Global Header.
 *
 * - Sticky + 스크롤 시 높이 축소 + Blur 배경 (Shadow 토큰 사용)
 * - 아래로 스크롤하면 숨고, 위로 스크롤하면 다시 나타난다 (Header Hide/Show)
 * - 로고 / 데스크톱 카테고리 메뉴 / 검색 버튼(UI만) / 다크모드 자리(기능 없음) /
 *   모바일 메뉴 버튼 / Live 표시
 * - `prefers-reduced-motion`에서는 숨김 애니메이션을 하지 않는다.
 */
export function Header({ className }: HeaderProps) {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const lastScrollY = useRef(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    let ticking = false;

    function update() {
      const currentY = window.scrollY;
      setScrolled(currentY > SHRINK_THRESHOLD);

      if (prefersReducedMotion || mobileNavOpen || searchOpen) {
        setHidden(false);
      } else {
        const goingDown = currentY > lastScrollY.current;
        setHidden(goingDown && currentY > HIDE_THRESHOLD);
      }

      lastScrollY.current = currentY;
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
  }, [prefersReducedMotion, mobileNavOpen, searchOpen]);

  return (
    <>
      <motion.header
        className={cn(
          "sticky top-0 z-header w-full border-b border-border-subtle",
          "transition-[background-color,box-shadow] duration-[var(--duration-normal)] ease-[var(--ease-standard)]",
          scrolled ? "glass-strong shadow-md" : "bg-background/85 shadow-none",
          className,
        )}
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={prefersReducedMotion ? { duration: 0 } : transitionStandard}
      >
        <div
          className={cn(
            "container-news flex items-center justify-between gap-2",
            "transition-[height] duration-[var(--duration-normal)] ease-[var(--ease-standard)]",
            scrolled ? "h-14" : "h-16 sm:h-20",
          )}
        >
          <div className="flex min-w-0 items-center gap-1 lg:gap-6">
            <IconButton
              label={mobileNavOpen ? "메뉴 닫기" : "전체 메뉴 열기"}
              icon={mobileNavOpen ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
              variant="ghost"
              className="lg:hidden"
              aria-expanded={mobileNavOpen}
              aria-haspopup="dialog"
              onClick={() => setMobileNavOpen((prev) => !prev)}
            />

            <Link
              href="/"
              className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <span className="bg-gradient-brand bg-clip-text text-lg font-extrabold tracking-tight text-transparent sm:text-xl">
                {siteConfig.siteShortName}
              </span>
              <span className="type-caption hidden font-normal text-text-secondary sm:inline">
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
                  onClick={() => setSearchOpen(true)}
                />
              )}
            </div>

            <IconButton
              label="다크모드 전환 (준비 중)"
              title="다크모드 전환 (준비 중)"
              icon={<Moon size={18} aria-hidden />}
              variant="ghost"
              className="hidden opacity-70 sm:inline-flex"
              aria-disabled="true"
            />
          </div>
        </div>
      </motion.header>

      <MobileNavigation open={mobileNavOpen} onOpenChange={setMobileNavOpen} />
    </>
  );
}
