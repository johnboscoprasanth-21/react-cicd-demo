/**
 * Non-component logic for ArticleTracker — kept in a separate file so
 * the component file only exports components (react-refresh rule).
 */

export const STAGES = [
  'Submitted',
  'Copyediting',
  'Typesetting',
  'Proofing',
  'Published',
] as const

export type Stage = (typeof STAGES)[number]

export interface Article {
  id: string
  title: string
  stage: Stage
  submittedAt: number
  stageEnteredAt: number
}

export const STORAGE_KEY = 'contentpilot.articles.v1'

/** RAG thresholds for time-in-stage (compressed for demo visibility). */
export const AMBER_MS = 30 * 1000
export const RED_MS = 90 * 1000

export type Rag = 'green' | 'amber' | 'red'

export function ragFor(elapsedMs: number): Rag {
  if (elapsedMs >= RED_MS) return 'red'
  if (elapsedMs >= AMBER_MS) return 'amber'
  return 'green'
}

export function nextStage(stage: Stage): Stage {
  const idx = STAGES.indexOf(stage)
  if (idx < 0 || idx >= STAGES.length - 1) return stage
  return STAGES[idx + 1]
}

export function loadArticles(): Article[] {
  if (typeof localStorage === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed as Article[]
  } catch {
    return []
  }
}

export function saveArticles(items: Article[]): void {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export function newArticle(title: string): Article {
  const t = Date.now()
  return {
    id: `${t}-${Math.random().toString(36).slice(2, 8)}`,
    title,
    stage: 'Submitted',
    submittedAt: t,
    stageEnteredAt: t,
  }
}
