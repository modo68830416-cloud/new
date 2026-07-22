"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, type PanInfo } from "motion/react";
import { PRIMARY_NAVIGATION } from "@/constants/navigation";
import { Drawer } from "@/components/ui/drawer";
import { LiveDot } from "@/components/motion/LiveDot";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export interface MobileNavigationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/** 오른쪽으로 이만큼(px) 이상 드래그하면 드로어를 닫는다 (swipe-to-close) */
const SWIPE_DISMISS_DISTANCE = 80;
const SWIPE_DISMISS_VELOCITY = 500;

/**
 * 모바일 전체 메뉴 (Drawer 기반).
 *
 * TASK-003의 `Drawer`(Radix Dialog 기반)를 그대로 재사용해 Focus Trap /
 * ESC 종료 / Overlay를 얻고, 오른쪽으로 스와이프하면 닫히는 제스처만
 * 추가로 얹는다.
 */
export function MobileNavigation({ open, onOpenChange }: MobileNavigationProps) {
  const pathname = usePathname() ?? "";

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  function handleDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x > SWIPE_DISMISS_DISTANCE || info.velocity.x > SWIPE_DISMISS_VELOCITY) {
      onOpenChange(false);
    }
  }

  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
      side="right"
      title="전체 메뉴"
      description={`${siteConfig.siteName} 카테고리`}
    >
      <motion.div
        drag="x"
        dragDirectionLock
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={{ left: 0, right: 0.55 }}
        onDragEnd={handleDragEnd}
        className="flex h-full flex-col"
      >
        <nav aria-label="전체 카테고리">
          <ul className="flex flex-col gap-1">
            {PRIMARY_NAVIGATION.map((item) => {
              const active = isActive(item.href);

              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => onOpenChange(false)}
                    className={cn(
                      "touch-target type-card-title flex items-center rounded-md px-3 text-text-secondary",
                      "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
                      "hover:bg-surface-elevated hover:text-text-primary focus-visible:bg-surface-elevated",
                      active && "bg-surface-elevated text-accent-primary",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="mt-auto flex items-center gap-2 border-t border-border-subtle pt-4 text-text-muted">
          <LiveDot />
          <span className="type-caption">실시간 속보 업데이트 중</span>
        </div>
      </motion.div>
    </Drawer>
  );
}
