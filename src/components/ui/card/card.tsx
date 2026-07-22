import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Surface } from "@/components/ui/surface";
import type { CardProps, CardPadding, CardSectionProps } from "./card.types";

const PADDING_CLASSES: Record<CardPadding, string> = {
  none: "p-0",
  sm: "p-4",
  md: "p-5",
  lg: "p-6",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    padding = "md",
    interactive = false,
    highlighted = false,
    className,
    ...props
  },
  ref,
) {
  return (
    <Surface
      ref={ref}
      level="raised"
      radius="md"
      shadow="sm"
      className={cn(
        PADDING_CLASSES[padding],
        highlighted && "border-accent-primary",
        interactive &&
          "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:border-border-strong hover:bg-surface-elevated",
        className,
      )}
      {...props}
    />
  );
});

export const CardHeader = forwardRef<HTMLDivElement, CardSectionProps>(
  function CardHeader({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn("mb-3 flex flex-col gap-1", className)}
        {...props}
      />
    );
  },
);

export const CardTitle = forwardRef<HTMLDivElement, CardSectionProps>(
  function CardTitle({ className, ...props }, ref) {
    return <div ref={ref} className={cn("type-card-title", className)} {...props} />;
  },
);

export const CardDescription = forwardRef<HTMLDivElement, CardSectionProps>(
  function CardDescription({ className, ...props }, ref) {
    return (
      <div ref={ref} className={cn("type-caption", className)} {...props} />
    );
  },
);

export const CardContent = forwardRef<HTMLDivElement, CardSectionProps>(
  function CardContent({ className, ...props }, ref) {
    return <div ref={ref} className={cn("type-body", className)} {...props} />;
  },
);

export const CardFooter = forwardRef<HTMLDivElement, CardSectionProps>(
  function CardFooter({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          "mt-4 flex items-center gap-2 border-t border-border-subtle pt-4",
          className,
        )}
        {...props}
      />
    );
  },
);
