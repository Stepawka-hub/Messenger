import { format, isThisYear, isToday, isValid, isYesterday } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { ru } from "date-fns/locale";

const MS_PER_MINUTE = 1000 * 60;
const MS_PER_DAY = MS_PER_MINUTE * 60 * 24;

const ensureDate = (value: string | Date): Date => {
  if (value instanceof Date && isValid(value)) {
    return value;
  }

  if (typeof value === "string") {
    const date = new Date(value);
    if (isValid(date)) {
      return date;
    }
  }

  return new Date();
};

export const formatDateToISOString = (dateString: string): string => {
  const date = new Date(dateString);
  const utcDate = new Date(
    date.getTime() - date.getTimezoneOffset() * MS_PER_MINUTE
  );
  return utcDate.toISOString();
};

export const convertTZ = (
  date: string,
  timeZone: string = "Europe/Moscow"
): Date => toZonedTime(date, timeZone);

export const dateDiffInDays = (a: string | Date, b: string | Date) => {
  const firstDate = ensureDate(a);
  const secondDate = ensureDate(b);

  const utc1 = Date.UTC(
    firstDate.getFullYear(),
    firstDate.getMonth(),
    firstDate.getDate()
  );
  const utc2 = Date.UTC(
    secondDate.getFullYear(),
    secondDate.getMonth(),
    secondDate.getDate()
  );

  return Math.floor((utc2 - utc1) / MS_PER_DAY);
};

export const getRelativeTimeString = (date: string | Date) => {
  const safeDate = ensureDate(date);

  const timeMs = safeDate.getTime();
  const deltaSeconds = Math.round((timeMs - Date.now()) / 1000);

  const cutoffs = [
    60,
    3600,
    86400,
    86400 * 7,
    86400 * 30,
    86400 * 365,
    Infinity,
  ];

  const units: Intl.RelativeTimeFormatUnit[] = [
    "second",
    "minute",
    "hour",
    "day",
    "week",
    "month",
    "year",
  ];

  const unitIndex = cutoffs.findIndex(
    (cutoff) => cutoff > Math.abs(deltaSeconds)
  );
  const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1;
  const rtf = new Intl.RelativeTimeFormat("ru");

  const value = Math.floor(Math.abs(deltaSeconds / divisor));
  const signedValue = deltaSeconds >= 0 ? value : -value;

  return rtf.format(signedValue, units[unitIndex]);
};

export const formatDate = (date: string | Date) => {
  if (isToday(date)) {
    return "Сегодня";
  } else if (isYesterday(date)) {
    return "Вчера";
  } else if (isThisYear(date)) {
    return format(date, "d MMMM", { locale: ru });
  } else {
    return format(date, "d MMMM yyyy", { locale: ru });
  }
};
