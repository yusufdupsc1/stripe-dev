import { useInView } from '../hooks/useInView';

const TIMELINE = [
  { year: '2024–now', title: 'Stripe & Payments Specialist', co: 'ali.Inc · Freelance', desc: 'Building Stripe-native payment flows, webhook handlers, retry logic, and idempotent API integrations for SaaS clients worldwide.' },
  { year: '2022–2024', title: 'Full-Stack Engineer', co: 'Contract / Remote', desc: 'Delivered 40+ production apps with Django REST, Node/Express, and Next.js frontends. Migrated monoliths to Docker + AWS ECS.' },
  { year: '2019–2022', title: 'PHP/Laravel Developer', co: 'Local startups · BD', desc: 'E-commerce and CMS platforms with Laravel. Introduced automated test suites and CI/CD pipelines that cut deploy time by 70%.' },
  { year: '2018', title: 'Started coding', co: 'Self-taught', desc: 'First line of code in PHP. Never stopped.' },
];

export default function About() {
  const { ref, visible } = useInView();
  return (
    <section
      id="about"
      ref={ref}
      className={`py-24 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <p className="text-violet-400 font-mono text-sm mb-3 uppercase tracking-widest">About</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Not just a developer.<br />
              <span className="text-shimmer">A payments engineer.</span>
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Based in Rajshahi, Bangladesh. GitHub bio says:{' '}
                <em className="text-white/80 not-italic font-medium">"stripe integration & webhook reliability engineer"</em>.
                That's not marketing — it's what I do every day.
              </p>
              <p>
                I've built payment pipelines that process real money, handle SCA/3DS flows, survive network failures gracefully, and never double-charge a customer. I understand idempotency keys, Stripe's event model, and webhook signature verification by heart.
              </p>
              <p>
                Beyond payments, I architect clean REST APIs, design PostgreSQL schemas that scale, and containerise workloads for cloud deployment. I work across Python/Django, Node.js/Express, and PHP/Laravel depending on what the job calls for.
              </p>
            </div>

            {/* Values */}
            <div className="grid grid-cols-2 gap-3 mt-8">
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

          {/* Right – timeline */}
          <div>
            <p className="text-violet-400 font-mono text-sm mb-6 uppercase tracking-widest">Journey</p>
            <ol className="relative border-l border-white/[0.08] space-y-8 ml-3">
              {TIMELINE.map((t, i) => (
                <li key={i} className="ml-6">
                  <span className="absolute -left-[9px] flex h-4 w-4 items-center justify-center rounded-full border border-violet-500/50 bg-violet-900/40 ring-4 ring-[#050508]">
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                  </span>
                  <span className="font-mono text-xs text-violet-400/80">{t.year}</span>
                  <h3 className="text-white font-semibold mt-0.5">{t.title}</h3>
                  <p className="text-white/40 text-xs mb-1">{t.co}</p>
                  <p className="text-white/55 text-sm">{t.desc}</p>
                </li>
              ))}
            </ol>

            {/* Numbers */}
            <div className="grid grid-cols-3 gap-4 mt-10">
              {[
                { n: '44+', label: 'Repos' },
                { n: '5+', label: 'Years' },
                { n: '87', label: 'Stars' },
              ].map(s => (
                <div key={s.label} className="text-center p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <p className="text-2xl font-bold text-violet-400 font-mono">{s.n}</p>
                  <p className="text-xs text-white/40 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
