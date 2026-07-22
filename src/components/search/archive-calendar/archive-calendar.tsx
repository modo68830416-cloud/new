"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Select } from "@/components/ui/select";
import { IconButton } from "@/components/ui/icon-button";

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

export interface ArchiveCalendarProps {
  /** 기본으로 보여줄 연/월 기준 날짜 (없으면 오늘 날짜) */
  initialDate?: Date;
  /** 날짜를 선택했을 때 호출된다 (실제 데이터 연동 없이 UI 자리만 제공) */
  onDateSelect?: (date: Date) => void;
  className?: string;
}

function buildCalendarWeeks(year: number, month: number): (Date | null)[][] {
  const firstDay = new Date(year, month, 1);
  const startWeekday = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < startWeekday; i += 1) cells.push(null);
  for (let day = 1; day <= daysInMonth; day += 1) cells.push(new Date(year, month, day));
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks: (Date | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

function isSameDate(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
  );
}

/**
 * 아카이브 달력 (TASK-010, UI 전용).
 *
 * 연도/월 선택 + 달력 그리드 + 날짜 선택 UI만 제공하며 실제 날짜별 기사
 * 데이터 연동은 하지 않는다(`/archive` 페이지에서 선택 결과를 안내 문구로
 * 대신한다).
 */
export function ArchiveCalendar({ initialDate, onDateSelect, className }: ArchiveCalendarProps) {
  const today = useMemo(() => initialDate ?? new Date(), [initialDate]);
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const weeks = useMemo(() => buildCalendarWeeks(year, month), [year, month]);

  const yearOptions = useMemo(() => {
    const currentYear = today.getFullYear();
    return Array.from({ length: 6 }, (_, index) => currentYear - index).map((value) => ({
      value: String(value),
      label: `${value}년`,
    }));
  }, [today]);

  const monthOptions = Array.from({ length: 12 }, (_, index) => ({
    value: String(index),
    label: `${index + 1}월`,
  }));

  function goToPrevMonth() {
    if (month === 0) {
      setMonth(11);
      setYear((prev) => prev - 1);
    } else {
      setMonth((prev) => prev - 1);
    }
  }

  function goToNextMonth() {
    if (month === 11) {
      setMonth(0);
      setYear((prev) => prev + 1);
    } else {
      setMonth((prev) => prev + 1);
    }
  }

  function handleSelect(date: Date) {
    setSelectedDate(date);
    onDateSelect?.(date);
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-md border border-border-default bg-surface p-5",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Select
            aria-label="연도 선택"
            size="sm"
            value={String(year)}
            onChange={(event) => setYear(Number(event.target.value))}
            options={yearOptions}
            containerClassName="w-24"
          />
          <Select
            aria-label="월 선택"
            size="sm"
            value={String(month)}
            onChange={(event) => setMonth(Number(event.target.value))}
            options={monthOptions}
            containerClassName="w-20"
          />
        </div>
        <div className="flex items-center gap-1">
          <IconButton
            label="이전 달"
            icon={<ChevronLeft size={16} aria-hidden />}
            variant="ghost"
            size="sm"
            onClick={goToPrevMonth}
          />
          <IconButton
            label="다음 달"
            icon={<ChevronRight size={16} aria-hidden />}
            variant="ghost"
            size="sm"
            onClick={goToNextMonth}
          />
        </div>
      </div>

      <table className="w-full border-collapse">
        <caption className="sr-only">
          {year}년 {month + 1}월 달력, 날짜를 선택할 수 있습니다.
        </caption>
        <thead>
          <tr>
            {WEEKDAYS.map((day) => (
              <th
                key={day}
                scope="col"
                className="type-caption p-1.5 text-center font-normal text-text-muted"
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, weekIndex) => (
            <tr key={weekIndex}>
              {week.map((date, dayIndex) => {
                if (!date) return <td key={dayIndex} aria-hidden />;

                const isSelected = selectedDate ? isSameDate(date, selectedDate) : false;
                const isToday = isSameDate(date, today);

                return (
                  <td key={dayIndex} className="p-0.5 text-center">
                    <button
                      type="button"
                      onClick={() => handleSelect(date)}
                      aria-pressed={isSelected}
                      aria-label={`${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일${isToday ? " (오늘)" : ""}`}
                      className={cn(
                        "touch-target type-caption inline-flex size-9 items-center justify-center rounded-full transition-colors",
                        "focus-visible:outline-2 focus-visible:outline-offset-2",
                        isSelected
                          ? "bg-accent-primary text-text-inverse"
                          : isToday
                            ? "border border-accent-primary text-accent-primary"
                            : "text-text-primary hover:bg-surface-elevated",
                      )}
                    >
                      {date.getDate()}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {selectedDate && (
        <p className="type-caption text-text-secondary" role="status" aria-live="polite">
          선택한 날짜: {selectedDate.getFullYear()}.{String(selectedDate.getMonth() + 1).padStart(2, "0")}.
          {String(selectedDate.getDate()).padStart(2, "0")} — 실제 아카이브 데이터 연동은 준비
          중입니다.
        </p>
      )}
    </div>
  );
}
