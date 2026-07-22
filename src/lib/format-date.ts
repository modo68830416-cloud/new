function toValidDate(input: string | number | Date): Date | null {
  const date = input instanceof Date ? input : new Date(input);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function formatAbsoluteDate(input: string | number | Date): string {
  const date = toValidDate(input);
  if (!date) return "날짜 정보 없음";

  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
}

export function formatRelativeTime(
  input: string | number | Date,
  now: Date = new Date(),
): string {
  const date = toValidDate(input);
  if (!date) return "날짜 정보 없음";

  const diffMs = now.getTime() - date.getTime();
  if (diffMs < 0) return formatAbsoluteDate(date);

  const diffSeconds = Math.floor(diffMs / 1000);
  if (diffSeconds < 60) return "방금 전";

  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) return `${diffMinutes}분 전`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}시간 전`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "어제";

  return formatAbsoluteDate(date);
}
