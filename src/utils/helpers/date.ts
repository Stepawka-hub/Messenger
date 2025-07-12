import { intlFormatDistance, isValid, Locale } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { enUS, ru } from "date-fns/locale";

const LOCALE_MAP: Record<string, Locale> = {
  en: enUS,
  ru: ru,
};

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

  return intlFormatDistance(safeDate, Date.now(), {
    locale: "ru",
    style: "short",
  });
};
