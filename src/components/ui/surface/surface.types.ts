import type { ElementType, HTMLAttributes } from "react";

export type SurfaceLevel = "base" | "raised" | "elevated" | "overlay";
export type SurfaceRadius = "none" | "sm" | "md" | "lg" | "xl";
export type SurfaceShadow = "none" | "xs" | "sm" | "md" | "lg";

export interface SurfaceProps extends HTMLAttributes<HTMLElement> {
  /** 렌더링할 HTML 태그. 기본값은 div */
  as?: ElementType;
  /** 표면 밝기 단계 */
  level?: SurfaceLevel;
  /** 테두리 표시 여부 */
  bordered?: boolean;
  radius?: SurfaceRadius;
  shadow?: SurfaceShadow;
  /** 유리 질감(backdrop blur) 적용 여부. 제한적으로만 사용한다 */
  glass?: boolean;
}
