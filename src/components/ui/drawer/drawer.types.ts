import type { ReactNode } from "react";

export type DrawerSide = "left" | "right" | "bottom";

export interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  side?: DrawerSide;
  children?: ReactNode;
  footer?: ReactNode;
  trigger?: ReactNode;
}
