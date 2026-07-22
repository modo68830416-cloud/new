"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { transitionHover } from "@/animations/transitions";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SubSection } from "@/components/ui-preview/section";
import { cn } from "@/lib/utils";

const NAV_ITEMS = ["속보", "정치", "경제", "사회"];

export function HoverPreview() {
  const prefersReducedMotion = useReducedMotion();
  // reduced-motion 환경에서는 이동/확대량을 0에 가깝게 줄인다 (완전히 없애지는
  // 않되 체감상 "축소"되도록).
  const lift = prefersReducedMotion ? -1 : -4;
  const scaleUp = prefersReducedMotion ? 1.005 : 1.03;

  return (
    <SubSection title="Hover — Button / Card / Badge / Link / Navigation">
      <p className="type-caption mb-4">
        transform(scale/translateY)만 사용하는 GPU 친화적 hover. 마우스를
        올려서 확인하세요. reduced-motion 환경에서는 이동/확대 폭이 줄어듭니다.
      </p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="type-metadata mb-2 text-text-muted">Button</p>
          <motion.div
            className="inline-block"
            whileHover={{ scale: scaleUp }}
            whileTap={{ scale: 0.97 }}
            transition={transitionHover}
          >
            <Button>속보 보기</Button>
          </motion.div>
        </div>

        <div>
          <p className="type-metadata mb-2 text-text-muted">Card</p>
          <motion.div whileHover={{ y: lift }} transition={transitionHover}>
            <Card interactive padding="sm">
              <CardTitle className="text-sm">뉴스 카드</CardTitle>
              <CardContent className="type-caption">
                카드를 올리면 살짝 떠오릅니다.
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div>
          <p className="type-metadata mb-2 text-text-muted">Badge</p>
          <motion.div
            className="inline-block"
            whileHover={{ scale: scaleUp }}
            transition={transitionHover}
          >
            <Badge tone="accent" variant="soft">
              단독
            </Badge>
          </motion.div>
        </div>

        <div>
          <p className="type-metadata mb-2 text-text-muted">Link</p>
          <motion.div className="inline-block" whileHover="hover" initial="rest">
            <Link
              href="#"
              onClick={(e) => e.preventDefault()}
              className="type-body relative inline-block text-accent-primary"
            >
              전체 뉴스 더 보기
              <motion.span
                aria-hidden
                className="absolute inset-x-0 -bottom-0.5 h-px origin-left bg-accent-primary"
                variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
                transition={transitionHover}
              />
            </Link>
          </motion.div>
        </div>

        <div className="sm:col-span-2 lg:col-span-1">
          <p className="type-metadata mb-2 text-text-muted">Navigation</p>
          <nav className="flex flex-wrap gap-1 rounded-md border border-border-subtle bg-surface p-1.5">
            {NAV_ITEMS.map((item) => (
              <motion.button
                key={item}
                type="button"
                whileHover={{ y: lift }}
                transition={transitionHover}
                className={cn(
                  "type-label rounded-sm px-3 py-2 text-text-secondary hover:bg-surface-elevated hover:text-text-primary",
                )}
              >
                {item}
              </motion.button>
            ))}
          </nav>
        </div>
      </div>
    </SubSection>
  );
}
