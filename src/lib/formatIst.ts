/**
 * IST (Asia/Kolkata, UTC+5:30) date/time formatters.
 *
 * Format spec used across the app:
 *   - Date: DD-MM-YYYY
 *   - Time: HH:MM:SS (24-hour)
 *   - Combined: DD-MM-YYYY HH:MM:SS IST
 */

const IST_OPTS: Intl.DateTimeFormatOptions = {
  timeZone: 'Asia/Kolkata',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
}

const istParts = (date: Date): Record<string, string> => {
  const fmt = new Intl.DateTimeFormat('en-GB', IST_OPTS)
  return Object.fromEntries(
    fmt.formatToParts(date).map((p) => [p.type, p.value]),
  )
}

/** "DD-MM-YYYY HH:MM:SS IST" */
export function formatIst(date: Date): string {
  const p = istParts(date)
  return `${p.day}-${p.month}-${p.year} ${p.hour}:${p.minute}:${p.second} IST`
}

/** "DD-MM-YYYY" */
export function formatIstDate(date: Date): string {
  const p = istParts(date)
  return `${p.day}-${p.month}-${p.year}`
}

/** "HH:MM:SS" (24-hour, IST) */
export function formatIstTime(date: Date): string {
  const p = istParts(date)
  return `${p.hour}:${p.minute}:${p.second}`
}

/**
 * Short human-readable elapsed-time, e.g. "3s", "12m", "2h 15m".
 * Used in the Article Tracker RAG status.
 */
export function formatElapsed(ms: number): string {
  if (ms < 0) ms = 0
  const sec = Math.floor(ms / 1000)
  if (sec < 60) return `${sec}s`
  const min = Math.floor(sec / 60)
  if (min < 60) return `${min}m`
  const hr = Math.floor(min / 60)
  const remMin = min % 60
  return remMin === 0 ? `${hr}h` : `${hr}h ${remMin}m`
}
