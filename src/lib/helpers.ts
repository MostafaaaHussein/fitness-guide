import type { Locale } from "./types";

const MUSCLEWIKI_LOCALE_PREFIX = "ar-sa";

export function muscleWikiUrl(slug: string, _locale: Locale = "ar"): string {
  const normalizedSlug = slug.trim().replace(/\s+/g, "-");
  const path = [MUSCLEWIKI_LOCALE_PREFIX, "exercise", encodeURIComponent(normalizedSlug)].join("/");
  return new URL(path, "https://musclewiki.com/").toString();
}

export function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export function weekdayName(): string {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[new Date().getDay()];
}

/** Map JS weekday to plan day index (Saturday = start of week for this plan). */
export function planDayIndex(): number {
  // Saturday=0 ... Friday=6 in nutrition schedule
  const jsDay = new Date().getDay(); // Sun=0
  const map: Record<number, number> = {
    6: 0, // Sat
    0: 1, // Sun
    1: 2, // Mon
    2: 3, // Tue
    3: 4, // Wed
    4: 5, // Thu
    5: 6, // Fri
  };
  return map[jsDay] ?? 0;
}

/** Workout day 1-7 cycling from a fixed epoch Saturday, or based on weekday. */
export function suggestedWorkoutDay(): number {
  // Sat=1 Push ... Fri=7 Rest mapping aligned with Saturday start
  const map: Record<number, number> = {
    6: 1, // Sat -> Push
    0: 2, // Sun -> Pull
    1: 3, // Mon -> Legs
    2: 4, // Tue -> Upper
    3: 5, // Wed -> Shoulders
    4: 6, // Thu -> Lower
    5: 7, // Fri -> Rest
  };
  return map[new Date().getDay()] ?? 1;
}
