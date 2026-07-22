import type { InputHTMLAttributes } from "react";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: string;
  helperText?: string;
  /** 부분 선택 상태 표시 (input.indeterminate) */
  indeterminate?: boolean;
}
