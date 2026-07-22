import { forwardRef } from "react";
import Link from "next/link";
import { getButtonClassNames } from "@/components/ui/button";
import type { LinkButtonProps } from "./link-button.types";

/**
 * 버튼처럼 보이는 링크. 내비게이션(페이지 이동)에는 항상 이 컴포넌트를
 * 사용하고, 폼 제출/액션에는 Button을 사용한다.
 */
export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  function LinkButton(
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      disabled = false,
      leftIcon,
      rightIcon,
      className,
      children,
      href,
      ...props
    },
    ref,
  ) {
    return (
      <Link
        ref={ref}
        href={href}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        className={getButtonClassNames({
          variant,
          size,
          fullWidth,
          disabled,
          className,
        })}
        {...props}
      >
        {leftIcon && (
          <span className="inline-flex shrink-0" aria-hidden>
            {leftIcon}
          </span>
        )}
        {children}
        {rightIcon && (
          <span className="inline-flex shrink-0" aria-hidden>
            {rightIcon}
          </span>
        )}
      </Link>
    );
  },
);
