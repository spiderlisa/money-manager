export function formatFromLongDate(value: string) {
  return value.slice(0, value.indexOf('T'));
}

export function formatToLongDate(value: string) {
  return `${value}T12:00:00`;
}
