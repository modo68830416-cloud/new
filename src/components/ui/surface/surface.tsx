import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import type {
  SurfaceProps,
  SurfaceLevel,
  SurfaceRadius,
  SurfaceShadow,
} from "./surface.types";

const LEVEL_CLASSES: Record<SurfaceLevel, string> = {
  base: "bg-background",
  raised: "bg-surface",
  elevated: "bg-surface-elevated",
  overlay: "bg-surface-overlay",
};

const RADIUS_CLASSES: Record<SurfaceRadius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
};

const SHADOW_CLASSES: Record<SurfaceShadow, string> = {
  none: "shadow-none",
  xs: "shadow-xs",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
};

/**
 * 배경/테두리/라운드/그림자를 토큰 기반으로 조합하는 저수준 표면 컴포넌트.
 * Card, Modal, Drawer 등 다른 컴포넌트가 내부적으로 사용한다.
 */
export const Surface = forwardRef<HTMLElement, SurfaceProps>(function Surface(
  {
    as: Component = "div",
    level = "raised",
    bordered = true,
    radius = "md",
    shadow = "none",
    glass = false,
    className,
    ...props
  },
  ref,
) {
  return (
    <Component
      ref={ref}
      className={cn(
        !glass && LEVEL_CLASSES[level],
        glass && "glass-default",
        bordered && !glass && "border border-border-default",
        RADIUS_CLASSES[radius],
        SHADOW_CLASSES[shadow],
        className,
      )}
      {...props}
    />
  );
});
