import { useState } from 'react'
import './App.css'

const STAGES = [
  { name: 'Lint', desc: 'ESLint static analysis on every push & PR' },
  { name: 'Test', desc: 'Vitest unit tests with React Testing Library' },
  { name: 'Build', desc: 'Vite production build → dist/' },
  { name: 'Deploy', desc: 'Publish dist/ to GitHub Pages (main branch only)' },
]

function App() {
  const [clicks, setClicks] = useState(0)

  return (
    <main className="container">
      <header className="hero">
        <span className="badge">KRA · Learning &amp; Innovation</span>
        <h1>CI/CD Pipeline Demo 2</h1>
        <p className="lead">
          A React + TypeScript app, automatically linted, tested, built and
          deployed by GitHub Actions on every push to <code>main</code>.
        </p>
      </header>

      <section className="pipeline" aria-label="Pipeline stages">
        {STAGES.map((stage, i) => (
          <div className="stage" key={stage.name}>
            <div className="stage-num">{i + 1}</div>
            <div className="stage-body">
              <div className="stage-name">{stage.name}</div>
              <div className="stage-desc">{stage.desc}</div>
            </div>
            {i < STAGES.length - 1 && <div className="arrow">→</div>}
          </div>
        ))}
      </section>

      <section className="card" aria-label="Live build info">
        <h2>This build</h2>
        <dl className="meta">
          <dt>Commit</dt>
          <dd>
            <code>{__COMMIT_SHA__}</code>
          </dd>
          <dt>Built at</dt>
          <dd>
            <code>{__BUILD_TIME__}</code>
          </dd>
        </dl>
        <button
          className="ping"
          onClick={() => setClicks((c) => c + 1)}
          aria-label="Sanity click"
        >
          It works ({clicks})
        </button>
      </section>

      <footer className="footer">
        <span>John Bosco Prasanth · Integra</span>
      </footer>
    </main>
  )
}

export default App
