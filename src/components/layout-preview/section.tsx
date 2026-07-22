import type { ReactNode } from "react";

export function Section({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 border-t border-border-subtle py-12 first:border-t-0 first:pt-0"
    >
      <h2 className="type-page-title mb-2">{title}</h2>
      {description ? (
        <div className="type-body mb-8 max-w-prose text-text-secondary">{description}</div>
      ) : (
        <div className="mb-8" />
      )}
      {children}
    </section>
  );
}
