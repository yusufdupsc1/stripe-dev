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
      className={`py-8 sm:py-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Header - Matching Business Card Style */}
        <div className="text-center mb-10">
          <p className="text-violet-400 font-mono text-xs sm:text-sm mb-2 uppercase tracking-widest">About</p>
          <h2 className="text-3xl sm:text-5xl font-bold text-white">
            YUSUF ALI
          </h2>
          <p className="text-violet-400 text-lg sm:text-xl mt-2">Payments Engineer</p>
          <p className="text-white/50 text-sm mt-1">Rajshahi, Bangladesh</p>
        </div>

        {/* Workflow Icons */}
        <div className="flex items-center justify-center gap-4 sm:gap-8 mb-10 flex-wrap">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#635bff]/20 border border-[#635bff]/40">
            <span className="text-[#635bff] font-bold">◯</span>
            <span className="text-white/80 text-sm">Stripe</span>
          </div>
          <span className="text-white/30">→</span>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500/20 border border-orange-500/40">
            <span className="text-orange-400 text-sm font-bold">3DS</span>
          </div>
          <span className="text-white/30">→</span>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/20 border border-green-500/40">
            <span className="text-green-400 text-sm">Webhook</span>
          </div>
          <span className="text-white/30">→</span>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/20 border border-emerald-500/40">
            <span className="text-emerald-400 text-sm">✓</span>
          </div>
        </div>

        {/* Main Content - Two Columns */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Left Column - Experience */}
          <div>
            <h3 className="text-white/60 text-sm uppercase tracking-wider mb-4">What I Build</h3>
            <ul className="space-y-3">
              {[
                { icon: '💳', text: 'Built robust payment pipelines' },
                { icon: '🔒', text: 'Ensured idempotency & security' },
                { icon: '❌', text: 'Avoided double charges' },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-white/70 text-sm">{item.text}</span>
                </li>
              ))}
            </ul>

            {/* Quote */}
            <div className="mt-6 p-4 rounded-lg bg-violet-500/10 border border-violet-500/30">
              <p className="text-violet-300 text-sm italic">
                "Stripe integration & webhook reliability engineer"
              </p>
            </div>
          </div>

          {/* Right Column - Skills */}
          <div>
            <h3 className="text-white/60 text-sm uppercase tracking-wider mb-4">Tech Stack</h3>
            <ul className="space-y-3">
              {[
                { icon: '🔌', text: 'REST APIs & Scalable PostgreSQL' },
                { icon: '🐍', text: 'Python, Node.js & PHP/Laravel' },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-white/70 text-sm">{item.text}</span>
                </li>
              ))}
            </ul>

            {/* Slogan */}
            <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-violet-500/10 to-cyan-500/10 border border-white/10">
              <p className="text-white/80 text-center font-medium">
                Processing Real Money, Deploying to the Cloud
              </p>
            </div>

            {/* GitHub Link */}
            <a 
              href="https://github.com/yusufdupsc1" 
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 p-3 rounded-lg bg-white/[0.05] border border-white/[0.1] hover:bg-white/[0.08] transition-colors"
            >
              <svg className="w-5 h-5 text-white/70" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.476.003.952.05 1.412.085 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              <span className="text-white/70 text-sm">github.com/yusufdupsc1</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
