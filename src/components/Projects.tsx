import { motion, useReducedMotion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const supportsViewTransition = typeof document !== "undefined" && typeof document.startViewTransition === "function";

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
    live: 'https://github.com/yusufdupsc1/wagtail-keycloak-sso-lab',
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

const hoverLift = {
  scale: 1.02,
  y: -4,
  transition: { stiffness: 300, damping: 20 },
};

const sectionVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
      transition: { stiffness: 300, damping: 24 },
  },
};

export default function Projects() {
  const shouldReduce = useReducedMotion() ?? false;
  const navigate = useNavigate();

  const reducedItemVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.01 } } };
  const activeItemVariants = shouldReduce ? reducedItemVariants : itemVariants;

  const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement>, to: string) => {
    if (supportsViewTransition) {
      e.preventDefault();
      document.startViewTransition(() => {
        navigate(to);
      });
    }
  };

  return (
    <motion.section
      id="projects"

      className="py-24"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10%' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={activeItemVariants} className="mb-14 text-center">
          <p className="text-violet-400 font-mono text-sm mb-3 uppercase tracking-widest">Projects</p>
          <h2 className="text-3xl font-bold text-white mb-4">
            Shipped, not mocked
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Real repositories from my GitHub. Not Lorem Ipsum placeholder projects.
          </p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={sectionVariants}
        >
          {PROJECTS.map(p => (
            <Link key={p.name} to={`/projects/${p.name}`} onClick={(e) => handleCardClick(e, `/projects/${p.name}`)}>
              <motion.article
                variants={activeItemVariants}
                whileHover={shouldReduce ? {} : hoverLift}
                className={`group flex flex-col p-5 rounded-2xl bg-[var(--c-neutral-900)] border border-white/[0.07] ${COLORS[p.color].border} hover:shadow-lg hover:shadow-black/40`}
              >
              <div className="flex items-start justify-between mb-3">
                <span className={`px-2.5 py-1 rounded-md text-xs font-medium inline-flex items-center gap-1.5 ${COLORS[p.color].badge}`}>
                  {p.badge === '🔒 Payments' && <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>}
                  {p.badge === '💼 SaaS' && <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 20H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2Z"/><path d="M12 8V4"/></svg>}
                  {p.badge === '🔐 SSO' && <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>}
                  {p.badge === '📍 Geo' && <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>}
                  {p.badge === '🐛 Debug' && <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20v4"/><path d="M18.4 20H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h14.4a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2Z"/><path d="M9 13v4"/><path d="M15 13v4"/></svg>}
                  {p.badge === '🎨 Portfolio' && <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="10.5" r="2.5"/><circle cx="8.5" cy="7.5" r="2.5"/><circle cx="6.5" cy="12.5" r="2.5"/><path d="M12 22v-6"/><path d="M12 13a5 5 0 0 0-5-5c0-1.5 4-5 9-8 5 3 9 6.5 9 8a5 5 0 0 1-5 5h-3Z"/><path d="M8 15l-2 3"/><path d="M12 13a3 3 0 0 0-3-3c0-1 2-3 6-4 4 1 6 3 6 4a3 3 0 0 1-3 3h-3Z"/></svg>}
                  {p.badge === '🏫 EdTech' && <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>}
                  {p.badge === '⚛️ Fullstack' && <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><path d="M20.2 20.2c-1.1 3.6-5.3 5.2-8.8 4.4-3.6-1.1-5.2-5.3-4.4-8.8"/><path d="M3.8 3.8c1.1-3.6 5.3-5.2 8.8-4.4 3.6 1.1 5.2 5.3 4.4 8.8"/></svg>}
                  {p.badge.replace(/^[^\s]+\s/, '')}
                </span>
                {p.featured && (
                  <span className="text-xs text-white/60 font-mono">pinned</span>
                )}
              </div>

              <h3 className="text-white font-semibold text-xl mb-1 font-mono">{p.name}</h3>
              <p className="text-white/50 text-xs mb-2">{p.tagline}</p>
               <p className="text-white/65 text-sm leading-relaxed flex-1 mb-4">{p.desc}</p>

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
                  className="flex-1 py-3 rounded-lg border border-white/[0.08] hover:border-white/20 text-white/50 hover:text-white text-xs font-medium text-center interact-card min-h-[44px] min-w-[44px]"
                >
                  View Code →
                </a>
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 rounded-lg bg-violet-600/20 border border-violet-500/30 hover:bg-violet-600/30 text-violet-400 text-xs font-medium text-center interact-card min-h-[44px] min-w-[44px]"
                  >
                    Live ↗
                  </a>
                )}
              </div>
              </motion.article>
            </Link>
          ))}
        </motion.div>

        <motion.div variants={activeItemVariants} className="text-center mt-10">
          <a
            href="https://github.com/yusufdupsc1?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/10 hover:border-violet-500/40 text-white/60 hover:text-white text-sm font-medium interact-card"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
            See all 44+ repos on GitHub
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}
