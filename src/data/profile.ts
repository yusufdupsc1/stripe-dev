// Profile data - update here for changes
export const PROFILE = {
  name: 'Yusuf Ali',
  title: 'Backend Engineer | Payments & Billing Reliability (Stripe)',
  location: 'Rajshahi, Bangladesh',
  company: 'ali.Inc.',
  bio: 'stripe integration & webhook reliability engineer',
  github: 'yusufdupsc1',
  linkedin: 'yusuf-ali-backend-engineer',
  email: 'yusufdupsc1@gmail.com',
};

export const STATS = {
  repos: 45,
  followers: 4,
  yearsExp: '5+',
  liveApps: 8,
};

export const ROLES = [
  'Backend Engineer',
  'Stripe Integration Expert',
  'Webhook Reliability Engineer',
  'API Architect',
  'Cloud-Native Builder',
];

export const TECH_STACK = [
  'Python', 'Django', 'Node.js', 'TypeScript', 'PHP', 'Laravel',
  'PostgreSQL', 'Redis', 'Docker', 'AWS', 'Next.js', 'REST APIs',
  'Stripe', 'Webhooks', 'CI/CD', 'Linux', 'GraphQL', 'JWT',
];

export const PROJECTS = [
  {
    name: 'stripe-dev',
    tagline: 'Stripe integration & webhook reliability platform',
    desc: 'Production-ready Stripe integration with PaymentIntents, Checkout sessions, webhook signature verification, idempotency handling, and retry queues.',
    tags: ['Stripe', 'TypeScript', 'Node.js', 'Webhooks', 'Vercel'],
    live: 'https://stripe-dev.vercel.app',
    repo: 'https://github.com/yusufdupsc1/stripe-dev',
    featured: true,
  },
  {
    name: 'bd-gps',
    tagline: 'School management system',
    desc: 'Complete school management with student records, attendance, fees, and online payments.',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
    live: 'https://bd-gps.vercel.app/en',
    repo: 'https://github.com/yusufdupsc1/bd-gps',
    featured: true,
  },
  {
    name: 'clientflow-pro',
    tagline: 'Client & project management SaaS',
    desc: 'PHP/Laravel CRM for freelancers with client onboarding, project tracking, invoicing, and payment collection.',
    tags: ['PHP', 'Laravel', 'MySQL', 'Stripe'],
    live: 'https://clientflow-pro.onrender.com',
    repo: 'https://github.com/yusufdupsc1/clientflow-pro',
    featured: true,
  },
  {
    name: 'sso-platform',
    tagline: 'Multi-tenant SSO authentication',
    desc: 'Production-ready SSO platform with OAuth2, SAML, and multi-tenant support.',
    tags: ['Python', 'Django', 'Keycloak', 'OAuth2'],
    live: 'https://sso-platform.onrender.com',
    repo: 'https://github.com/yusufdupsc1/sso-platform',
    featured: true,
  },
  {
    name: 'wagtail-keycloak-sso-lab',
    tagline: 'SSO debugging lab',
    desc: 'Wagtail CMS with Keycloak SSO integration - debugging and troubleshooting lab.',
    tags: ['Python', 'Django', 'Keycloak', 'SSO'],
    repo: 'https://github.com/yusufdupsc1/wagtail-keycloak-sso-lab',
    featured: false,
  },
  {
    name: 'scholaops1',
    tagline: 'Modern school management',
    desc: 'Comprehensive school operations platform.',
    tags: ['TypeScript', 'Next.js', 'PostgreSQL'],
    live: 'https://scholaops1.vercel.app/',
    repo: 'https://github.com/yusufdupsc1/schola-ops',
    featured: false,
  },
];

export const TIMELINE = [
  { year: '2024–now', title: 'Payments & Stripe Specialist', co: 'ali.Inc · Freelance', desc: 'Building Stripe-native payment flows, webhook handlers, retry logic, and idempotent API integrations for SaaS clients worldwide.' },
  { year: '2022–2024', title: 'Full-Stack Engineer', co: 'Contract / Remote', desc: 'Delivered 40+ production apps with Django REST, Node/Express, and Next.js frontends. Migrated monoliths to Docker + AWS ECS.' },
  { year: '2019–2022', title: 'PHP/Laravel Developer', co: 'Local startups · BD', desc: 'E-commerce and CMS platforms with Laravel. Introduced automated test suites and CI/CD pipelines that cut deploy time by 70%.' },
  { year: '2018', title: 'Started coding', co: 'Self-taught', desc: 'First line of code in PHP. Never stopped.' },
];

export const EXPERTISE = [
  { title: 'Stripe Payments', desc: 'PaymentIntents, Checkout, webhooks, SCA/3DS, idempotency' },
  { title: 'API Architecture', desc: 'REST, GraphQL, rate limiting, authentication' },
  { title: 'Cloud & DevOps', desc: 'AWS, Docker, CI/CD, serverless' },
  { title: 'Database Design', desc: 'PostgreSQL, Prisma, migrations, optimization' },
];
