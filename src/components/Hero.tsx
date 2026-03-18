import { useEffect, useRef, useState } from 'react';

const ROLES = [
  'Backend Engineer',
  'Stripe Integration Expert',
  'Webhook Reliability Engineer',
  'API Architect',
  'Cloud-Native Builder',
];

const TECH_MARQUEE = [
  'Python', 'Django', 'Node.js', 'TypeScript', 'PHP', 'Laravel',
  'PostgreSQL', 'Redis', 'Docker', 'AWS', 'Next.js', 'REST APIs',
  'Stripe', 'Webhooks', 'CI/CD', 'Linux', 'GraphQL', 'JWT',
];

// GitHub-style contribution-like activity grid (decorative)
const ACTIVITY = Array.from({ length: 52 * 7 }, () =>
  Math.random() < 0.35 ? (Math.random() < 0.4 ? 3 : Math.random() < 0.6 ? 2 : 1) : 0
);

const STAT_PILLS = [
  { n: '45', label: 'Repos', href: 'https://github.com/yusufdupsc1?tab=repositories' },
  { n: '4', label: 'Followers', href: 'https://github.com/yusufdupsc1' },
  { n: '5+', label: 'Yrs exp', href: null },
  { n: '8', label: 'Live apps', href: 'https://stripe-dev.vercel.app' },
];

// SSO Debug Carousel Cards - Infinite Animated Carousel
const DEBUG_CARDS = [
  { icon: '⏱️', title: '6 Hours Debugging SSO', desc: 'Wagtail + Django + Keycloak' },
  { icon: '🐛', title: 'The Bug', desc: 'JWT Audience Mismatch', color: 'red' },
  { icon: '✅', title: 'The Fix', desc: 'Update Keycloak Client → Add Correct Audience', color: 'green' },
  { icon: '💡', title: 'Lesson', desc: 'Always inspect JWT payload before blaming Django', color: 'yellow' },
  { icon: '💳', title: 'ClientFlow Pro', desc: 'Multi-tenant CRM with full Stripe billing', color: 'purple' },
  { icon: '🛡️', title: 'Tenant Isolation', desc: 'Secure role-based access control', color: 'blue' },
  { icon: '📊', title: 'Stripe Webhooks', desc: 'Real-time payment event handling', color: 'purple' },
];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mount guard for stagger animations
  useEffect(() => { setTimeout(() => setMounted(true), 60); }, []);

  // Typewriter
  useEffect(() => {
    const current = ROLES[roleIdx];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < current.length)
      t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
    else if (!deleting && displayed.length === current.length)
      t = setTimeout(() => setDeleting(true), 2100);
    else if (deleting && displayed.length > 0)
      t = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 32);
    else { setDeleting(false); setRoleIdx(i => (i + 1) % ROLES.length); }
    return () => clearTimeout(t);
  }, [displayed, deleting, roleIdx]);

  // Particle canvas — floating dots connected by lines
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let raf: number;
    let W = 0, H = 0;

    const DOTS = Array.from({ length: 38 }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - .5) * .0003,
      vy: (Math.random() - .5) * .0003,
      r: Math.random() * 1.5 + .6,
    }));

    const resize = () => {
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      canvas.width = W * devicePixelRatio;
      canvas.height = H * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      DOTS.forEach(d => {
        d.x = (d.x + d.vx + 1) % 1;
        d.y = (d.y + d.vy + 1) % 1;
      });
      // Lines
      for (let i = 0; i < DOTS.length; i++) {
        for (let j = i + 1; j < DOTS.length; j++) {
          const dx = (DOTS[i].x - DOTS[j].x) * W;
          const dy = (DOTS[i].y - DOTS[j].y) * H;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(124,58,237,${.18 * (1 - dist / 120)})`;
            ctx.lineWidth = .6;
            ctx.moveTo(DOTS[i].x * W, DOTS[i].y * H);
            ctx.lineTo(DOTS[j].x * W, DOTS[j].y * H);
            ctx.stroke();
          }
        }
      }
      // Dots
      DOTS.forEach(d => {
        ctx.beginPath();
        ctx.arc(d.x * W, d.y * H, d.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(124,58,237,.45)';
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  const delay = (n: number) => ({ animationDelay: `${n}ms`, opacity: mounted ? undefined : 0 });

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden">

      {/* ── Particle canvas bg ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden
      />

      {/* ── Grid overlay ── */}
      <div className="absolute inset-0 hero-grid opacity-100 pointer-events-none" aria-hidden />

      {/* ── Blob glows ── */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] blob-violet rounded-full pointer-events-none" aria-hidden />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] blob-cyan rounded-full pointer-events-none" aria-hidden />

      {/* ── Top gradient line ── */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-6 sm:pb-8 w-full overflow-x-hidden">

        {/* ════ Main two-column layout ════ */}
        <div className="grid lg:grid-cols-[1fr_420px] gap-8 lg:gap-14 items-center">

          {/* ── LEFT COLUMN ── */}
          <div className="space-y-6 sm:space-y-8">

            {/* Status badge — animated */}
            <div
              className="animate-fade-up inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-violet-500/25 bg-violet-500/8 text-violet-300 text-xs font-mono"
              style={delay(0)}
            >
              <span className="relative flex h-2 w-2">
                <span className="status-pulse absolute inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              Available for work · Rajshahi, Bangladesh 🇧🇩
            </div>

            {/* ── Infinite Animated Carousel ── */}
            <div className="animate-fade-up w-full overflow-hidden" style={delay(80)}>
              <p className="text-white/30 font-mono text-xs tracking-[.25em] uppercase mb-3">
                KEYCLOAK SSO FIXED!
              </p>
              {/* Infinite scrolling carousel */}
              <div className="relative flex gap-3 overflow-x-hidden py-2">
                <div className="flex animate-scroll gap-3 min-w-full">
                  {[...DEBUG_CARDS, ...DEBUG_CARDS, ...DEBUG_CARDS].map((card, i) => (
                    <div 
                      key={i}
                      className={`flex-shrink-0 w-40 sm:w-48 p-3 rounded-xl border backdrop-blur-sm transition-all hover:scale-105 ${
                        card.color === 'red' ? 'bg-red-500/10 border-red-500/30' :
                        card.color === 'green' ? 'bg-green-500/10 border-green-500/30' :
                        card.color === 'yellow' ? 'bg-yellow-500/10 border-yellow-500/30' :
                        card.color === 'purple' ? 'bg-purple-500/15 border-purple-500/40' :
                        card.color === 'blue' ? 'bg-blue-500/15 border-blue-500/40' :
                        'bg-gradient-to-br from-violet-500/10 to-cyan-500/10 border-violet-500/20'
                      }`}
                    >
                      <div className="text-xl mb-1.5">{card.icon}</div>
                      <h3 className="text-[10px] font-bold text-white tracking-wider">{card.title}</h3>
                      <p className="text-[9px] text-white/60 mt-1 leading-tight">{card.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <a 
                href="https://github.com/yusufdupsc1/clientflow-pro"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <span className="text-xs sm:text-sm">github.com/yusufdupsc1/sso-platform</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
            </div>

            {/* ── Typewriter ── */}
            <div className="animate-fade-up" style={delay(160)}>
              <p className="text-xl sm:text-2xl text-white/55 font-mono min-h-[2rem] flex items-center">
                <span className="text-cyan-400 mr-2 select-none">›</span>
                {displayed}<span className="cursor" aria-hidden />
              </p>
            </div>

            {/* ── Pitch copy ── */}
            <p
              className="animate-fade-up text-white/50 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl"
              style={delay(220)}
            >
              I engineer production-grade APIs, battle-tested Stripe payment flows, and webhook pipelines that handle real money — reliably, every time.
            </p>

            {/* ── Stat pills ── */}
            <div className="animate-fade-up flex flex-wrap gap-2 sm:gap-3" style={delay(280)}>
              {STAT_PILLS.map((s, i) => {
                const inner = (
                  <>
                    <span className="font-bold text-violet-400 font-mono text-base sm:text-lg leading-none">{s.n}</span>
                    <span className="text-white/40 text-[10px] sm:text-xs">{s.label}</span>
                  </>
                );
                return s.href ? (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.07] hover:border-violet-500/35 hover:bg-violet-500/6 transition-all duration-200 animate-fade-up min-w-[70px] sm:min-w-auto"
                    style={{ animationDelay: `${300 + i * 50}ms` }}
                  >
                    {inner}
                  </a>
                ) : (
                  <div
                    key={s.label}
                    className="flex flex-col items-center px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.07] animate-fade-up"
                    style={{ animationDelay: `${300 + i * 50}ms` }}
                  >
                    {inner}
                  </div>
                );
              })}
            </div>

            {/* ── CTA buttons ── */}
            <div className="animate-fade-up flex flex-wrap gap-3 pt-1" style={delay(380)}>
              <a
                href="#projects"
                onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="group relative px-7 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-all duration-200 hover:shadow-xl hover:shadow-violet-500/30 active:scale-95 overflow-hidden"
              >
                <span className="relative z-10">View Projects</span>
                <span className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
              <a
                href="https://stripe-dev.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-xl border border-violet-500/30 hover:border-violet-400/60 text-violet-400/80 hover:text-violet-300 font-semibold text-sm transition-all duration-200 active:scale-95"
              >
                Live Demo ↗
              </a>
              <a
                href="#contact"
                onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="px-7 py-3.5 rounded-xl border border-white/[0.07] hover:border-white/15 text-white/45 hover:text-white/75 font-semibold text-sm transition-all duration-200 active:scale-95"
              >
                Hire me →
              </a>
            </div>

            {/* ── Social links ── */}
            <div className="animate-fade-up flex items-center gap-5 pt-4 border-t border-white/[0.06]" style={delay(440)}>
              <span className="text-white/25 text-[11px] font-mono">find me</span>
              {[
                { href: 'https://github.com/yusufdupsc1',               label: 'GitHub',    d: 'M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z' },
                { href: 'https://linkedin.com/in/yusuf-ali-backend-engineer', label: 'LinkedIn', d: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z' },
                { href: 'https://twitter.com/EsrafilSaikot',              label: 'Twitter/X', d: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
                { href: 'https://dev.to/yusufdupsc1',                    label: 'Dev.to',    d: 'M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-2.2 0-1.91-.02-1.96-.29-2.18zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.32 2.57.05 2.23-.02 2.73-.47 3.3zm5.09-5.47h-2.47v1.77h1.52v1.28l-.72.04-.75.03v1.77l1.22.03 1.2.04v1.28h-1.6c-1.53 0-1.6-.01-1.87-.3l-.3-.28v-3.16c0-3.02.01-3.18.25-3.48.23-.31.25-.31 1.88-.31h1.64v1.29zm4.68 5.45c-.17.43-.64.79-1 .79-.18 0-.45-.15-.67-.39-.32-.32-.45-.63-.82-2.08l-.9-3.39-.45-1.67h.76c.4 0 .75.02.75.05 0 .06 1.16 4.54 1.26 4.83.04.15.32-.7.73-2.3l.66-2.52.74-.04c.4-.02.73 0 .73.04 0 .14-1.67 6.38-1.8 6.68z' },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-white/25 hover:text-violet-400 transition-colors duration-200"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d={s.d} /></svg>
                </a>
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN — Terminal card ── */}
          <div className="animate-fade-up hidden lg:block" style={delay(200)}>
            <div className="glow-card">
              <div className="rounded-2xl overflow-hidden bg-[#0a0a14] border border-white/[0.08] shadow-2xl shadow-black/70 scanline">

                {/* Title bar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-[#0e0e1a] border-b border-white/[0.06]">
                  <span className="w-3 h-3 rounded-full bg-red-500/65" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/65" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/65" />
                  <span className="flex-1 text-center font-mono text-xs text-white/20">profile.ts</span>
                  <span className="text-[10px] font-mono text-violet-400/50 border border-violet-500/20 px-1.5 py-0.5 rounded">TS</span>
                </div>

                {/* Code */}
                <div className="p-5 font-mono text-[12.5px] leading-[1.85] overflow-x-auto">
                  <pre className="text-white/75 whitespace-pre">
<span className="text-violet-400">const</span> <span className="text-cyan-300">engineer</span> <span className="text-white/30">=</span> {'{'}{'\n'}
{'  '}<span className="text-white/40">name:</span>      <span className="text-emerald-400">"Yusuf Ali"</span>,{'\n'}
{'  '}<span className="text-white/40">role:</span>      <span className="text-emerald-400">"Backend + Payments"</span>,{'\n'}
{'  '}<span className="text-white/40">base:</span>      <span className="text-emerald-400">"Rajshahi, BD 🇧🇩"</span>,{'\n'}
{'\n'}
{'  '}<span className="text-violet-400">stack:</span> {'['}{'\n'}
{'    '}<span className="text-emerald-400">"Python"</span><span className="text-white/25">,</span> <span className="text-emerald-400">"Django"</span><span className="text-white/25">,</span>{'\n'}
{'    '}<span className="text-emerald-400">"Node.js"</span><span className="text-white/25">,</span> <span className="text-emerald-400">"PHP/Laravel"</span><span className="text-white/25">,</span>{'\n'}
{'    '}<span className="text-emerald-400">"PostgreSQL"</span><span className="text-white/25">,</span> <span className="text-emerald-400">"Redis"</span><span className="text-white/25">,</span>{'\n'}
{'    '}<span className="text-emerald-400">"Docker"</span><span className="text-white/25">,</span> <span className="text-emerald-400">"AWS"</span><span className="text-white/25">,</span>{'\n'}
{'  '}{']'}<span className="text-white/25">,</span>{'\n'}
{'\n'}
{'  '}<span className="text-violet-400">proof:</span> {'{'}{'\n'}
{'    '}<span className="text-white/40">live:</span>  <span className="text-emerald-400">"stripe-dev.vercel.app"</span><span className="text-white/25">,</span>{'\n'}
{'    '}<span className="text-white/40">repos:</span> <span className="text-cyan-300">44</span><span className="text-white/25">, </span><span className="text-white/40">stars:</span> <span className="text-cyan-300">87</span><span className="text-white/25">,</span>{'\n'}
{'  '}{'}'}<span className="text-white/25">,</span>{'\n'}
{'\n'}
{'  '}<span className="text-violet-400">superpower:</span>{'\n'}
{'    '}<span className="text-emerald-400">"Stripe + webhooks 🔒"</span><span className="text-white/25">,</span>{'\n'}
{'}'}<span className="cursor" aria-hidden />
                  </pre>
                </div>

                {/* Bottom activity strip — GitHub-contribution-style mini heatmap */}
                <div className="px-5 pb-4 border-t border-white/[0.05] pt-3">
                  <p className="text-[10px] font-mono text-white/20 mb-2">contribution activity</p>
                  <div
                    className="grid gap-[2px]"
                    style={{ gridTemplateColumns: 'repeat(52,1fr)', gridTemplateRows: 'repeat(7,6px)' }}
                    aria-hidden
                  >
                    {ACTIVITY.map((v, i) => (
                      <div
                        key={i}
                        className="rounded-[1px]"
                        style={{
                          background: v === 0
                            ? 'rgba(255,255,255,0.05)'
                            : v === 1
                            ? 'rgba(124,58,237,.3)'
                            : v === 2
                            ? 'rgba(124,58,237,.6)'
                            : 'rgba(124,58,237,.9)',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating tech pill badges under terminal */}
            <div className="flex flex-wrap gap-2 mt-4">
              {[
                { t: 'Stripe API',  href: 'https://stripe-dev.vercel.app' },
                { t: 'Webhooks',    href: 'https://github.com/yusufdupsc1/ecommerce' },
                { t: 'REST',        href: 'https://github.com/yusufdupsc1/book_store' },
                { t: 'PostgreSQL',  href: 'https://github.com/yusufdupsc1/ecommerce' },
                { t: 'Docker',      href: 'https://github.com/yusufdupsc1/yusuf-dev' },
                { t: 'CI/CD',       href: 'https://github.com/yusufdupsc1/yusuf-dev/tree/main/.github/workflows' },
                { t: 'AWS',         href: null },
                { t: 'Redis',       href: 'https://github.com/yusufdupsc1/ecommerce' },
              ].map(b =>
                b.href ? (
                  <a key={b.t} href={b.href} target="_blank" rel="noopener noreferrer"
                     className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/[0.04] border border-white/[0.07] text-white/40 hover:text-violet-400 hover:border-violet-500/35 hover:bg-violet-500/5 transition-all duration-200">
                    {b.t} ↗
                  </a>
                ) : (
                  <span key={b.t} className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/[0.04] border border-white/[0.07] text-white/30 cursor-default">
                    {b.t}
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        {/* ── Marquee tech strip ── */}
        <div className="mt-20 overflow-hidden border-t border-white/[0.05] pt-8">
          <p className="text-center text-[11px] font-mono text-white/20 uppercase tracking-widest mb-5">Tech I work with daily</p>
          <div className="relative overflow-hidden">
            <div className="absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-[#050508] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-[#050508] to-transparent z-10 pointer-events-none" />
            <div className="marquee-track animate-marquee gap-3">
              {[...TECH_MARQUEE, ...TECH_MARQUEE].map((t, i) => (
                <span
                  key={i}
                  className="mx-1.5 px-4 py-1.5 rounded-full text-xs font-mono bg-white/[0.04] border border-white/[0.07] text-white/45 whitespace-nowrap"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hidden lg:flex justify-center mt-10">
          <div className="flex flex-col items-center gap-1.5 text-white/20">
            <span className="text-[10px] font-mono uppercase tracking-widest">scroll</span>
            <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
