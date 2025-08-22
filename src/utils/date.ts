function floorDateTo5Minutes(dt: Date): Date {
  const newDate = new Date(dt.getTime());
  const minutes = newDate.getMinutes();
  const newMinutes = Math.floor(minutes / 5) * 5;
  newDate.setMinutes(newMinutes, 0, 0);
  return newDate;
}

/**
 * Formats a date string by flooring it to the nearest 5 minutes and converting to a locale string.
 * @param dateString The date string to format.
 * @returns The formatted date string.
 */
export function formatTimestamp(dateString: string): string {
  const date = new Date(dateString);
  const flooredDate = floorDateTo5Minutes(date);
  return flooredDate.toLocaleString();
}
