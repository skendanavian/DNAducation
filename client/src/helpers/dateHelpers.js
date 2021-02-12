import { DateTime } from "luxon";

export function getTimeToDue(date) {
  const dueDateTime = DateTime.fromISO(date);
  const units = ["months","weeks", "days", "hours", "minutes"];
  const diffDuration = dueDateTime.diffNow(units);

  const diffUnits = [
    diffDuration.months,
    diffDuration.weeks,
    diffDuration.days,
    diffDuration.hours,
    diffDuration.minutes,
  ].map((diffU, index) => [diffU, units[index]]);

  // I want 5 days ago or
  // in 5 days

  // find first non-zero number
  const [amount, unit] = diffUnits.find(unit => unit[0]);
  const normalizedAmount = Math.abs(amount);
  const normalizedUnit = normalizedAmount === 1 ? unit.slice(0, -1) : unit;

  if (amount > 0) {
    return `in ${normalizedAmount} ${normalizedUnit}`;
  } else {
    return `${normalizedAmount} ${normalizedUnit} ago`;
  }
}

export function dateIsPast(date) {
  return DateTime.fromISO(date).diffNow() < 0;
}