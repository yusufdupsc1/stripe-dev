import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { formatCachedAgo, useGitHubStats } from '../lib/github';
import Shell from './Shell';

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


const DEBUG_CARDS = [
  { icon: '⏱️', title: '6 Hours Debugging SSO', desc: 'Wagtail + Django + Keycloak' },
  { icon: '🐛', title: 'The Bug', desc: 'JWT Audience Mismatch', color: 'red' },
  { icon: '✅', title: 'The Fix', desc: 'Update Keycloak Client → Add Correct Audience', color: 'green' },
  { icon: '💡', title: 'Lesson', desc: 'Always inspect JWT payload before blaming Django', color: 'yellow' },
  { icon: '💳', title: 'ClientFlow Pro', desc: 'Multi-tenant CRM with full Stripe billing', color: 'purple' },
  { icon: '🛡️', title: 'Tenant Isolation', desc: 'Secure role-based access control', color: 'blue' },
  { icon: '📊', title: 'Stripe Webhooks', desc: 'Real-time payment event handling', color: 'purple' },
];

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const leftColumnVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.02 } },
};

const rightItemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { stiffness: 300, damping: 24, delay: 0.2 },
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

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { stats, error } = useGitHubStats();
  const shouldReduce = useReducedMotion() ?? false;

  const reducedItemVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.01 } },
  };

  const activeItemVariants = shouldReduce ? reducedItemVariants : itemVariants;
  const activeRightItemVariants = shouldReduce
    ? { ...reducedItemVariants, visible: { ...reducedItemVariants.visible, transition: { duration: 0.01 } } }
    : rightItemVariants;

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

    const DOTS = Array.from({ length: 38 }, (_, i) => ({
      x: ((i * 37 + 13) % 100) / 100,
      y: ((i * 71 + 29) % 100) / 100,
      vx: ((i % 5) - 2) * 0.000075,
      vy: ((i % 7) - 3) * 0.000075,
      r: 0.6 + ((i * 13 + 7) % 100) / 100 * 1.5,
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

  const cachedLabel = stats ? formatCachedAgo(stats) : undefined;
  const pills = [
    stats ? { n: String(stats.repos),          label: 'Repos',    href: 'https://github.com/yusufdupsc1?tab=repositories', external: true } : null,
    stats ? { n: String(stats.followers),      label: 'Followers',href: 'https://github.com/yusufdupsc1',                      external: true } : null,
    stats ? { n: String(stats.stars),          label: 'Stars',    href: null, external: false } : null,
    stats ? { n: String(stats.contributions),   label: 'Commits',  href: null, external: false } : null,
  ].filter((p): p is NonNullable<typeof p> => p !== null);

  return (
    <motion.section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >

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

        <motion.div
          className="grid lg:grid-cols-[1fr_420px] gap-14 items-center"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-5%' }}
        >

          {/* ── LEFT COLUMN ── */}
          <motion.div className="space-y-8" variants={leftColumnVariants}>
            <motion.div variants={activeItemVariants} className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-violet-500/25 bg-violet-500/8 text-violet-300 text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="status-pulse absolute inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              Available for work · Rajshahi, Bangladesh 🇧🇩
            </motion.div>


            <motion.div variants={activeItemVariants} className="w-full">
              <p className="text-white/60 font-mono text-xs tracking-[.25em] uppercase mb-3">
                KEYCLOAK SSO FIXED!
              </p>
              <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 px-1 snap-x scrollbar-hide">
                {DEBUG_CARDS.map((card, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-32 sm:w-44 p-2.5 sm:p-3 rounded-lg bg-gradient-to-br from-violet-500/10 to-cyan-500/10 border border-violet-500/20 snap-start hover:border-violet-400/40 transition-all"
                  >
                    <div className="text-xl sm:text-2xl mb-1.5">{card.icon}</div>
                    <h3 className="text-[9px] sm:text-[10px] font-bold text-violet-300 tracking-wider">{card.title}</h3>
                    <p className="text-[8px] sm:text-[9px] text-white/50 mt-1 leading-tight">{card.desc}</p>
                  </div>
                ))}
              </div>
              <a
                href="https://github.com/yusufdupsc1/wagtail-keycloak-sso-lab"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 px-3 py-2.5 rounded-lg text-xs text-cyan-400 hover:text-cyan-300 transition-colors min-h-[44px]"
              >
                <span className="text-xs sm:text-sm">github.com/yusufdupsc1/sso-platform</span>
                <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
            </motion.div>

            <motion.div variants={activeItemVariants}>
              <p className="text-xl sm:text-2xl text-white/55 font-mono min-h-[2rem] flex items-center">
                <span className="text-cyan-400 mr-2 select-none">›</span>
                {displayed}<span className="cursor" aria-hidden />
              </p>
            </motion.div>


            <motion.p variants={activeItemVariants} className="text-white/50 text-base sm:text-lg leading-relaxed max-w-xl">
              I engineer <strong className="text-white/85 font-semibold">production-grade APIs</strong>,
              battle-tested{' '}
              <strong className="text-violet-400 font-semibold">Stripe payment flows</strong>, and{' '}
              <strong className="text-white/85 font-semibold">webhook pipelines</strong>{' '}
              that handle real money — reliably, every time.
            </motion.p>

            <motion.div variants={activeItemVariants} className="flex flex-wrap gap-3">
              {pills.length === 0 && !error ? (
                <span className="text-white/25 text-xs font-mono animate-pulse">loading stats…</span>
              ) : null}
              {pills.map((s) => {
                const label = cachedLabel ? `cached ${cachedLabel}` : undefined;
                if (s.external && s.href) {
                  return (
                    <motion.a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={activeItemVariants}
                      className="group relative flex flex-col items-center px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.07] hover:border-violet-500/35 hover:bg-violet-500/6 transition-all duration-200"
                      title={label}
                    >
                      <span className="font-bold text-violet-400 font-mono text-lg leading-none">{s.n}</span>
                      <span className="text-white/40 text-xs">{s.label}</span>
                      {cachedLabel && (
                        <span className="absolute -top-2 -right-2 h-2 w-2 rounded-full bg-white/[0.06]" />
                      )}
                    </motion.a>
                  );
                }
                return (
                  <div
                    key={s.label}
                    className="group relative flex flex-col items-center px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.07] transition-all duration-200"
                    title={label}
                  >
                    <span className="font-bold text-violet-400 font-mono text-lg leading-none">{s.n}</span>
                    <span className="text-white/40 text-xs">{s.label}</span>
                    {cachedLabel && (
                      <span className="absolute -top-2 -right-2 h-2 w-2 rounded-full bg-white/[0.06]" />
                    )}
                  </div>
                );
              })}
            </motion.div>

            <motion.div variants={activeItemVariants} className="flex flex-wrap gap-3 pt-1">
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
                className="px-7 py-3.5 rounded-xl border border-white/[0.07] hover:border-white/15 text-white/65 hover:text-white/75 font-semibold text-sm transition-all duration-200 active:scale-95"
              >
                Hire me →
              </a>
            </motion.div>

            <motion.div variants={activeItemVariants} className="flex items-center gap-5 pt-4 border-t border-white/[0.06]">
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
            </motion.div>
          </motion.div>

          {/* ── RIGHT COLUMN — Shell ── */}
          <motion.div variants={activeRightItemVariants} className="hidden lg:block">
            <Shell />
          </motion.div>
        </motion.div>

        {/* ── Marquee tech strip ── */}
        <motion.div
          className="mt-20 overflow-hidden border-t border-white/[0.05] pt-8"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
        >
          <motion.p variants={activeItemVariants} className="text-center text-[11px] font-mono text-white/20 uppercase tracking-widest mb-5">
            Tech I work with daily
          </motion.p>
          <div className="relative overflow-hidden">
            <div className="absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-[#050508] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-[#050508] to-transparent z-10 pointer-events-none" />
            <motion.div
              className="marquee-track animate-marquee gap-3"
              variants={shouldReduce ? {} : { visible: { transition: { staggerChildren: 0.02 } } }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-5%' }}
            >
              {[...TECH_MARQUEE, ...TECH_MARQUEE].map((t, i) => (
                <motion.span
                  key={i}
                  variants={activeItemVariants}
                   className="mx-1.5 px-4 py-1.5 rounded-full text-xs font-mono bg-white/[0.04] border border-white/[0.07] text-white/65 whitespace-nowrap"
                >
                  {t}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>

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
    </motion.section>
  );
}
