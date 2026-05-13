import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

const repoName = 'react-cicd-demo'

export default defineConfig({
  plugins: [react()],
  base: `/${repoName}/`,
  define: {
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    __COMMIT_SHA__: JSON.stringify(
      (process.env.GITHUB_SHA ?? 'local-dev').slice(0, 7),
    ),
  },
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['./src/setupTests.ts'],
  },
})
