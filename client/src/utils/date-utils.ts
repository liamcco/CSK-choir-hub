export function parseIsoDate(value?: string | null): Date {
  const date = new Date(value ?? '');

  if (Number.isNaN(date.getTime())) {
    throw new Error('Invalid ISO date string');
  }

  return date;
}

export function isSameCalendarDay(first: Date, second: Date): boolean {
  return first.toDateString() === second.toDateString();
}

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
});

const timeFormatter = new Intl.DateTimeFormat(undefined, {
  hour: '2-digit',
  minute: '2-digit',
});

export function formatDate(date: Date): string {
  return dateFormatter.format(date);
}

export function formatTime(date: Date): string {
  return timeFormatter.format(date);
}

export function formatEventDateRange(dateStartIso: string, dateEndIso?: string | null): string {
  const start = parseIsoDate(dateStartIso);

  if (!dateEndIso) {
    return `${formatDate(start)} · ${formatTime(start)}`;
  }

  const end = parseIsoDate(dateEndIso);

  if (isSameCalendarDay(start, end)) {
    return `${formatDate(start)} · ${formatTime(start)} - ${formatTime(end)}`;
  }

  return `${formatDate(start)} ${formatTime(start)} - ${formatDate(end)} ${formatTime(end)}`;
}
