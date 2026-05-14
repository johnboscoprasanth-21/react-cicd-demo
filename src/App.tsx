import './App.css'
import { IstClock } from './components/IstClock'
import { ArticleTracker } from './components/ArticleTracker'

const PIPELINE_STAGES = [
  { name: 'Lint', desc: 'ESLint static analysis' },
  { name: 'Test', desc: 'Vitest + Testing Library' },
  { name: 'Build', desc: 'tsc + Vite production build' },
  { name: 'Deploy', desc: 'GitHub Pages (main branch)' },
]

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="brand">
          <div className="brand-logo" aria-hidden="true">
            <span className="brand-mark-blue">C</span>
            <span className="brand-mark-coral">P</span>
          </div>
          <div className="brand-text">
            <span className="brand-name">ContentPilot</span>
            <span className="brand-tag">Workflow management with agility</span>
          </div>
        </div>
        <IstClock />
      </header>

      <main className="app-main">
        <section className="intro">
          <span className="badge">KRA · Learning &amp; Innovation</span>
          <h1>CI/CD Pipeline Demo</h1>
          <p className="lead">
            A small ContentPilot-themed editorial workflow app, automatically
            linted, tested, built and deployed by GitHub Actions on every push
            to <code>main</code>. All timestamps below are in IST (Asia/Kolkata)
            using <code>DD-MM-YYYY HH:MM:SS</code>.
          </p>
        </section>

        <ArticleTracker />

        <section className="pipeline-card" aria-label="CI/CD pipeline stages">
          <header className="card-head">
            <h2>CI/CD Pipeline</h2>
            <span className="card-sub">Runs on every push &amp; PR</span>
          </header>
          <ol className="pipeline">
            {PIPELINE_STAGES.map((s, i) => (
              <li className="stage" key={s.name}>
                <span className="stage-num">{i + 1}</span>
                <div className="stage-body">
                  <span className="stage-name">{s.name}</span>
                  <span className="stage-desc">{s.desc}</span>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="build-card" aria-label="Build info">
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
        </section>
      </main>

      <footer className="app-footer">
        <span>John Bosco Prasanth · Integra · ContentPilot Demo</span>
      </footer>
    </div>
  )
}

export default App
