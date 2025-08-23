function floorDateTo5Minutes(dt: Date): Date {
  const newDate = new Date(dt.getTime());
  const minutes = newDate.getMinutes();
  const newMinutes = Math.floor(minutes / 5) * 5;
  newDate.setMinutes(newMinutes, 0, 0);
  return newDate;
}

/**
 * Formats a date string by flooring it to the nearest 5 minutes and converting to an ISO string.
 * @param dateString The date string to format.
 * @returns The formatted ISO date string.
 */
export function formatTimestamp(dateString: string): string {
  const date = new Date(dateString);
  const flooredDate = floorDateTo5Minutes(date);
  return flooredDate.toISOString();
}

/**
 * Formats a date string into a user-friendly ja-JP locale string.
 * e.g., "08/22 16:57"
 * @param dateString The date string to format.
 * @returns The formatted date string.
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleString('ja-JP', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}
