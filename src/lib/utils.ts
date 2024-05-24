import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function timeElapsed(targetTimestamp: string) {
  const MONTH_NAMES = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentDate = new Date();
  let currentTimeInms = currentDate.getTime();
  let targetDate = new Date(targetTimestamp);
  let targetTimeInms = targetDate.getTime();
  let elapsed = Math.floor((currentTimeInms - targetTimeInms) / 1000);

  if (elapsed < 1) {
    return "0s";
  }
  if (elapsed < 60) {
    //< 60 sec
    return `${elapsed}s`;
  }
  if (elapsed < 3600) {
    //< 60 minutes
    return `${Math.floor(elapsed / 60)}m`;
  }
  if (elapsed < 86400) {
    //< 24 hours
    return `${Math.floor(elapsed / 3600)}h`;
  }
  if (elapsed < 604800) {
    //<7 days
    return `${Math.floor(elapsed / 86400)}d`;
  }
  if (elapsed < 2628000) {
    //<1 month
    return `${targetDate.getDate()} ${MONTH_NAMES[targetDate.getMonth()]}`;
  }
  return `${targetDate.getDate()} ${
    MONTH_NAMES[targetDate.getMonth()]
  } ${targetDate.getFullYear()}`; //more than a monh
}
