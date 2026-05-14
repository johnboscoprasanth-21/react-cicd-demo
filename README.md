# React CI/CD Pipeline Demo

[![CI/CD](https://github.com/johnboscoprasanth-21/react-cicd-demo/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/johnboscoprasanth-21/react-cicd-demo/actions/workflows/ci-cd.yml)

> **KRA — Learning & Innovation · Topic: CI/CD pipeline**
> A React + TypeScript app, automatically linted, tested, built and deployed by GitHub Actions on every push to `main`.

**Live demo:** https://johnboscoprasanth-21.github.io/react-cicd-demo/

---

## Pipeline

```
push to main / PR
        │
        ▼
┌──────────────────────────────────────────┐
│ Job: build-and-test  (ubuntu-latest)     │
│                                          │
│  1. Checkout                             │
│  2. Setup Node 20 + npm cache            │
│  3. npm ci          (install)            │
│  4. npm run lint    (ESLint)             │
│  5. npm run test    (Vitest + RTL)       │
│  6. npm run build   (tsc + vite build)   │
│  7. Upload Pages artifact  (main only)   │
└────────────────┬─────────────────────────┘
                 │ needs: build-and-test
                 ▼  (only on push to main)
┌──────────────────────────────────────────┐
│ Job: deploy                              │
│   actions/deploy-pages@v4                │
│   → https://<user>.github.io/<repo>/     │
└──────────────────────────────────────────┘
```

## Tech stack

- **Framework:** React 19 + TypeScript
- **Bundler:** Vite 6
- **Tests:** Vitest + React Testing Library + jest-dom
- **Lint:** ESLint 9 (typescript-eslint)
- **CI:** GitHub Actions
- **Hosting:** GitHub Pages

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
npm run lint
npm run test
npm run build
```

## How the demo proves the pipeline works

The landing page prints the **commit SHA** and **build time** that the CI baked into the bundle (via Vite `define`). After every successful run, refresh the live URL and verify the SHA matches the latest green commit on `main`.

## What's where

| Path | Purpose |
|---|---|
| `src/App.tsx` | The demo landing page |
| `src/App.test.tsx` | Sample tests proving the test stage runs |
| `vite.config.ts` | Vite config + `base` path + Vitest config + build-info defines |
| `.github/workflows/ci-cd.yml` | **The pipeline** |

## Demo script

1. Open the Actions tab — show a green run.
2. Open `.github/workflows/ci-cd.yml` — walk through the four stages.
3. Open the live URL — read out the commit SHA on the page.
4. Push a one-line edit → watch the new run go green → refresh live URL → new SHA.
