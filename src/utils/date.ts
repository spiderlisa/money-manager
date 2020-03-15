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
