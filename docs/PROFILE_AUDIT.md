# PROFILE_AUDIT

Cross-reference of every specific factual claim in `README.md` against real,
checkable evidence collected on 2026-07-25.

Evidence sources:
- GitHub user API: `https://api.github.com/users/yusufdupsc1`
- GitHub repos API: `https://api.github.com/users/yusufdupsc1/repos?per_page=100&sort=pushed`
- Local filesystem: `package.json`, `src/`, `public/`, `vercel.json`, `Dockerfile`, `docker-compose.yml`, `public/sw.js`
- `src/data/profile.ts` current title field

---

## VERIFIED

Claim | Evidence
---|---
"Senior Backend Engineer · Stripe Integration & Webhook Reliability Specialist" | GitHub bio: `stripe integration & webhook reliability engineer`; `src/data/profile.ts:4` title: `Backend Engineer | Payments & Billing Reliability (Stripe)`
"Rajshahi, Bangladesh" | GitHub profile `location`: `Rajshahi, Bangladesh`
React 18 | `package.json`: `"react": "^18.3.1"`
TypeScript | `package.json`: `"typescript": "^5.5.3"`
Tailwind CSS | `package.json`: `"tailwindcss": "^3.4.1"`
Vite | `package.json`: `"vite": "^5.4.2"`
Sora (display font) | `src/index.css`: `--font-sans: 'Sora'`; `index.html` loads Sora from Google Fonts
DM Mono (code font) | `src/index.css`: `--font-mono: 'DM Mono'`; `index.html` loads DM Mono from Google Fonts
Stripe API (PaymentIntents + Checkout) | `package.json`: `"stripe": "^17.7.0"`; `api/stripe/index.ts` exists
Vercel (serverless API routes) | `package.json`: `"@vercel/node": "^5.6.15"`; `api/stripe/index.ts` exists
Web App Manifest | `public/manifest.json` exists
Service Worker | `public/sw.js` exists
nginx:alpine multi-stage build | `Dockerfile` stage 2: `FROM nginx:alpine`
Docker Compose production on `:3000` | `docker-compose.yml`: `ports: ["3000:80"]`
Docker Compose dev profile on `:5173` | `docker-compose.yml`: `profiles: [dev]`, `ports: ["5173:5173"]`
pnpm install / pnpm dev / localhost:5173 | `package.json` scripts and `vite.config.ts` server port 5173
`.env.example` exists | filesystem: `.env.example` present
`vercel.json` exists with API rewrites | `vercel.json`: `"rewrites": [{ "source": "/api/(.*)", "destination": "/api/$1" }]`
Security headers on all routes | `vercel.json`: `X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`, `Referrer-Policy` on `/(.*)`
`Cache-Control` for service worker | `vercel.json`: `"source": "/sw.js"` header `Cache-Control: public, max-age=0, must-revalidate`
Email `yusufdupsc1@gmail.com` | GitHub profile public email matches
GitHub `@yusufdupsc1` | GitHub profile `login`: `yusufdupsc1`
`src/components/Navbar.tsx` | filesystem: EXISTS
`src/components/Hero.tsx` | filesystem: EXISTS
`src/components/Projects.tsx` | filesystem: EXISTS
`src/components/Contact.tsx` | filesystem: EXISTS
`src/components/Footer.tsx` | filesystem: EXISTS
`src/lib/github.ts` | filesystem: EXISTS
`src/App.tsx` | filesystem: EXISTS
`src/main.tsx` | filesystem: EXISTS
`src/index.css` | filesystem: EXISTS
`src/vite-env.d.ts` | filesystem: EXISTS
`api/stripe/index.ts` | filesystem: EXISTS
`public/manifest.json` | filesystem: EXISTS
`public/sw.js` | filesystem: EXISTS
`Dockerfile` | filesystem: EXISTS
`nginx.conf` | filesystem: EXISTS
`docker-compose.yml` | filesystem: EXISTS
`tailwind.config.js` | filesystem: EXISTS
`vite.config.ts` | filesystem: EXISTS

---

## UNVERIFIED

Claim | Reason
---|---
"Remote OK" | No evidence in GitHub profile or repo metadata
LinkedIn `yusuf-ali-backend-engineer` | Not returned by GitHub API; URL not checked against live LinkedIn
PWA "fully installable" | `public/manifest.json` exists, but installability depends on browser criteria not audited here
Service worker "cache-first for static assets, network-first for API routes" | `public/sw.js` exists, but README description is inaccurate: API routes bypass the SW entirely (`url.pathname.startsWith('/api/') return;`), and static assets use cache-first (not network-first). Strategy wording needs correction.
"3DS card `4000 0025 0000 3155`" | Stripe test card claim; not verified against live Stripe test mode
"No real charges are made while `STRIPE_SECRET_KEY` starts with `sk_test_`" | Logic claim about environment-gated test mode; not verified by reading Contact.tsx/testing harness
`src/components/About.tsx` | README project structure lists this file; filesystem: MISSING
`src/components/Expertise.tsx` | README project structure lists this file; filesystem: MISSING
`src/hooks/useInView.ts` | README project structure lists this file; filesystem: MISSING

---

## REMOVE

Claim | Reason
---|---
None in current README.md | No claim was found that is directly contradicted by real evidence.

**Note:** The README does NOT contain an "About Me object" with a `title: "Full-Stack Developer"`. That claim was referenced in the task description but does not exist in the current `README.md`. The actual current titles are:
- `README.md` line 5: `Senior Backend Engineer · Stripe Integration & Webhook Reliability Specialist`
- `src/data/profile.ts:4`: `Backend Engineer | Payments & Billing Reliability (Stripe)`
- GitHub bio: `stripe integration & webhook reliability engineer`

These three sources are consistent. No title contradiction exists in the current files.
