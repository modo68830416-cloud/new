import { SPACING_SCALE } from "@/constants/design-tokens";

export function SpacingPreview() {
  return (
    <div className="space-y-2">
      {SPACING_SCALE.map((token) => (
        <div key={token.id} className="flex items-center gap-4">
          <span className="type-metadata w-20 shrink-0 text-right">
            {token.label}
          </span>
          <div className="h-4 flex-1 rounded-sm bg-surface">
            <div
              className="h-4 rounded-sm bg-accent-primary"
              style={{ width: `var(${token.cssVar})`, maxWidth: "100%" }}
              aria-hidden
            />
          </div>
          <span className="type-metadata w-16 shrink-0 break-url">
            {token.cssVar}
          </span>
        </div>
      ))}
    </div>
  );
}
