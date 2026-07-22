import type { AnchorHTMLAttributes, ReactNode } from "react";
import type { LinkProps } from "next/link";
import type { ButtonSize, ButtonVariant } from "@/components/ui/button";

export interface LinkButtonProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
    Pick<LinkProps, "href" | "prefetch" | "replace" | "scroll"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}
