import { motion } from 'framer-motion';
import { useGitHubStats } from '../lib/github';
import { TIMELINE } from '../data/profile';
import StatusWidget from './StatusWidget';

const ACCENT: Record<string, { bar: string; label: string; dot: string }> = {
  violet:  { bar: 'from-violet-600 to-violet-400',  label: 'text-violet-400',  dot: 'bg-violet-400' },
  cyan:    { bar: 'from-cyan-600 to-cyan-400',       label: 'text-cyan-400',    dot: 'bg-cyan-400' },
  emerald: { bar: 'from-emerald-600 to-emerald-400', label: 'text-emerald-400', dot: 'bg-emerald-400' },
  amber:   { bar: 'from-amber-500 to-amber-300',     label: 'text-amber-400',   dot: 'bg-amber-400' },
};

const CATS = [
  { id: 'payments', title: 'Payments & Webhooks', icon: '💳', accent: 'violet', skills: [
    { name: 'Stripe API - PaymentIntents, Checkout, Connect', level: 95 },
    { name: 'Webhook signature verification & retry queues',  level: 95 },
    { name: 'Idempotency keys & error recovery',              level: 92 },
    { name: 'REST API design - OpenAPI / Swagger',            level: 91 },
    { name: 'GraphQL API design',                             level: 76 },
  ]},
  { id: 'backend', title: 'Backend Engineering', icon: '⚙️', accent: 'cyan', skills: [
    { name: 'Python & Django / Django REST Framework', level: 90 },
    { name: 'Node.js & Express',                       level: 88 },
    { name: 'PHP & Laravel',                           level: 83 },
    { name: 'JWT / OAuth2 / Session auth',             level: 87 },
    { name: 'WebSockets & Server-Sent Events',         level: 74 },
  ]},
  { id: 'data', title: 'Data & Infrastructure', icon: '🗄️', accent: 'emerald', skills: [
    { name: 'PostgreSQL - schema design & query optimisation', level: 90 },
    { name: 'Redis - caching & job queues',                    level: 83 },
    { name: 'MongoDB',                                         level: 74 },
    { name: 'Docker & Docker Compose',                         level: 89 },
    { name: 'AWS - EC2, S3, RDS, Lambda',                      level: 78 },
  ]},
  { id: 'frontend', title: 'Frontend & Tooling', icon: '🎨', accent: 'amber', skills: [
    { name: 'TypeScript & React',          level: 88 },
    { name: 'Next.js',                     level: 85 },
    { name: 'Tailwind CSS',                level: 91 },
    { name: 'GitHub Actions / CI/CD',      level: 90 },
    { name: 'HTML / CSS / Geolocation API',level: 85 },
  ]},
];

function SkillBar({ name, level, accent, delay }: { name: string; level: number; accent: string; delay: number; }) {
  const rowDelay = delay / 1000 + 0.08;
  const a = ACCENT[accent];
  return (
    <motion.div
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: rowDelay, duration: 0.01 } } }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-5%' }}
    >
      <div className="flex items-center justify-between gap-2 mb-1.5 min-w-0">
        <span className="text-xs text-white/65 truncate">{name}</span>
        <span className={`text-xs font-mono tabular-nums shrink-0 ${a.label}`}>{level}%</span>
      </div>
      <div className="h-[5px] bg-white/[0.06] rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${a.bar}`}
          variants={{ hidden: { width: '0%' }, visible: { width: `${level}%`, transition: { duration: 1.1, ease: 'easeOut', delay: rowDelay } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-5%' }}
        />
      </div>
    </motion.div>
  );
}

export default function AboutExpertise() {
  const { stats } = useGitHubStats();

  return (
    <section id="about-expertise" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bento-wrapper">
          <div className="bento-grid">
          <div className="bento-area about-headline">
            <p className="text-violet-400 font-mono text-sm mb-3 uppercase tracking-widest">About</p>
            <h2 className="text-3xl font-bold text-white mb-6 leading-tight">
              Not just a developer.<br />
              <span className="text-shimmer">A payments engineer.</span>
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed max-w-measure">
              <p>
                I'm Yusuf — based in Rajshahi, Bangladesh. My GitHub bio says it plainly:{' '}
                <em className="text-white/80 not-italic font-medium">"stripe integration & webhook reliability engineer"</em>.
              </p>
              <p>
                I've built payment pipelines that process real money, handle SCA/3DS flows, survive network failures gracefully, and never double-charge a customer. I understand idempotency keys, Stripe's event model, and webhook signature verification by heart.
              </p>
              <p>
                Beyond payments, I architect clean REST APIs, design PostgreSQL schemas that scale, and containerise workloads for cloud deployment. I work across Python/Django, Node.js/Express, and PHP/Laravel depending on what the job calls for.
              </p>
            </div>
          </div>

          <div className="bento-area about-values">
            <p className="text-violet-400 font-mono text-xs uppercase tracking-widest mb-3">Values</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: '🔒', label: 'Idempotent APIs' },
                { icon: '⚡', label: 'Webhook reliability' },
                { icon: '🧪', label: 'Test-first dev' },
                { icon: '📦', label: 'Docker & CI/CD' },
              ].map(v => (
                <div key={v.label} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                  <span>{v.icon}</span>
                  <span className="text-sm text-white/70 font-medium">{v.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bento-area journey">
            <p className="text-violet-400 font-mono text-xs uppercase tracking-widest mb-4">Journey</p>
            <ol className="relative border-l border-white/[0.08] space-y-6 ml-2">
              {TIMELINE.map((t, i) => (
                <li key={i} className="ml-4">
                  <span className="absolute -left-[9px] flex h-4 w-4 items-center justify-center rounded-full border border-violet-500/50 bg-violet-900/40 ring-4 ring-[var(--c-neutral-950)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                  </span>
                  <span className="font-mono text-xs text-violet-400/80">{t.year}</span>
                   <h3 className="text-2xl text-white font-semibold mt-0.5">{t.title}</h3>
                   <p className="text-white/60 text-xs mb-1">{t.co}</p>
                  <p className="text-white/55 text-sm">{t.desc}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="bento-area about-metrics">
            <p className="text-violet-400 font-mono text-xs uppercase tracking-widest mb-3">Impact</p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { n: stats ? `${stats.repos}+` : '—', label: 'Repos' },
                { n: stats ? `${stats.followers}` : '—', label: 'Followers' },
                { n: stats ? `${stats.stars}` : '—', label: 'Stars' },
              ].map(s => (
                <div key={s.label} className="text-center p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <p className="text-xl font-bold text-violet-400 font-mono">{s.n}</p>
                   <p className="text-2xs text-white/60 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {CATS.map(cat => (
            <div key={cat.id} className={`bento-area bento-category bento-${cat.id}`}>
              <div className="rounded-2xl bg-[var(--c-neutral-900)] border border-white/[0.07] p-4 sm:p-5 h-full">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">{cat.icon}</span>
                  <h3 className={`font-bold text-xl uppercase tracking-wider font-mono ${ACCENT[cat.accent].label}`}>{cat.title}</h3>
                </div>
                <div className="space-y-4">
                  {cat.skills.map((s, i) => (
                    <SkillBar key={s.name} name={s.name} level={s.level} accent={cat.accent} delay={i * 80} />
                  ))}
                </div>
              </div>
            </div>
          ))}

          <div className="bento-area proof">
            <div className="rounded-2xl bg-[var(--c-neutral-900)] border border-white/[0.07] p-4 sm:p-5 h-full">
              <p className="text-2xs font-mono text-white/55 uppercase tracking-widest mb-3">Code evidence</p>
              <div className="space-y-2">
                <a href="https://stripe-dev.vercel.app" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-3 py-3 rounded-xl bg-white/[0.03] border border-white/[0.07] hover:border-violet-500/30 interact-card min-h-[44px] min-w-[44px]">
                  <span className="text-xs font-mono text-white/50">stripe-dev.vercel.app</span>
                  <span className="text-violet-400 text-xs">↗</span>
                </a>
                <a href="https://github.com/yusufdupsc1/ecommerce" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-3 py-3 rounded-xl bg-white/[0.03] border border-white/[0.07] hover:border-violet-500/30 interact-card min-h-[44px] min-w-[44px]">
                  <span className="text-xs font-mono text-white/50">ecommerce repo</span>
                  <span className="text-violet-400 text-xs">↗</span>
                </a>
                <a href="https://github.com/yusufdupsc1/book_store" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-3 py-3 rounded-xl bg-white/[0.03] border border-white/[0.07] hover:border-violet-500/30 interact-card min-h-[44px] min-w-[44px]">
                  <span className="text-xs font-mono text-white/50">book_store repo</span>
                  <span className="text-violet-400 text-xs">↗</span>
                </a>
              </div>
              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-2xs font-mono text-white/55">9/20 skills proven</span>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < 3 ? 'bg-violet-400' : 'bg-white/10'}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* status widget */}
          <div className="bento-area status-widget">
            <div className="rounded-2xl border border-dashed border-white/[0.08] h-full flex items-center justify-center">
              <StatusWidget />
            </div>
          </div>

          <div className="bento-area learning">
            <div className="rounded-2xl border border-violet-500/15 bg-violet-500/[0.03] p-4 sm:p-5 h-full">
              <p className="text-violet-400 font-mono text-xs uppercase tracking-widest mb-3">🌱 Currently deepening</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {['AWS Solutions Architect', 'Linux Kernel internals', 'Three.js / WebGL', 'Cybersecurity & Networking'].map(t => (
                  <span key={t} className="px-3 py-1.5 rounded-full text-xs border border-violet-500/20 text-violet-300/65 bg-violet-500/5 font-mono">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                 <a href="https://github.com/yusufdupsc1?tab=repositories" target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-md text-2xs font-mono text-white/60 hover:text-violet-400 interact-link min-h-[44px] inline-flex items-center">All repos ↗</a>
                 <a href="https://stripe-dev.vercel.app" target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-md text-2xs font-mono text-white/60 hover:text-violet-400 interact-link min-h-[44px] inline-flex items-center">Live demo ↗</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
}