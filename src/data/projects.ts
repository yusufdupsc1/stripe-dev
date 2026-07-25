export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  live: string;
  repo: string;
  featured: boolean;
  color: string;
  badge: string;
  problem: string;
  architecture: string;
  decisions: string[];
  result: string;
}

export const projects: Project[] = [
  {
    slug: "stripe-dev",
    title: "stripe-dev",
    tagline: "Stripe integration & webhook reliability platform",
    description:
      "Production-ready Stripe integration with PaymentIntents, Checkout sessions, webhook signature verification, idempotency handling, and retry queues. Deployed live.",
    tags: ["Stripe", "TypeScript", "Node.js", "Webhooks", "Vercel"],
    live: "https://stripe-dev.vercel.app",
    repo: "https://github.com/yusufdupsc1/stripe-dev",
    featured: true,
    color: "violet",
    badge: "🔒 Payments",
    problem:
      "Payment integrations often fail silently or expose raw card data; webhook replay attacks and lost events make reconciliation unreliable.",
    architecture:
      "Server-side PaymentIntents + Checkout Sessions with webhook HMAC verification, idempotency keys, and a retry queue backed by Vercel Edge Functions.",
    decisions: [
      "Use PaymentIntents over Charges to comply with SCA",
      "Verify webhooks with Stripe-Signature at the edge",
      "Deduplicate via database-stored idempotency keys",
      "Queue retries with exponential backoff",
    ],
    result:
      "Zero raw card exposure, verified webhook delivery, and resilient retry behavior under load.",
  },
  {
    slug: "clientflow-pro",
    title: "clientflow-pro",
    tagline: "Client & project management SaaS",
    description:
      "PHP/Laravel CRM for freelancers — client onboarding, project tracking, invoicing, and payment collection. Role-based access control.",
    tags: ["PHP", "Laravel", "MySQL", "Billing"],
    live: "https://clientflow-pro.onrender.com",
    repo: "https://github.com/yusufdupsc1/clientflow-pro",
    featured: true,
    color: "emerald",
    badge: "💼 SaaS",
    problem:
      "Freelancers juggle clients, invoices, and deadlines in disconnected tools, leading to missed payments and inconsistent onboarding.",
    architecture:
      "Laravel monolith with MySQL, role-based access control, and billing pipelines for invoicing and payment collection.",
    decisions: [
      "Laravel for rapid CRUD and auth scaffolding",
      "MySQL for transactional billing integrity",
      "RBAC to isolate client/project data per user",
      "Render for simple PHP deployment",
    ],
    result:
      "Unified client lifecycle management with automated invoicing and reduced missed payments.",
  },
  {
    slug: "sso-platform",
    title: "sso-platform",
    tagline: "Multi-tenant SSO authentication",
    description:
      "Production-ready SSO platform with OAuth2, SAML, and multi-tenant support.",
    tags: ["Python", "Django", "Keycloak", "OAuth2"],
    live: "https://sso-platform.onrender.com",
    repo: "https://github.com/yusufdupsc1/sso-platform",
    featured: true,
    color: "cyan",
    badge: "🔐 SSO",
    problem:
      "Organizations need unified access across apps without duplicating identity stores, and SAML/OAuth2 interop is error-prone to roll in-house.",
    architecture:
      "Django app acting as a broker between Keycloak and downstream services, supporting OAuth2 and SAML per tenant.",
    decisions: [
      "Keycloak as the IdP rather than custom auth",
      "Django broker for tenant-specific config and session handling",
      "OAuth2 + SAML hybrid to maximize compatibility",
      "Multi-tenant schema per organization",
    ],
    result:
      "Single sign-on across services with reduced credential sprawl and simplified offboarding.",
  },
  {
    slug: "bd-gps",
    title: "bd-gps",
    tagline: "Bangladesh GPS tracking app",
    description:
      "Real-time GPS tracking application with map visualisation for Bangladesh locations.",
    tags: ["HTML", "Maps", "GPS", "Geolocation"],
    live: "https://bd-gps.vercel.app/en",
    repo: "https://github.com/yusufdupsc1/bd-gps",
    featured: true,
    color: "amber",
    badge: "📍 Geo",
    problem:
      "Local delivery and logistics lack reliable, lightweight real-time tracking suited for Bangladesh roads and device coverage.",
    architecture:
      "Browser geolocation streaming to a map layer with lightweight markers and route segments rendered client-side.",
    decisions: [
      "Client-side Geolocation API to minimize backend",
      "Map tiles optimized for low-bandwidth regions",
      "Vanilla JS to reduce bundle size and offline risk",
      "Vercel for static asset hosting",
    ],
    result:
      "Lightweight, deployable tracking UI with real-time position updates and responsive map rendering.",
  },
  {
    slug: "ali-fullstack-nextjs",
    title: "ali-fullstack-nextjs",
    tagline: "Full-stack Next.js application",
    description:
      "Production full-stack Next.js application with authentication, database integration, and modern UI.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Auth"],
    live: "https://ali-fullstact-nextjs.vercel.app/",
    repo: "https://github.com/yusufdupsc1/ali-fullstact-nextjs",
    featured: false,
    color: "violet",
    badge: "⚛️ Fullstack",
    problem:
      "Need a production-grade Next.js template with auth, database, and UI pre-wired to avoid repeating setup on each greenfield.",
    architecture:
      "Next.js App Router with server components, PostgreSQL via ORM, and shared auth utilities for protected routes.",
    decisions: [
      "Next.js App Router for RSC and caching",
      "PostgreSQL for relational consistency",
      "Shared auth utilities across server actions",
      "Vercel deployment with preview branches",
    ],
    result:
      "Reusable full-stack starter with established patterns for auth, data fetching, and deployment.",
  },
  {
    slug: "scholaops1",
    title: "scholaops1",
    tagline: "Modern school management",
    description:
      "Comprehensive school operations platform with student management, fees, and attendance.",
    tags: ["TypeScript", "Next.js", "PostgreSQL"],
    live: "https://scholaops1.vercel.app/",
    repo: "https://github.com/yusufdupsc1/schola-ops",
    featured: false,
    color: "cyan",
    badge: "🏫 EdTech",
    problem:
      "Schools rely on fragmented spreadsheets for attendance, fees, and student records, creating data integrity and reporting gaps.",
    architecture:
      "Next.js front-end with PostgreSQL backend, managing students, attendance, and fee workflows with role-based access.",
    decisions: [
      "Next.js for UI and API route convenience",
      "PostgreSQL for structured academic data",
      "RBAC for teachers vs admin views",
      "Vercel for hosting with edge API routes",
    ],
    result:
      "Digitized core school operations with centralized student records and fee tracking.",
  },
  {
    slug: "wagtail-keycloak-sso-lab",
    title: "wagtail-keycloak-sso-lab",
    tagline: "SSO debugging lab",
    description:
      "Wagtail CMS with Keycloak SSO integration - debugging and troubleshooting lab.",
    tags: ["Python", "Django", "Keycloak", "SSO"],
    live: "https://github.com/yusufdupsc1/wagtail-keycloak-sso-lab",
    repo: "https://github.com/yusufdupsc1/wagtail-keycloak-sso-lab",
    featured: false,
    color: "emerald",
    badge: "🐛 Debug",
    problem:
      "Integrating Wagtail CMS with Keycloak SSO requires debugging protocol mismatches, redirect URIs, and session lifecycle edge cases.",
    architecture:
      "Wagtail CMS extended with Keycloak OIDC authentication, using debug logging and custom middleware to trace auth flows.",
    decisions: [
      "Wagtail for CMS features",
      "Keycloak as external IdP",
      "Custom middleware for debug tracing",
      "Repo-first documentation of reproducible issues",
    ],
    result:
      "Playground for reproducing and resolving Keycloak + Wagtail SSO integration bugs.",
  },
  {
    slug: "ali-3d-portfolio",
    title: "ali-3d-portfolio",
    tagline: "3D interactive portfolio",
    description:
      "Interactive 3D portfolio showcase with modern animations and visuals.",
    tags: ["Three.js", "React", "3D", "Animation"],
    live: "https://ali-3d-portfolio.vercel.app/",
    repo: "https://github.com/yusufdupsc1/ali-3d-portfolio",
    featured: false,
    color: "amber",
    badge: "🎨 Portfolio",
    problem:
      "Standard 2D portfolios fail to convey depth and interactivity expected by design-forward roles and clients.",
    architecture:
      "React + Three.js scene withanimated objects and camera transitions controlled by user gestures.",
    decisions: [
      "Three.js for 3D rendering",
      "React for UI overlay and routing",
      "Custom animations for scene transitions",
      "Vercel for fast static delivery",
    ],
    result:
      "Visually distinctive portfolio with interactive 3D scenes and smooth motion design.",
  },
];
