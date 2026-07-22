"use client";

import { forwardRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { formatAbsoluteDate, formatRelativeTime } from "@/lib/format-date";
import type { TimeAgoProps } from "./time-ago.types";

/**
 * 상대 시간("3분 전")을 표시하고 주기적으로 갱신한다. 절대 시간은
 * title/dateTime 속성으로 항상 함께 제공해 접근성과 정확성을 보장한다.
 */
export const TimeAgo = forwardRef<HTMLTimeElement, TimeAgoProps>(
  function TimeAgo(
    { date, updateIntervalMs = 30000, className, ...props },
    ref,
  ) {
    const [now, setNow] = useState<Date | null>(null);

    useEffect(() => {
      setNow(new Date());
      if (updateIntervalMs <= 0) return;
      const id = setInterval(() => setNow(new Date()), updateIntervalMs);
      return () => clearInterval(id);
    }, [updateIntervalMs]);

    const dateObj = date instanceof Date ? date : new Date(date);
    const isoString = Number.isNaN(dateObj.getTime())
      ? undefined
      : dateObj.toISOString();

    return (
      <time
        ref={ref}
        dateTime={isoString}
        title={formatAbsoluteDate(date)}
        className={cn("type-metadata", className)}
        {...props}
      >
        {now ? formatRelativeTime(date, now) : formatAbsoluteDate(date)}
      </time>
    );
  },
);
