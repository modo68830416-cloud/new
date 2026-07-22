import type { ReactNode } from "react";

export function Section({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 border-t border-border-subtle py-12 first:border-t-0 first:pt-0"
    >
      <h2 className="type-page-title mb-2">{title}</h2>
      {description ? (
        <p className="type-body mb-8 max-w-prose text-text-secondary">
          {description}
        </p>
      ) : (
        <div className="mb-8" />
      )}
      {children}
    </section>
  );
}

export function SubSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="mb-8 last:mb-0">
      <p className="type-metadata mb-3 text-text-muted">{title}</p>
      {children}
    </div>
  );
}
