# Yusuf Ali — Developer Portfolio v2

**Live:** https://stripe-dev.vercel.app

Senior Backend Engineer · Stripe Integration & Webhook Reliability Specialist  
Rajshahi, Bangladesh 🇧🇩 · Remote OK

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
# → add NEXT_PUBLIC_APP_URL=http://localhost:5173

# 4. Run
pnpm dev          # http://localhost:5173
```

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
# NEXT_PUBLIC_APP_URL = https://your-domain.vercel.app
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
├── api/
│   └── stripe/index.ts        # Vercel serverless Stripe handler
├── public/
│   ├── manifest.json          # PWA manifest
│   ├── sw.js                  # Service worker
│   └── icon-*.svg             # App icons
├── src/
│   ├── components/
│   │   ├── Navbar.tsx         # Top nav + mobile bottom dock
│   │   ├── Hero.tsx           # Typewriter + terminal card
│   │   ├── About.tsx          # Timeline + real GitHub stats
│   │   ├── Expertise.tsx      # Animated skill bars
│   │   ├── Projects.tsx       # Real GitHub repos
│   │   ├── Contact.tsx        # Message form + Stripe Checkout
│   │   └── Footer.tsx
│   ├── hooks/
│   │   └── useInView.ts       # Intersection Observer hook
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css              # Design tokens + animations
│   └── vite-env.d.ts
├── .env.example
├── vercel.json
├── Dockerfile
├── nginx.conf
├── docker-compose.yml
├── tailwind.config.js
└── vite.config.ts
```

---

## Contact

- **Email** yusufdupsc1@gmail.com
- **GitHub** [@yusufdupsc1](https://github.com/yusufdupsc1)
- **LinkedIn** [yusuf-ali-backend-engineer](https://linkedin.com/in/yusuf-ali-backend-engineer)
