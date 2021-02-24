import { DateTime } from "luxon";

export function getTimeToDue(date) {
  return DateTime.fromISO(date).toRelative();
}

export function dateIsPast(date) {
  return DateTime.fromISO(date).diffNow() < 0;
}

export function datesAreInOrder(dateA, dateB) {
  return DateTime.fromISO(dateA).diff(DateTime.fromISO(dateB)) < 0;
}

export function toReadable(date) {
  return DateTime.fromISO(date).toLocaleString();
}