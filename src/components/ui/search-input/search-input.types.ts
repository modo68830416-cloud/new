import type { InputHTMLAttributes } from "react";

export interface SearchInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  size?: "sm" | "md" | "lg";
  /** Enter 키 또는 검색 아이콘 클릭 시 호출 */
  onSearch?: (value: string) => void;
  /** X 버튼으로 지웠을 때 호출 */
  onClear?: () => void;
  containerClassName?: string;
}
