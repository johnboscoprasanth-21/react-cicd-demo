import { useEffect, useState, type FormEvent } from 'react'
import { formatIst, formatElapsed } from '../lib/formatIst'
import {
  loadArticles,
  saveArticles,
  newArticle,
  nextStage,
  ragFor,
  STAGES,
  type Article,
  type Stage,
} from './articleTrackerLogic'

export function ArticleTracker() {
  const [articles, setArticles] = useState<Article[]>(() => loadArticles())
  const [title, setTitle] = useState('')
  // Tick once per second so elapsed times re-render live.
  const [, setTick] = useState(0)

  useEffect(() => {
    saveArticles(articles)
  }, [articles])

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000)
    return () => clearInterval(id)
  }, [])

  const handleAdd = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    setArticles((prev) => [...prev, newArticle(trimmed)])
    setTitle('')
  }

  const handleAdvance = (id: string) => {
    setArticles((prev) =>
      prev.map((a) =>
        a.id === id && a.stage !== 'Published'
          ? { ...a, stage: nextStage(a.stage), stageEnteredAt: Date.now() }
          : a,
      ),
    )
  }

  const handleRemove = (id: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== id))
  }

  const handleReset = () => {
    setArticles([])
  }

  const counts: Record<Stage, number> = {
    Submitted: 0,
    Copyediting: 0,
    Typesetting: 0,
    Proofing: 0,
    Published: 0,
  }
  for (const a of articles) counts[a.stage]++

  return (
    <section className="tracker" aria-label="Article Production Tracker">
      <header className="tracker-head">
        <div>
          <h2>Article Production Tracker</h2>
          <p className="tracker-sub">
            Editorial workflow demo · RAG status by time-in-stage · IST
            timestamps · persisted locally
          </p>
        </div>
        <div className="tracker-counts" aria-label="Stage counts">
          {STAGES.map((s) => (
            <span key={s} className="count-chip" title={s}>
              <span className="count-label">{s}</span>
              <span className="count-num">{counts[s]}</span>
            </span>
          ))}
        </div>
      </header>

      <form className="tracker-form" onSubmit={handleAdd}>
        <label htmlFor="article-title" className="sr-only">
          Article title
        </label>
        <input
          id="article-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. JCHEM-2026-0341 · Catalysis review"
          maxLength={120}
        />
        <button type="submit" className="btn btn-primary">
          + Add article
        </button>
        {articles.length > 0 && (
          <button
            type="button"
            className="btn btn-ghost"
            onClick={handleReset}
            aria-label="Reset all articles"
          >
            Reset
          </button>
        )}
      </form>

      {articles.length === 0 ? (
        <div className="tracker-empty">
          <p>
            No articles yet. Add one above — every article starts in
            <strong> Submitted</strong> and you can advance it through the
            stages.
          </p>
        </div>
      ) : (
        <ul className="tracker-list">
          {articles.map((a) => {
            const stageElapsed = Date.now() - a.stageEnteredAt
            const totalElapsed = Date.now() - a.submittedAt
            const rag = ragFor(stageElapsed)
            const isDone = a.stage === 'Published'
            return (
              <li
                key={a.id}
                className={`article rag-${rag} ${isDone ? 'is-done' : ''}`}
              >
                <div className="article-main">
                  <div className="article-top">
                    <span
                      className={`stage-pill stage-${a.stage.toLowerCase()}`}
                    >
                      {a.stage}
                    </span>
                    <span className="article-title">{a.title}</span>
                  </div>
                  <div className="article-meta">
                    <span>Submitted: {formatIst(new Date(a.submittedAt))}</span>
                    <span className="dot">·</span>
                    <span>In stage: {formatElapsed(stageElapsed)}</span>
                    <span className="dot">·</span>
                    <span>Total: {formatElapsed(totalElapsed)}</span>
                  </div>
                </div>
                <div className="article-actions">
                  {!isDone && (
                    <button
                      type="button"
                      className="btn btn-advance"
                      onClick={() => handleAdvance(a.id)}
                      aria-label={`Advance ${a.title} to ${nextStage(a.stage)}`}
                    >
                      Advance →
                    </button>
                  )}
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => handleRemove(a.id)}
                    aria-label={`Remove ${a.title}`}
                  >
                    ✕
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
