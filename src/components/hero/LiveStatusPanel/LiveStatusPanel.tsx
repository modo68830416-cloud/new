"use client";

import { useEffect, useState } from "react";
import { Clock3, Newspaper, Radio } from "lucide-react";
import { Card } from "@/components/ui/card";
import { TimeAgo } from "@/components/ui/time-ago";
import { LiveDot } from "@/components/motion/LiveDot";
import { MOCK_NEWS } from "@/data/mock-news";
import { MOCK_BREAKING_NEWS } from "@/data/mock-breaking-news";
import { cn } from "@/lib/utils";
import type { LiveStatusPanelProps } from "./LiveStatusPanel.types";

const clockFormatter = new Intl.DateTimeFormat("ko-KR", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

/**
 * 실시간 현황 패널(Live Status).
 *
 * 현재 시각(1초마다 갱신되는 실시간 시계) · 최근 업데이트 · 오늘 기사 수 ·
 * Breaking 개수 · Live Indicator를 표시한다. 모두 TASK-001 mock 데이터
 * 기반이며 실제 API는 사용하지 않는다.
 *
 * 서버/클라이언트 렌더링 시각 차이로 인한 hydration mismatch를 피하기
 * 위해 마운트 전(첫 tick 전)에는 자리표시자("--:--:--")를 보여주고, 이후
 * 1초 간격 interval 콜백에서만 상태를 갱신한다 (effect 본문에서 직접
 * setState를 호출하지 않는다).
 *
 * 이 컴포넌트가 미리보기 페이지 등에서 같은 페이지에 여러 번 렌더링될 수
 * 있으므로 heading에는 고정 id를 부여하지 않는다 (중복 id 방지). 랜드마크
 * 역할은 상위(`HeroSection`)의 `<section aria-label>`이 담당한다.
 */
export function LiveStatusPanel({ className }: LiveStatusPanelProps) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const todayArticleCount = MOCK_NEWS.length;
  const breakingCount = MOCK_BREAKING_NEWS.filter((item) => item.isActive).length;
  const lastUpdatedAt = MOCK_BREAKING_NEWS[0]?.timestamp ?? MOCK_NEWS[0]?.publishedAt;

  const stats: { icon: typeof Newspaper; label: string; value: string }[] = [
    { icon: Newspaper, label: "오늘 등록된 기사", value: `${todayArticleCount}건` },
    { icon: Radio, label: "진행 중인 속보", value: `${breakingCount}건` },
  ];

  return (
    <div className={cn("flex flex-col", className)}>
      <Card className="flex h-full flex-col gap-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="type-card-title flex items-center gap-2 text-text-primary">
            <Clock3 size={18} className="text-accent-primary" aria-hidden />
            실시간 현황
          </h2>
          <span className="inline-flex items-center gap-1.5">
            <LiveDot />
            <span className="type-label text-live">LIVE</span>
          </span>
        </div>

        <div>
          <p className="type-metadata">현재 시각</p>
          <p
            className="type-data-number mt-1 text-3xl text-text-primary"
            aria-live="off"
          >
            {now ? clockFormatter.format(now) : "--:--:--"}
          </p>
        </div>

        <dl className="grid grid-cols-2 gap-3">
          {stats.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="rounded-md border border-border-subtle bg-surface-elevated p-3"
            >
              <dt className="type-metadata flex items-center gap-1.5">
                <Icon size={14} aria-hidden />
                {label}
              </dt>
              <dd className="type-data-number mt-1 text-xl text-text-primary">{value}</dd>
            </div>
          ))}
        </dl>

        <p className="type-caption">
          최근 업데이트{" "}
          {lastUpdatedAt ? <TimeAgo date={lastUpdatedAt} /> : "정보 없음"}
        </p>
      </Card>
    </div>
  );
}
