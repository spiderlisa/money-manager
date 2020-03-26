import dateformat from 'dateformat';

export function formatFromLongDate(value: string) {
  return value.slice(0, value.indexOf('T'));
}

export function formatToLongDate(value: string) {
  return `${value}T12:00:00`;
}

export function formatToWritten(value: string) {
  const dateObj = new Date(value);
  return dateformat(dateObj, "dddd, mmmm dS, yyyy");
}

export function toSeconds(value: string) {
  const seconds = (new Date(value)).getTime() / 1000;
  return seconds;
}

export function fromSecondsToText(value: number) {
  const date = new Date(value * 1000);
  return formatFromLongDate(date.toISOString());
}
