# CI/CD Hardening Rules

The CI/CD pipeline is hardened to ensure no test skips before live deploy.
All quality gates must pass 100% before any push to production reaches Vercel.

## Pipeline Structure (`.github/workflows/ci.yml`)

Jobs run in strict sequential order via `needs`:
1. **Lint** — `pnpm lint` (fails on warnings)
2. **Typecheck** — `pnpm typecheck` (depends on lint)
3. **Test** — `pnpm test` via vitest (depends on typecheck)
4. **Accessibility** — axe-core audit on built site (depends on test)
5. **Build** — `pnpm build` (depends on a11y)
6. **Deploy** — `vercel-action` to production, only on push to `main` (depends on build, requires `success()`)

The deploy job will **not run** if any previous job fails. There is no `continue-on-error` anywhere.

## Test Infrastructure

- **Framework**: vitest (`src/test/example.test.ts`)
- **Environment**: jsdom
- **Setup**: `src/test/setup.ts` (extends `@testing-library/jest-dom`)
- **Coverage**: `pnpm test:coverage` runs with v8 reporter to `coverage/`
- **Pre-commit**: hook runs `pnpm test` before every commit

## Quality Gate Scripts

- `pnpm test` — run all tests once
- `pnpm test:coverage` — run tests with coverage report
- `pnpm run check` — lint → typecheck → test → build (full quality pipeline)