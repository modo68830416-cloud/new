import {
  AlertTriangle,
  Radio,
  Siren,
  type LucideIcon,
} from "lucide-react";
import {
  CHART_COLOR_TOKENS,
  CORE_COLOR_TOKENS,
  type ColorSwatchToken,
} from "@/constants/design-tokens";
import { designSystemConfig } from "@/config/design-system";

const GROUP_LABELS: Record<ColorSwatchToken["group"], string> = {
  background: "Background",
  surface: "Surface",
  text: "Text",
  border: "Border",
  accent: "Accent",
  status: "속보 · 상태 색상",
  chart: "Chart",
};

const BREAKING_ICONS: Record<string, LucideIcon> = {
  Radio,
  AlertTriangle,
  Siren,
};

function groupTokens(
  tokens: ColorSwatchToken[],
): Partial<Record<ColorSwatchToken["group"], ColorSwatchToken[]>> {
  return tokens.reduce<
    Partial<Record<ColorSwatchToken["group"], ColorSwatchToken[]>>
  >((acc, token) => {
    const bucket = acc[token.group] ?? [];
    bucket.push(token);
    acc[token.group] = bucket;
    return acc;
  }, {});
}

function ColorSwatch({ token }: { token: ColorSwatchToken }) {
  if (token.group === "text") {
    return (
      <div className="rounded-md border border-border-subtle bg-surface p-4">
        <p
          className="type-card-title mb-1"
          style={{ color: `var(${token.cssVar})` }}
        >
          {token.label}
        </p>
        <p className="type-metadata break-url">{token.cssVar}</p>
      </div>
    );
  }

  if (token.group === "border") {
    return (
      <div
        className="rounded-md bg-surface p-4"
        style={{ border: `2px solid var(${token.cssVar})` }}
      >
        <p className="type-card-title mb-1">{token.label}</p>
        <p className="type-metadata break-url">{token.cssVar}</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-md border border-border-subtle bg-surface">
      <div
        className="h-16 w-full"
        style={{ backgroundColor: `var(${token.cssVar})` }}
        aria-hidden
      />
      <div className="p-3">
        <p className="type-card-title mb-1">{token.label}</p>
        <p className="type-metadata break-url">{token.cssVar}</p>
      </div>
    </div>
  );
}

export function ColorPreview() {
  const grouped = groupTokens(CORE_COLOR_TOKENS);
  const groupOrder: ColorSwatchToken["group"][] = [
    "background",
    "surface",
    "text",
    "border",
    "accent",
    "status",
  ];

  return (
    <div className="space-y-10">
      {groupOrder.map((group) => {
        const tokens = grouped[group];
        if (!tokens || tokens.length === 0) return null;
        return (
          <div key={group}>
            <h3 className="type-section-title mb-4 text-xl">
              {GROUP_LABELS[group]}
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {tokens.map((token) => (
                <ColorSwatch key={token.id} token={token} />
              ))}
            </div>
          </div>
        );
      })}

      <div>
        <h3 className="type-section-title mb-4 text-xl">Chart colors</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {CHART_COLOR_TOKENS.map((token) => (
            <ColorSwatch key={token.id} token={token} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="type-section-title mb-4 text-xl">
          속보 단계 (BreakingNewsLevel)
        </h3>
        <p className="type-caption mb-4 max-w-prose">
          색상만으로 단계를 구분하지 않는다. 라벨 텍스트와 아이콘을 함께
          제공하며, critical 단계에만 제한적인 pulse를 적용한다.
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {designSystemConfig.breakingLevelStyles.map((style) => {
            const Icon = BREAKING_ICONS[style.icon];
            return (
              <div
                key={style.level}
                className={`rounded-md p-4 ${style.pulse ? "pulse-critical" : ""}`}
                style={{
                  backgroundColor: `var(${style.colorVar})`,
                  border: `1px solid var(${style.borderVar})`,
                  color: `var(${style.textVar})`,
                }}
              >
                <div className="mb-2 flex items-center gap-2">
                  <Icon size={18} aria-hidden />
                  <span className="type-label">{style.label}</span>
                  <span className="type-metadata opacity-80">
                    ({style.level})
                  </span>
                </div>
                <p className="type-caption" style={{ color: "inherit" }}>
                  {style.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="type-section-title mb-4 text-xl">카테고리 색상</h3>
        <div className="flex flex-wrap gap-2">
          {designSystemConfig.categoryColors.map((category) => (
            <span
              key={category.slug}
              className="inline-flex touch-target items-center gap-2 rounded-full border border-border-default bg-surface px-4 py-2"
            >
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: `var(${category.cssVar})` }}
                aria-hidden
              />
              <span className="type-caption">{category.label}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
