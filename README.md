# Yusuf Ali — Developer Portfolio v2

**Live:** https://stripe-dev.vercel.app

Senior Backend Engineer · Stripe Integration & Webhook Reliability Specialist  
Rajshahi, Bangladesh 🇧🇩 · Remote OK

---

## 2026 Focus

- **Primary:** Stripe-native payment flows, webhook reliability, and idempotent integrations
- **Platforms:** Production clientwork on `clientflow-pro` and `sso-platform`; open-source work on `stripe-dev`
- **Delivery:** Dockerized deployments on Vercel/serverless and self-hosted nginx stacks
- **Quality focus:** Retry-safe APIs, SCA/3DS-ready checkout, auth-hardening, schema-safe Postgres changes

---

<!-- SHIPPING:START -->
- **yusufdupsc1/stripe-dev** — feat: add issue templates and changelog for Sprint 12 `2026-07-25 15:34:05 UTC`
- **yusufdupsc1/stripe-dev** — feat: add command palette and status widget components, implement project case study page, and include project data `2026-07-25 13:18:27 UTC`
- **yusufdupsc1/stripe-dev** — Merge About and Expertise into bento grid with container queries `2026-07-25 11:26:55 UTC`
- **yusufdupsc1/stripe-dev** — Remove temp browser artifacts `2026-07-25 10:29:48 UTC`
- **yusufdupsc1/OpenSchoolOS** — fix(api): update database connection settings for SQLite compatibility `2026-07-25 04:11:44 UTC`
<!-- SHIPPING:END -->

---

## Stack

| Layer     | Tech                                         |
|-----------|----------------------------------------------|
| Frontend  | React 18 · TypeScript · Tailwind CSS · Vite  |
| Fonts     | Sora (display) · DM Mono (code)              |
| Payments  | Stripe API (PaymentIntents + Checkout)       |
| Deploy    | Vercel (serverless API routes)               |
| PWA       | Web App Manifest · Service Worker            |
| Docker    | nginx:alpine multi-stage build               |

---

## Quick start

```bash
# 1. Clone
git clone https://github.com/yusufdupsc1/<repo> && cd <repo>

# 2. Install
pnpm install

# 3. Environment
cp .env.example .env.local
# → add STRIPE_SECRET_KEY=sk_test_...
# → add VITE_APP_URL=http://localhost:5173

# 4. Run
pnpm dev          # http://localhost:5173
```

---

## Quality pipeline

All quality gates must pass 100% before any push to production.

```bash
pnpm run check      # lint → typecheck → test → build (full pipeline)
pnpm run lint       # ESLint zero-warnings
pnpm run typecheck  # TypeScript strict mode
pnpm run test       # Vitest all tests
pnpm run test:coverage  # Vitest with v8 coverage report
pnpm run build      # Production build
pnpm format         # Prettier format all files
pnpm format:check   # Prettier check all files
pnpm validate-env   # Verify required env vars are present
```

### Pre-commit hooks

Husky pre-commit hooks run `pnpm test` before every commit. The CI/CD pipeline (`.github/workflows/ci.yml`) runs lint → typecheck → test → accessibility audit → build → deploy to production on push to `main`. There are no `continue-on-error` steps — any failure blocks deployment.

---

## Performance budget

| Metric               | Budget     |
|----------------------|------------|
| Main bundle (gzipped)| < 150 KB   |
| Lighthouse Performance | > 90     |
| Lighthouse Accessibility | > 95  |
| Lighthouse SEO        | > 90     |
| Lighthouse Best Practices | > 90 |
| First Contentful Paint | < 1.5 s  |
| Time to Interactive   | < 3.5 s   |

Run `pnpm build:analyze` (after adding `vite-bundle-analyzer`) to inspect bundle composition.

---

## Testing

### Unit tests (Vitest + Testing Library)

```bash
pnpm test           # Run all tests
pnpm test:coverage  # Coverage report to coverage/
```

Test files live in `src/test/`:
- `example.test.ts` — minimal setup verification
- `contrast.test.ts` — WCAG contrast ratio unit tests for design tokens
- `terminalCommands.test.ts` — shell command registry unit tests

### E2E tests (Playwright)

E2E tests verify critical user flows across desktop and mobile viewports:
- Navigation (desktop + mobile dock)
- Theme switching
- Command palette open/close
- Contact form submission flow
- Stripe checkout flow (test mode)

### Contrast validation

The `scripts/check-contrast.cjs` script validates that all design token pairings meet WCAG 2.x contrast ratios:
- Normal text on backgrounds: ≥ 4.5:1
- Large text and UI components: ≥ 3:1

Run it alongside the build pipeline to catch contrast regressions.

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/your-feature`)
3. Write tests for new functionality
4. Ensure all quality gates pass (`pnpm run check`)
5. Commit with conventional commits (`feat:`, `fix:`, `docs:`, `refactor:`)
6. Open a Pull Request with a clear description

### Commit conventions

This project uses [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` new feature
- `fix:` bug fix
- `docs:` documentation only
- `refactor:` code change without functional change
- `perf:` performance improvement
- `test:` adding or updating tests

---

## Stripe test mode

The contact form's "Hire Me" tab creates a real Stripe Checkout session in **test mode**.

| Field      | Value                  |
|------------|------------------------|
| Card       | `4242 4242 4242 4242`  |
| Expiry     | Any future date        |
| CVC        | Any 3 digits           |
| 3DS card   | `4000 0025 0000 3155`  |

No real charges are made while `STRIPE_SECRET_KEY` starts with `sk_test_`.

### API endpoints (`/api/stripe`)

```
POST /api/stripe  { action: "create-payment-intent",  amount, currency }
POST /api/stripe  { action: "create-checkout-session", amount, productName }
POST /api/stripe  { action: "create-customer",          email, name }
POST /api/stripe  { action: "create-refund",            paymentIntentId }
POST /api/stripe  { action: "retrieve-session",         sessionId }
```

---

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard:
# STRIPE_SECRET_KEY  = sk_test_...
# VITE_APP_URL       = https://your-domain.vercel.app
```

The `vercel.json` already configures:
- API route rewrites → `/api/*`
- Security headers on all routes
- Correct `Cache-Control` for the service worker

---

## Docker (self-hosted)

```bash
docker compose up --build          # production on :3000
docker compose --profile dev up    # dev server on :5173
```

---

## PWA

The portfolio is a fully installable Progressive Web App:
- `public/manifest.json` — app metadata & icons
- `public/sw.js` — cache-first strategy for static assets, network-first for API routes

---

## Project structure

```
/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx         # Top nav + mobile bottom dock + command palette trigger
│   │   ├── Hero.tsx           # Typewriter + particle canvas + live GitHub stats
│   │   ├── AboutExpertise.tsx # Bento grid: timeline, skills, metrics, proof links, status widget
│   │   ├── Projects.tsx       # Real GitHub repos project cards
│   │   ├── Contact.tsx        # Message form + Stripe Checkout
│   │   ├── Shell.tsx          # Interactive terminal (command palette + standalone)
│   │   ├── StatusWidget.tsx   # Live health check with latency polling
│   │   ├── WebhookTrace.tsx   # SVG webhook flow visualization
│   │   └── CommandPalette.tsx # cmdk-powered command palette (lazy loaded)
│   ├── styles/
│   │   ├── tokens.css         # CSS custom properties (design tokens)
│   │   ├── base.css           # Reset, typography, base styles, skip link
│   │   ├── components.css     # Component-specific styles
│   │   └── utilities.css      # Keyframes, bento grid, interaction patterns
│   ├── data/
│   │   ├── profile.ts         # PROFILE, TIMELINE, EXPERTISE, STATS
│   │   └── projects.ts        # Project case study data (Project interface)
│   ├── lib/
│   │   ├── github.ts          # useGitHubStats hook + cache utilities
│   │   └── terminalCommands.ts # Shell command registry + CommandOutput type
│   ├── pages/
│   │   └── ProjectCaseStudy.tsx # Dynamic project case study page
│   ├── test/
│   │   ├── example.test.ts    # Minimal setup verification
│   │   ├── contrast.test.ts   # WCAG contrast ratio unit tests
│   │   └── terminalCommands.test.ts # Shell command unit tests
│   ├── test/setup.ts          # Vitest + @testing-library setup
│   ├── App.tsx                # Route definitions + lazy CommandPalette
│   ├── main.tsx               # Entry point (StrictMode + BrowserRouter)
│   └── vite-env.d.ts
├── api/
│   ├── stripe/index.ts        # Vercel serverless Stripe handler
│   └── health.ts              # Health check endpoint
├── scripts/
│   ├── check-contrast.cjs     # WCAG contrast ratio checker for design tokens
│   ├── update-readme.cjs      # Auto-update README with recent GitHub activity
│   └── validate-env.cjs       # Validate required env vars at build time
├── public/
│   ├── manifest.json          # PWA manifest
│   ├── sw.js                  # Service worker
│   └── icon-*.svg             # App icons
├── .env.example               # Required and optional environment variables
├── .prettierrc                # Prettier configuration
├── eslint.config.js           # ESLint flat config (TypeScript + React)
├── vercel.json                # Vercel deploy config + CSP headers
├── Dockerfile                 # Multi-stage build: Node → nginx:alpine
├── nginx.conf                 # nginx config + CSP headers
├── docker-compose.yml         # Docker Compose for prod + dev profiles
├── tailwind.config.js         # Tailwind CSS with design token integration
└── vite.config.ts             # Vite config + GitHub stats build plugin
```

---

## Contact

- **Email** yusufdupsc1@gmail.com
- **GitHub** [@yusufdupsc1](https://github.com/yusufdupsc1)
- **LinkedIn** [yusuf-ali-backend-engineer](https://linkedin.com/in/yusuf-ali-backend-engineer)
