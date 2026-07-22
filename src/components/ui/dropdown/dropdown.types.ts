import type { ReactNode } from "react";

export interface DropdownItemData {
  value: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
  danger?: boolean;
}

export interface DropdownProps {
  trigger: ReactNode;
  items: DropdownItemData[];
  onSelect?: (value: string) => void;
  align?: "start" | "center" | "end";
  label?: string;
}
