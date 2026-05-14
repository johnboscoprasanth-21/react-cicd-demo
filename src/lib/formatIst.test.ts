import { describe, it, expect } from 'vitest'
import {
  formatIst,
  formatIstDate,
  formatIstTime,
  formatElapsed,
} from './formatIst'

// Reference moment: 2026-01-15T08:30:45Z UTC === 2026-01-15T14:00:45 IST
const REF = new Date('2026-01-15T08:30:45Z')

describe('formatIst', () => {
  it('formats full IST timestamp as DD-MM-YYYY HH:MM:SS IST', () => {
    expect(formatIst(REF)).toBe('15-01-2026 14:00:45 IST')
  })

  it('formatIstDate gives DD-MM-YYYY', () => {
    expect(formatIstDate(REF)).toBe('15-01-2026')
  })

  it('formatIstTime gives HH:MM:SS in 24-hour', () => {
    expect(formatIstTime(REF)).toBe('14:00:45')
  })

  it('rolls date forward when UTC time + 5:30 crosses midnight IST', () => {
    // 2026-03-01T19:00:00Z === 2026-03-02 00:30:00 IST
    const d = new Date('2026-03-01T19:00:00Z')
    expect(formatIst(d)).toBe('02-03-2026 00:30:00 IST')
  })
})

describe('formatElapsed', () => {
  it('shows seconds under 1 minute', () => {
    expect(formatElapsed(15_000)).toBe('15s')
  })

  it('shows minutes under 1 hour', () => {
    expect(formatElapsed(5 * 60_000)).toBe('5m')
  })

  it('shows hours and minutes when over 1 hour', () => {
    expect(formatElapsed(2 * 3_600_000 + 15 * 60_000)).toBe('2h 15m')
  })

  it('omits zero minutes when whole-hour', () => {
    expect(formatElapsed(3 * 3_600_000)).toBe('3h')
  })

  it('clamps negative input to zero seconds', () => {
    expect(formatElapsed(-500)).toBe('0s')
  })
})
