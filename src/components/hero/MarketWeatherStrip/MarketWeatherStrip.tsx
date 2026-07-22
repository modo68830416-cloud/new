import type { LucideIcon } from "lucide-react";
import {
  CloudSun,
  DollarSign,
  LineChart,
  TrendingDown,
  TrendingUp,
  Wind,
} from "lucide-react";
import { Surface } from "@/components/ui/surface";
import { cn } from "@/lib/utils";
import type { MarketWeatherStripProps } from "./MarketWeatherStrip.types";

type ChangeDirection = "up" | "down" | "neutral";

interface MarketWeatherItem {
  id: string;
  icon: LucideIcon;
  label: string;
  value: string;
  changeLabel?: string;
  direction: ChangeDirection;
}

const DIRECTION_ICON: Record<ChangeDirection, LucideIcon | null> = {
  up: TrendingUp,
  down: TrendingDown,
  neutral: null,
};

const DIRECTION_COLOR: Record<ChangeDirection, string> = {
  up: "text-success",
  down: "text-breaking",
  neutral: "text-text-muted",
};

/**
 * TASK-006 명세의 "Market/Weather 자리(목업)" — 코스피/코스닥/환율/날씨를
 * 보여주는 목업 데이터 스트립. 실제 시세·기상 API를 연동하지 않으며,
 * 값은 고정된 mock 데이터다.
 */
const MOCK_ITEMS: MarketWeatherItem[] = [
  {
    id: "kospi",
    icon: LineChart,
    label: "코스피",
    value: "2,682.14",
    changeLabel: "+0.42%",
    direction: "up",
  },
  {
    id: "kosdaq",
    icon: LineChart,
    label: "코스닥",
    value: "872.55",
    changeLabel: "-0.18%",
    direction: "down",
  },
  {
    id: "usd-krw",
    icon: DollarSign,
    label: "원/달러",
    value: "1,352.10",
    changeLabel: "+2.30",
    direction: "up",
  },
  {
    id: "weather",
    icon: CloudSun,
    label: "서울 날씨",
    value: "27°C 맑음",
    direction: "neutral",
  },
  {
    id: "air-quality",
    icon: Wind,
    label: "미세먼지",
    value: "좋음",
    direction: "neutral",
  },
];

export function MarketWeatherStrip({ className }: MarketWeatherStripProps) {
  return (
    <Surface
      radius="md"
      shadow="none"
      bordered
      className={cn(
        "flex flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3 sm:px-6",
        className,
      )}
      aria-label="시황 및 날씨 (목업 데이터)"
    >
      {MOCK_ITEMS.map((item) => {
        const Icon = item.icon;
        const DirectionIcon = DIRECTION_ICON[item.direction];
        return (
          <div key={item.id} className="flex items-center gap-2">
            <Icon size={16} className="text-text-muted" aria-hidden />
            <span className="type-metadata">{item.label}</span>
            <span className="type-data-number text-sm text-text-primary">{item.value}</span>
            {item.changeLabel && (
              <span
                className={cn(
                  "type-data-number inline-flex items-center gap-0.5 text-xs",
                  DIRECTION_COLOR[item.direction],
                )}
              >
                {DirectionIcon && <DirectionIcon size={12} aria-hidden />}
                {item.changeLabel}
              </span>
            )}
          </div>
        );
      })}
      <span className="type-metadata ml-auto text-text-muted">목업 데이터 · 실시간 연동 예정</span>
    </Surface>
  );
}
