import { useInView } from '../hooks/useInView';

const PROJECTS = [
  {
    name: 'stripe-dev',
    tagline: 'Stripe integration & webhook reliability platform',
    desc: 'Production-ready Stripe integration with PaymentIntents, Checkout sessions, webhook signature verification, idempotency handling, and retry queues. Deployed live.',
    tags: ['Stripe', 'TypeScript', 'Node.js', 'Webhooks', 'Vercel'],
    live: 'https://stripe-dev.vercel.app',
    repo: 'https://github.com/yusufdupsc1/stripe-dev',
    featured: true,
    color: 'violet',
    badge: '🔒 Payments',
  },
  {
    name: 'clientflow-pro',
    tagline: 'Client & project management SaaS',
    desc: 'PHP/Laravel CRM for freelancers — client onboarding, project tracking, invoicing, and payment collection. Role-based access control.',
    tags: ['PHP', 'Laravel', 'MySQL', 'Billing'],
    live: 'https://clientflow-pro.onrender.com',
    repo: 'https://github.com/yusufdupsc1/clientflow-pro',
    featured: true,
    color: 'emerald',
    badge: '💼 SaaS',
  },
  {
    name: 'sso-platform',
    tagline: 'Multi-tenant SSO authentication',
    desc: 'Production-ready SSO platform with OAuth2, SAML, and multi-tenant support.',
    tags: ['Python', 'Django', 'Keycloak', 'OAuth2'],
    live: 'https://sso-platform.onrender.com',
    repo: 'https://github.com/yusufdupsc1/sso-platform',
    featured: true,
    color: 'cyan',
    badge: '🔐 SSO',
  },
  {
    name: 'bd-gps',
    tagline: 'Bangladesh GPS tracking app',
    desc: 'Real-time GPS tracking application with map visualisation for Bangladesh locations.',
    tags: ['HTML', 'Maps', 'GPS', 'Geolocation'],
    live: 'https://bd-gps.vercel.app/en',
    repo: 'https://github.com/yusufdupsc1/bd-gps',
    featured: true,
    color: 'amber',
    badge: '📍 Geo',
  },
  {
    name: 'ali-fullstack-nextjs',
    tagline: 'Full-stack Next.js application',
    desc: 'Production full-stack Next.js application with authentication, database integration, and modern UI.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Auth'],
    live: 'https://ali-fullstact-nextjs.vercel.app/',
    repo: 'https://github.com/yusufdupsc1/ali-fullstact-nextjs',
    featured: false,
    color: 'violet',
    badge: '⚛️ Fullstack',
  },
  {
    name: 'scholaops1',
    tagline: 'Modern school management',
    desc: 'Comprehensive school operations platform with student management, fees, and attendance.',
    tags: ['TypeScript', 'Next.js', 'PostgreSQL'],
    live: 'https://scholaops1.vercel.app/',
    repo: 'https://github.com/yusufdupsc1/schola-ops',
    featured: false,
    color: 'cyan',
    badge: '🏫 EdTech',
  },
  {
    name: 'wagtail-keycloak-sso-lab',
    tagline: 'SSO debugging lab',
    desc: 'Wagtail CMS with Keycloak SSO integration - debugging and troubleshooting lab.',
    tags: ['Python', 'Django', 'Keycloak', 'SSO'],
    repo: 'https://github.com/yusufdupsc1/wagtail-keycloak-sso-lab',
    featured: false,
    color: 'emerald',
    badge: '🐛 Debug',
  },
  {
    name: 'ali-3d-portfolio',
    tagline: '3D interactive portfolio',
    desc: 'Interactive 3D portfolio showcase with modern animations and visuals.',
    tags: ['Three.js', 'React', '3D', 'Animation'],
    live: 'https://ali-3d-portfolio.vercel.app/',
    repo: 'https://github.com/yusufdupsc1/ali-3d-portfolio',
    featured: false,
    color: 'amber',
    badge: '🎨 Portfolio',
  },
];

const COLORS: Record<string, { border: string; tag: string; badge: string }> = {
  violet:  { border: 'hover:border-violet-500/40',  tag: 'text-violet-400 bg-violet-500/10 border-violet-500/20',  badge: 'bg-violet-500/15 text-violet-300' },
  cyan:    { border: 'hover:border-cyan-500/40',    tag: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',        badge: 'bg-cyan-500/15 text-cyan-300' },
  emerald: { border: 'hover:border-emerald-500/40', tag: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', badge: 'bg-emerald-500/15 text-emerald-300' },
  amber:   { border: 'hover:border-amber-500/40',   tag: 'text-amber-400 bg-amber-500/10 border-amber-500/20',    badge: 'bg-amber-500/15 text-amber-300' },
};

export default function Projects() {
  const { ref, visible } = useInView();

  return (
    <section
      id="projects"
      ref={ref}
      className={`py-24 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 text-center">
          <p className="text-violet-400 font-mono text-sm mb-3 uppercase tracking-widest">Projects</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Shipped, not mocked
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Real repositories from my GitHub. Not Lorem Ipsum placeholder projects.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map(p => (
            <article
              key={p.name}
              className={`group flex flex-col p-5 rounded-2xl bg-[#0e0e14] border border-white/[0.07] ${COLORS[p.color].border} transition-all duration-300 hover:shadow-lg hover:shadow-black/40`}
            >
              <div className="flex items-start justify-between mb-3">
                <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${COLORS[p.color].badge}`}>
                  {p.badge}
                </span>
                {p.featured && (
                  <span className="text-xs text-white/30 font-mono">pinned</span>
                )}
              </div>

              <h3 className="text-white font-semibold text-lg mb-1 font-mono">{p.name}</h3>
              <p className="text-white/50 text-xs mb-2">{p.tagline}</p>
              <p className="text-white/45 text-sm leading-relaxed flex-1 mb-4">{p.desc}</p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {p.tags.map(t => (
                  <span key={t} className={`px-2 py-0.5 rounded text-xs border font-mono ${COLORS[p.color].tag}`}>
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-2 mt-auto">
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 rounded-lg border border-white/[0.08] hover:border-white/20 text-white/50 hover:text-white text-xs font-medium text-center transition-all"
                >
                  View Code →
                </a>
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 rounded-lg bg-violet-600/20 border border-violet-500/30 hover:bg-violet-600/30 text-violet-400 text-xs font-medium text-center transition-all"
                  >
                    Live ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="https://github.com/yusufdupsc1?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/10 hover:border-violet-500/40 text-white/60 hover:text-white text-sm font-medium transition-all"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
            See all 44+ repos on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
