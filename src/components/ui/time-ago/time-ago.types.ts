import type { TimeHTMLAttributes } from "react";

export interface TimeAgoProps
  extends Omit<TimeHTMLAttributes<HTMLTimeElement>, "dateTime"> {
  /** ISO 문자열, epoch ms, 또는 Date */
  date: string | number | Date;
  /** 자동 갱신 주기(ms). 0이면 갱신하지 않는다. 기본값 30000ms */
  updateIntervalMs?: number;
}
