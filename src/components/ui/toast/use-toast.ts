import { useContext } from "react";
import { ToastContext } from "./toast-provider";

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast()는 <ToastProvider> 내부에서만 사용할 수 있습니다.");
  }
  return context;
}
