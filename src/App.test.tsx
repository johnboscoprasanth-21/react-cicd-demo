import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the demo heading', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', { name: /CI\/CD Pipeline Demo/i }),
    ).toBeInTheDocument()
  })

  it('lists all four pipeline stages', () => {
    render(<App />)
    for (const stage of ['Lint', 'Test', 'Build', 'Deploy']) {
      expect(screen.getByText(stage)).toBeInTheDocument()
    }
  })

  it('increments the click counter', async () => {
    const user = userEvent.setup()
    render(<App />)
    const button = screen.getByRole('button', { name: /sanity click/i })
    expect(button).toHaveTextContent('It works (0)')
    await user.click(button)
    expect(button).toHaveTextContent('It works (1)')
  })
})
