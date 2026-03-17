import { useCallback, useEffect, useState } from 'react';

const NAV = [
  { id: 'home',      label: 'Home',     icon: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10' },
  { id: 'about',     label: 'About',    icon: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z' },
  { id: 'expertise', label: 'Skills',   icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { id: 'projects',  label: 'Work',     icon: 'M3 7h18M3 12h18M3 17h18' },
  { id: 'contact',   label: 'Hire',     icon: 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]     = useState('home');
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);
        const sections = NAV.map(n => document.getElementById(n.id));
        for (let i = sections.length - 1; i >= 0; i--) {
          const el = sections[i];
          if (el && el.getBoundingClientRect().top <= 120) { setActive(NAV[i].id); break; }
        }
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = useCallback((id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      {/* ── Desktop / top bar ── */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 safe-top ${scrolled ? 'py-3' : 'py-5'}`}
        aria-label="Main navigation"
      >
        <div className={`absolute inset-0 transition-all duration-500 ${scrolled ? 'bg-[#050508]/92 backdrop-blur-xl border-b border-white/[0.06]' : ''}`} />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo - Terminal Style */}
          <button
            onClick={() => scrollTo('home')}
            className="flex items-center gap-2.5 group focus-visible:outline-none"
            aria-label="Go to top"
          >
            <div className="w-8 h-8 rounded-lg bg-[#0d0d12] border border-violet-500/40 flex items-center justify-center overflow-hidden shadow-lg shadow-violet-500/20">
              <div className="flex flex-col items-center gap-0.5">
                <span className="text-[6px] text-emerald-400 font-mono leading-none">▸</span>
                <span className="text-[5px] text-cyan-400 font-mono leading-none">_</span>
              </div>
            </div>
            <span className="font-semibold text-white/90 group-hover:text-white transition-colors hidden sm:block">
              yusuf<span className="text-violet-400">.dev</span>
            </span>
          </button>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {NAV.map(({ id, label }) => (
              <li key={id}>
                <button
                  onClick={() => scrollTo(id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    active === id
                      ? 'bg-violet-600/20 text-violet-300'
                      : 'text-white/50 hover:text-white/90 hover:bg-white/[0.05]'
                  }`}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://github.com/yusufdupsc1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white/80 transition-colors"
              aria-label="GitHub"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
            </a>
            <button
              onClick={() => scrollTo('contact')}
              className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-violet-500/30 active:scale-95"
            >
              Hire Me
            </button>
          </div>

          {/* Burger */}
          <button
            className="md:hidden p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/[0.06] transition-all"
            onClick={() => setOpen(v => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              {open
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {/* Mobile dropdown */}
        <div className={`md:hidden absolute top-full inset-x-0 transition-all duration-300 origin-top ${open ? 'scale-y-100 opacity-100 pointer-events-auto' : 'scale-y-95 opacity-0 pointer-events-none'}`}>
          <div className="mx-4 my-2 rounded-xl bg-[#0e0e14]/95 backdrop-blur-xl border border-white/[0.08] overflow-hidden">
            {NAV.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`w-full text-left px-5 py-3.5 text-sm font-medium transition-colors border-b border-white/[0.05] last:border-0 ${
                  active === id ? 'text-violet-400 bg-violet-600/10' : 'text-white/70 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {label}
              </button>
            ))}
            <div className="p-4 flex gap-3">
              <a
                href="https://github.com/yusufdupsc1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 rounded-lg border border-white/10 text-white/60 hover:text-white text-center text-sm font-medium transition-colors"
              >
                GitHub
              </a>
              <button
                onClick={() => scrollTo('contact')}
                className="flex-1 py-2.5 rounded-lg bg-violet-600 text-white text-sm font-semibold active:scale-95 transition-all"
              >
                Hire Me
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Aesthetic mobile bottom dock ── */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 safe-bottom" aria-label="Bottom navigation">
        {/* Frosted glass bar */}
        <div className="relative bg-[#0a0a12]/95 backdrop-blur-2xl border-t border-white/[0.07]">

          {/* Top gradient accent line */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

          {/* Nav items */}
          <ul className="flex px-1 pt-2 pb-1" role="list">
            {NAV.map(({ id, label, icon }) => {
              const isActive = active === id;
              return (
                <li key={id} className="flex-1">
                  <button
                    onClick={() => scrollTo(id)}
                    className="relative w-full flex flex-col items-center gap-1 py-1.5 rounded-xl transition-all duration-200 active:scale-95"
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {/* Active bg pill */}
                    {isActive && (
                      <span className="absolute inset-x-2 inset-y-0 rounded-xl bg-violet-600/15" />
                    )}

                    {/* Icon */}
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={isActive ? 2 : 1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`relative w-[18px] h-[18px] transition-all duration-200 ${
                        isActive ? 'text-violet-400 drop-shadow-[0_0_6px_rgba(124,58,237,.8)]' : 'text-white/35'
                      }`}
                    >
                      <path d={icon} />
                    </svg>

                    {/* Label */}
                    <span className={`relative text-[9px] font-semibold tracking-wide transition-colors duration-200 ${
                      isActive ? 'text-violet-400' : 'text-white/30'
                    }`}>
                      {label}
                    </span>

                    {/* Active dot indicator */}
                    {isActive && (
                      <span className="absolute -top-px left-1/2 -translate-x-1/2 w-6 h-[2px] rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Bottom safe area filler */}
          <div className="h-[env(safe-area-inset-bottom,0px)]" />
        </div>
      </nav>
    </>
  );
}
