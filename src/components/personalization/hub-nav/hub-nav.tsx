"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bookmark, History, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface HubNavItem {
  href: string;
  label: string;
  icon: typeof Bookmark;
}

const HUB_NAV_ITEMS: HubNavItem[] = [
  { href: "/bookmarks", label: "북마크", icon: Bookmark },
  { href: "/history", label: "읽기 기록", icon: History },
  { href: "/settings", label: "설정", icon: Settings },
];

export interface HubNavProps {
  className?: string;
}

/**
 * `/bookmarks`, `/history`, `/settings` 사이를 이동하는 공용 서브
 * 내비게이션 (TASK-011 "개인화 허브" 절).
 *
 * 좁은 화면에서는 가로 스크롤 가능한 탭 줄로, 넓은 화면에서는 일반
 * 가로 배치로 보인다. 현재 페이지는 `aria-current="page"`와 밑줄로
 * (색상에만 의존하지 않고) 함께 표시한다.
 */
export function HubNav({ className }: HubNavProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="내 정보" className={cn("border-b border-border-subtle", className)}>
      <ul className="flex gap-1 overflow-x-auto">
        {HUB_NAV_ITEMS.map((item) => {
          const active = pathname === item.href || pathname?.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <li key={item.href} className="shrink-0">
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "type-caption relative inline-flex items-center gap-2 px-4 py-3 whitespace-nowrap text-text-secondary",
                  "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
                  "hover:text-text-primary focus-visible:text-text-primary",
                  active && "font-semibold text-text-primary",
                )}
              >
                <Icon size={16} aria-hidden />
                {item.label}
                {active && (
                  <span
                    aria-hidden
                    className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-accent-primary"
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
