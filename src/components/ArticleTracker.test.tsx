import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, it, expect } from 'vitest'
import { ArticleTracker } from './ArticleTracker'
import { ragFor, STAGES } from './articleTrackerLogic'

beforeEach(() => {
  localStorage.clear()
})

describe('ArticleTracker', () => {
  it('renders the heading and an empty state', () => {
    render(<ArticleTracker />)
    expect(
      screen.getByRole('heading', { name: /Article Production Tracker/i }),
    ).toBeInTheDocument()
    expect(screen.getByText(/No articles yet/i)).toBeInTheDocument()
  })

  it('adds an article in the Submitted stage', async () => {
    const user = userEvent.setup()
    render(<ArticleTracker />)
    await user.type(
      screen.getByPlaceholderText(/JCHEM-2026/i),
      'NATURE-2026-001 · Test article',
    )
    await user.click(screen.getByRole('button', { name: /add article/i }))
    expect(screen.getByText(/NATURE-2026-001/)).toBeInTheDocument()
    const item = screen.getByText(/NATURE-2026-001/).closest('li')!
    expect(within(item).getByText('Submitted')).toBeInTheDocument()
  })

  it('advances through every stage and disables advance when Published', async () => {
    const user = userEvent.setup()
    render(<ArticleTracker />)
    await user.type(screen.getByPlaceholderText(/JCHEM-2026/i), 'A1')
    await user.click(screen.getByRole('button', { name: /add article/i }))

    // Click Advance 4 times: Submitted -> Copyediting -> Typesetting -> Proofing -> Published
    for (let i = 0; i < STAGES.length - 1; i++) {
      await user.click(screen.getByRole('button', { name: /advance/i }))
    }
    const item = screen.getByText('A1').closest('li')!
    expect(within(item).getByText('Published')).toBeInTheDocument()
    expect(
      within(item).queryByRole('button', { name: /advance/i }),
    ).not.toBeInTheDocument()
  })

  it('persists articles to localStorage and reloads them', async () => {
    const user = userEvent.setup()
    const { unmount } = render(<ArticleTracker />)
    await user.type(screen.getByPlaceholderText(/JCHEM-2026/i), 'Persisted')
    await user.click(screen.getByRole('button', { name: /add article/i }))
    unmount()

    render(<ArticleTracker />)
    expect(screen.getByText('Persisted')).toBeInTheDocument()
  })

  it('removes a single article', async () => {
    const user = userEvent.setup()
    render(<ArticleTracker />)
    await user.type(screen.getByPlaceholderText(/JCHEM-2026/i), 'ToRemove')
    await user.click(screen.getByRole('button', { name: /add article/i }))
    await user.click(screen.getByRole('button', { name: /remove ToRemove/i }))
    expect(screen.queryByText('ToRemove')).not.toBeInTheDocument()
  })
})

describe('ragFor', () => {
  it('green under 30s in stage', () => {
    expect(ragFor(0)).toBe('green')
    expect(ragFor(20_000)).toBe('green')
  })
  it('amber between 30s and 90s', () => {
    expect(ragFor(30_000)).toBe('amber')
    expect(ragFor(60_000)).toBe('amber')
  })
  it('red at or past 90s', () => {
    expect(ragFor(90_000)).toBe('red')
    expect(ragFor(120_000)).toBe('red')
  })
})
