import { render, screen } from '@testing-library/react'
import { beforeEach, describe, it, expect } from 'vitest'
import App from './App'

beforeEach(() => {
  localStorage.clear()
})

describe('App', () => {
  it('renders the CI/CD demo heading', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', { level: 1, name: /CI\/CD Pipeline Demo/i }),
    ).toBeInTheDocument()
  })

  it('shows the ContentPilot brand', () => {
    render(<App />)
    expect(screen.getByText('ContentPilot')).toBeInTheDocument()
    expect(
      screen.getByText(/Workflow management with agility/i),
    ).toBeInTheDocument()
  })

  it('renders the live IST clock', () => {
    render(<App />)
    expect(screen.getByLabelText(/Current time in IST/i)).toBeInTheDocument()
  })

  it('lists all four CI/CD pipeline stages', () => {
    render(<App />)
    for (const stage of ['Lint', 'Test', 'Build', 'Deploy']) {
      expect(screen.getByText(stage)).toBeInTheDocument()
    }
  })

  it('renders the Article Production Tracker', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /Article Production Tracker/i,
      }),
    ).toBeInTheDocument()
  })
})
