import { useState } from 'react';
import { useInView } from '../hooks/useInView';

/* ─ Data ─────────────────────────────────────────────────────────────── */
interface Proof  { label: string; href: string; }
interface Skill  { name: string; level: number; proof?: Proof; }
interface Cat    { id: string; title: string; icon: string; accent: AccentKey; skills: Skill[]; }

type AccentKey = 'violet' | 'cyan' | 'emerald' | 'amber';

const CATS: Cat[] = [
  {
    id: 'payments', title: 'Payments & Webhooks', icon: '💳', accent: 'violet',
    skills: [
      { name: 'Stripe API - PaymentIntents, Checkout, Connect', level: 95, proof: { label: 'stripe-dev.vercel.app', href: 'https://stripe-dev.vercel.app' } },
      { name: 'Webhook signature verification & retry queues',  level: 95, proof: { label: 'ecommerce repo', href: 'https://github.com/yusufdupsc1/ecommerce' } },
      { name: 'Idempotency keys & error recovery',              level: 92, proof: { label: 'ecommerce repo', href: 'https://github.com/yusufdupsc1/ecommerce' } },
      { name: 'REST API design - OpenAPI / Swagger',            level: 91, proof: { label: 'book_store repo', href: 'https://github.com/yusufdupsc1/book_store' } },
      { name: 'GraphQL API design',                             level: 76 },
    ],
  },
  {
    id: 'backend', title: 'Backend Engineering', icon: '⚙️', accent: 'cyan',
    skills: [
      { name: 'Python & Django / Django REST Framework', level: 90, proof: { label: 'clientflow-pro', href: 'https://github.com/yusufdupsc1/clientflow-pro' } },
      { name: 'Node.js & Express',                       level: 88, proof: { label: 'book_store repo', href: 'https://github.com/yusufdupsc1/book_store' } },
      { name: 'PHP & Laravel',                           level: 83, proof: { label: 'clientflow-pro', href: 'https://github.com/yusufdupsc1/clientflow-pro' } },
      { name: 'JWT / OAuth2 / Session auth',             level: 87, proof: { label: 'auth repo', href: 'https://github.com/yusufdupsc1/auth' } },
      { name: 'WebSockets & Server-Sent Events',         level: 74 },
    ],
  },
  {
    id: 'data', title: 'Data & Infrastructure', icon: '🗄️', accent: 'emerald',
    skills: [
      { name: 'PostgreSQL - schema design & query optimisation', level: 90, proof: { label: 'ecommerce repo', href: 'https://github.com/yusufdupsc1/ecommerce' } },
      { name: 'Redis - caching & job queues',                    level: 83, proof: { label: 'ecommerce repo', href: 'https://github.com/yusufdupsc1/ecommerce' } },
      { name: 'MongoDB',                                         level: 74 },
      { name: 'Docker & Docker Compose',                         level: 89, proof: { label: 'yusuf-dev CI', href: 'https://github.com/yusufdupsc1/yusuf-dev' } },
      { name: 'AWS - EC2, S3, RDS, Lambda',                      level: 78 },
    ],
  },
  {
    id: 'frontend', title: 'Frontend & Tooling', icon: '🎨', accent: 'amber',
    skills: [
      { name: 'TypeScript & React',          level: 88, proof: { label: 'ecommerce repo', href: 'https://github.com/yusufdupsc1/ecommerce' } },
      { name: 'Next.js',                     level: 85, proof: { label: 'ecommerce repo', href: 'https://github.com/yusufdupsc1/ecommerce' } },
      { name: 'Tailwind CSS',                level: 91, proof: { label: 'yusuf-dev', href: 'https://github.com/yusufdupsc1/yusuf-dev' } },
      { name: 'GitHub Actions / CI/CD',      level: 90, proof: { label: 'workflows', href: 'https://github.com/yusufdupsc1/yusuf-dev/tree/main/.github/workflows' } },
      { name: 'HTML / CSS / Geolocation API',level: 85, proof: { label: 'bd-gps repo', href: 'https://github.com/yusufdupsc1/bd-gps' } },
    ],
  },
];

const ACCENT: Record<AccentKey, {
  bar: string; label: string; ring: string; tab: string; tabActive: string; dot: string;
}> = {
  violet:  { bar: 'from-violet-600 to-violet-400',  label: 'text-violet-400',  ring: 'border-violet-500/25', tab: 'hover:text-violet-400',  tabActive: 'text-violet-400 border-violet-500/50 bg-violet-500/8', dot: 'bg-violet-400' },
  cyan:    { bar: 'from-cyan-600 to-cyan-400',       label: 'text-cyan-400',    ring: 'border-cyan-500/25',   tab: 'hover:text-cyan-400',    tabActive: 'text-cyan-400 border-cyan-500/50 bg-cyan-500/8',       dot: 'bg-cyan-400' },
  emerald: { bar: 'from-emerald-600 to-emerald-400', label: 'text-emerald-400', ring: 'border-emerald-500/25',tab: 'hover:text-emerald-400', tabActive: 'text-emerald-400 border-emerald-500/50 bg-emerald-500/8',dot: 'bg-emerald-400' },
  amber:   { bar: 'from-amber-500 to-amber-300',     label: 'text-amber-400',   ring: 'border-amber-500/25',  tab: 'hover:text-amber-400',   tabActive: 'text-amber-400 border-amber-500/50 bg-amber-500/8',    dot: 'bg-amber-400' },
};

/* ─ Sub-components ────────────────────────────────────────────────────── */
function SkillRow({ skill, accent, animate, delay }: {
  skill: Skill; accent: AccentKey; animate: boolean; delay: number;
}) {
  const a = ACCENT[accent];
  return (
    <div
      className={`skill-card-enter`}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      {/* Row header */}
      <div className="flex items-center gap-2 mb-1.5 min-w-0">
        <span className="text-[13px] text-white/65 flex-1 min-w-0 truncate hidden sm:block">{skill.name}</span>
        <span className="text-[12px] text-white/65 flex-1 min-w-0 truncate sm:hidden">{skill.name.split(' ')[0]}</span>
        <div className="flex items-center gap-2 shrink-0">
          {skill.proof && (
            <a href={skill.proof.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 hover:bg-emerald-500/25 transition-all">
              <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current text-emerald-400" aria-hidden>
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              <span className="text-[10px] font-medium text-emerald-400 whitespace-nowrap">Proof</span>
            </a>
          )}
          <span className={`text-xs font-mono tabular-nums shrink-0 min-w-[40px] text-right ${a.label}`}>{skill.level}%</span>
        </div>
      </div>
      {/* Progress track */}
      <div className="h-[5px] bg-white/[0.06] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${a.bar} transition-all duration-[1100ms] ease-out`}
          style={{ width: animate ? `${skill.level}%` : '0%', transitionDelay: `${delay + 80}ms` }}
        />
      </div>
    </div>
  );
}

/* ─ Main component ────────────────────────────────────────────────────── */
export default function Expertise() {
  const { ref, visible } = useInView();
  const [activeId, setActiveId] = useState<string>('payments');

  const active = CATS.find(c => c.id === activeId)!;
  const a = ACCENT[active.accent];

  return (
    <section
      id="expertise"
      ref={ref}
      className={`py-8 sm:py-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header ── */}
        <div className="mb-8 sm:mb-12 text-center px-2">
          <p className="text-violet-400 font-mono text-xs sm:text-sm mb-2 sm:mb-3 uppercase tracking-widest">Proof Board</p>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            Skills backed by <span className="text-shimmer">shipped code</span>
          </h2>
          <p className="text-white/45 max-w-lg mx-auto text-sm sm:text-[15px] px-4 sm:px-0">
            Every bar links to a real repo or live project. Click any green badge to see the proof.
          </p>
        </div>

        {/* ── Single window card ── */}
        <div className={`rounded-2xl bg-[#0e0e14] border ${a.ring} skill-ring-violet transition-colors duration-500 overflow-hidden`}>

          {/* ── Window title bar ── */}
          <div className="flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-3 bg-[#0a0a12] border-b border-white/[0.06]">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/60" />
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/60" />
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500/60" />
            <span className="flex-1 text-center font-mono text-[10px] sm:text-[11px] text-white/20">skills.proof</span>
            <a
              href="https://github.com/yusufdupsc1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[9px] sm:text-[10px] font-mono text-white/25 hover:text-violet-400 transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
              yusufdupsc1
            </a>
          </div>

          {/* ── Tab bar ── */}
          <div className="flex border-b border-white/[0.06] overflow-x-auto scrollbar-hide">
            {CATS.map(cat => {
              const isActive = cat.id === activeId;
              const ca = ACCENT[cat.accent];
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveId(cat.id)}
                  className={`relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 sm:py-3.5 text-[10px] sm:text-xs font-mono font-medium whitespace-nowrap border-b-2 transition-all duration-200 ${
                    isActive
                      ? `${ca.tabActive} border-current`
                      : `text-white/35 border-transparent hover:text-white/60 ${ca.tab}`
                  }`}
                >
                  <span className="text-sm">{cat.icon}</span>
                  <span className="hidden xs:inline">{cat.title}</span>
                  {isActive && (
                    <span className={`ml-1 w-1.5 h-1.5 rounded-full ${ca.dot}`} />
                  )}
                </button>
              );
            })}
          </div>

          {/* ── Content panel ── */}
          <div className="p-3 sm:p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-8">

              {/* Left - skill bars - centered on mobile */}
              <div className="w-full max-w-2xl mx-auto lg:flex-1 space-y-5">
                {active.skills.map((s, i) => (
                  <SkillRow
                    key={s.name}
                    skill={s}
                    accent={active.accent}
                    animate={visible}
                    delay={i * 80}
                  />
                ))}
              </div>

              {/* Divider */}
              <div className="hidden lg:block w-px bg-white/[0.06]" />

              {/* Right — proof summary panel */}
              <div className="w-full max-w-xl mx-auto lg:max-w-[280px] flex flex-col gap-5">
                {/* Category header */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{active.icon}</span>
                    <h3 className={`font-bold text-sm uppercase tracking-wider font-mono ${a.label}`}>
                      {active.title}
                    </h3>
                  </div>
                  <p className="text-white/40 text-xs leading-relaxed">
                    {active.id === 'payments' && 'Real payment pipelines, SCA/3DS flows, and production webhooks that have processed actual transactions.'}
                    {active.id === 'backend'  && 'Production APIs, CRM systems, and auth flows across Python, Node.js, and PHP ecosystems.'}
                    {active.id === 'data'     && 'Schema design, query tuning, caching strategies, and containerised deployments in production.'}
                    {active.id === 'frontend' && 'TypeScript-first frontends, automated CI/CD, and geolocation tooling - all linked to real repos.'}
                  </p>
                </div>

                {/* Proof links */}
                <div>
                  <p className="text-[10px] font-mono text-white/25 uppercase tracking-widest mb-3">
                    Code evidence
                  </p>
                  <div className="flex flex-col gap-2">
                    {active.skills
                      .filter(s => s.proof)
                      .map(s => s.proof!)
                      .filter((p, i, arr) => arr.findIndex(x => x.href === p.href) === i) // dedupe
                      .map(p => (
                        <a
                          key={p.href}
                          href={p.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.07] hover:border-violet-500/30 hover:bg-violet-500/5 transition-all duration-200 group"
                        >
                          <span className="text-xs font-mono text-white/50 group-hover:text-white/80 transition-colors truncate">
                            {p.label}
                          </span>
                          <svg viewBox="0 0 24 24" className={`w-3.5 h-3.5 fill-none stroke-current shrink-0 ml-2 ${a.label} opacity-0 group-hover:opacity-100 transition-opacity`} strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6m0 0v6m0-6L10 14"/>
                          </svg>
                        </a>
                      ))}
                  </div>
                </div>

                {/* Proof count */}
                <div className="mt-auto pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-[10px] font-mono text-white/25">
                    {active.skills.filter(s => s.proof).length}/{active.skills.length} skills proven
                  </span>
                  <div className="flex gap-1">
                    {active.skills.map((s, i) => (
                      <div
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full transition-colors ${s.proof ? a.dot : 'bg-white/10'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Currently learning ── */}
        <div className="mt-8 p-5 rounded-2xl border border-violet-500/15 bg-violet-500/[0.03] flex flex-wrap items-center gap-4">
          <p className="text-violet-400 font-mono text-xs uppercase tracking-widest shrink-0">🌱 Currently deepening</p>
          <div className="flex flex-wrap gap-2">
            {['AWS Solutions Architect', 'Linux Kernel internals', 'Three.js / WebGL', 'Cybersecurity & Networking'].map(t => (
              <span key={t} className="px-3 py-1.5 rounded-full text-xs border border-violet-500/20 text-violet-300/65 bg-violet-500/5 font-mono">
                {t}
              </span>
            ))}
          </div>
          <div className="ml-auto flex gap-3">
            {[
              { label: 'All repos ↗', href: 'https://github.com/yusufdupsc1?tab=repositories' },
              { label: 'Live demo ↗', href: 'https://stripe-dev.vercel.app' },
            ].map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                 className="text-[11px] font-mono text-white/35 hover:text-violet-400 transition-colors">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
