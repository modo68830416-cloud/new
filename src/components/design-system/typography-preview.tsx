import { TYPOGRAPHY_SCALE } from "@/constants/design-tokens";

export function TypographyPreview() {
  return (
    <div className="space-y-8">
      {TYPOGRAPHY_SCALE.map((token) => (
        <div
          key={token.id}
          className="rounded-md border border-border-subtle bg-surface p-4 sm:p-6"
        >
          <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
            <span className="type-label text-accent-primary">
              {token.label}
            </span>
            <span className="type-metadata break-url">
              .{token.className}
            </span>
          </div>
          <p className={`${token.className} break-url text-text-primary`}>
            {token.sampleText}
          </p>
          <p className="type-caption mt-3">{token.description}</p>
        </div>
      ))}
    </div>
  );
}
