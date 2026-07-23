"use client";

import { useRef } from "react";
import type { KeyboardEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { PRIMARY_NAVIGATION } from "@/constants/navigation";
import { transitionStandard } from "@/animations/transitions";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

export interface NavigationProps {
  className?: string;
  /** 미리보기 등에서 활성 링크를 강제로 지정할 때 사용 (기본값: 현재 pathname) */
  activeHref?: string;
  /** true면 `lg:` 미만에서도 항상 노출한다 (`/layout-preview` 데스크톱 목업 전용) */
  forceVisible?: boolean;
}

/**
 * 데스크톱 전용 1차 카테고리 내비게이션 (Header 내부에서 사용).
 * Hover/Active(aria-current) 상태를 제공하며, 좌우 화살표/Home/End 키로
 * 항목 사이를 이동할 수 있는 roving keyboard navigation을 지원한다.
 */
export function Navigation({ className, activeHref, forceVisible = false }: NavigationProps) {
  const pathname = usePathname();
  const currentPath = activeHref ?? pathname ?? "";
  const prefersReducedMotion = useReducedMotion();
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  function isActive(href: string) {
    return currentPath === href || currentPath.startsWith(`${href}/`);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLAnchorElement>, index: number) {
    const items = itemRefs.current;
    const count = PRIMARY_NAVIGATION.length;
    let nextIndex: number | null = null;

    switch (event.key) {
      case "ArrowRight":
        nextIndex = (index + 1) % count;
        break;
      case "ArrowLeft":
        nextIndex = (index - 1 + count) % count;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = count - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    items[nextIndex]?.focus();
  }

  return (
    <nav
      aria-label="주요 카테고리"
      className={cn(forceVisible ? "block" : "hidden lg:block", className)}
    >
      <ul className="flex items-center">
        {PRIMARY_NAVIGATION.map((item, index) => {
          const active = isActive(item.href);

          return (
            <li key={item.id} className="relative">
              <Link
                ref={(node) => {
                  itemRefs.current[index] = node;
                }}
                href={item.href}
                aria-current={active ? "page" : undefined}
                onKeyDown={(event) => handleKeyDown(event, index)}
                className={cn(
                  "type-caption relative inline-flex items-center px-3 py-2 text-white/75",
                  "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
                  "hover:text-white focus-visible:text-white",
                  active && "font-semibold text-white",
                )}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId={prefersReducedMotion ? undefined : "desktop-nav-underline"}
                    aria-hidden
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-white"
                    transition={prefersReducedMotion ? { duration: 0 } : transitionStandard}
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
