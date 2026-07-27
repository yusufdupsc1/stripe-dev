import { useCallback, useEffect, useRef, useState } from 'react';

interface NavItem {
  id: string;
  label: string;
  icon: string;
}

const NAV: readonly NavItem[] = [
  { id: 'home',      label: 'Home',     icon: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10' },
  { id: 'about',     label: 'About',    icon: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z' },
  { id: 'expertise', label: 'Skills',   icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { id: 'projects',  label: 'Work',     icon: 'M3 7h18M3 12h18M3 17h18' },
  { id: 'contact',   label: 'Hire',     icon: 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z' },
];

interface NavbarProps {
  paletteRef: React.RefObject<{ open: () => void }>;
}

export default function Navbar({ paletteRef }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]     = useState('home');
  const [open, setOpen]         = useState(false);
  const [theme, setTheme]       = useState<string>(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.getAttribute("data-theme") || "dark";
    }
    return "dark";
  });
  const themeRef = useRef(theme);
  themeRef.current = theme;

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
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const toggleTheme = useCallback(() => {
    const current = themeRef.current;
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    setTheme(next);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <>
      {/* ── Desktop / top bar ── */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-slow ease-out safe-top ${scrolled ? 'py-3' : 'py-5'}`}
        aria-label="Main navigation"
      >
        <div className={`absolute inset-0 transition-all duration-slow ease-out ${scrolled ? 'bg-[var(--c-neutral-950)]/92 backdrop-blur-xl border-b border-white/[0.06]' : ''}`} />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo - Terminal Style with Y brand */}
          <button
            onClick={() => scrollTo('home')}
            className="p-2 flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded-lg min-w-[44px] min-h-[44px]"
            aria-label="Go to top"
          >
            <div className="w-9 h-9 rounded-lg bg-[var(--c-neutral-900)] border border-violet-500/40 flex items-center justify-center overflow-hidden shadow-lg shadow-violet-500/20">
              <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-br from-violet-400 to-cyan-400" style={{ fontFamily: "'Brush Script MT', cursive" }}>Y</span>
            </div>
          </button>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {NAV.map(({ id, label }) => (
              <li key={id}>
                <button
                  onClick={() => scrollTo(id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-base ease-out ${
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
            <button
              onClick={() => paletteRef?.current?.open()}
              className="glass px-3 py-2 rounded-md text-xs font-mono text-white/50 hover:text-white transition-colors duration-fast ease-out min-h-[44px] flex items-center gap-1.5"
              aria-label="Open command palette"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
              <span className="hidden sm:inline">⌘K</span>
            </button>
            <button
              onClick={toggleTheme}
              className="glass px-3 py-2 rounded-md text-xs font-mono text-white/50 hover:text-white transition-colors duration-fast ease-out min-h-[44px]"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark'
                ? <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41-1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                : <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
              }
            </button>
            <a
              href="https://github.com/yusufdupsc1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white/80 transition-colors duration-fast ease-out p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="GitHub"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
            </a>
            <button
              onClick={() => scrollTo('contact')}
              className="px-4 py-3 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-all duration-base ease-out hover:shadow-lg hover:shadow-violet-500/30 active:scale-95 min-h-[44px]"
            >
              Hire Me
            </button>
          </div>

          {/* Burger */}
          <button
            className="md:hidden p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/[0.06] transition-all duration-base ease-out min-w-[44px] min-h-[44px]"
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
        <div className={`mobile-menu md:hidden absolute top-full inset-x-0 interact-card origin-top ${open ? 'scale-y-100 opacity-100 pointer-events-auto' : 'scale-y-95 opacity-0 pointer-events-none'}`}>
          <div className="mx-4 my-2 rounded-xl bg-[var(--c-neutral-900)]/95 backdrop-blur-xl border border-white/[0.08] overflow-hidden">
            {NAV.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`w-full text-left px-5 py-3.5 text-sm font-medium interact-link border-b border-white/[0.05] last:border-0 ${
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
                className="flex-1 py-3 rounded-lg border border-white/10 text-white/60 hover:text-white text-center text-sm font-medium transition-colors duration-fast ease-out min-h-[44px] flex items-center justify-center gap-2"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
                GitHub
              </a>
              <button
                onClick={() => scrollTo('contact')}
                className="flex-1 py-3 rounded-lg bg-violet-600 text-white text-sm font-semibold active:scale-95 transition-all duration-base ease-out min-h-[44px]"
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
        <div className="relative bg-[var(--c-neutral-950)]/95 backdrop-blur-2xl border-t border-white/[0.07]">

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
                    className="relative w-full flex flex-col items-center gap-1 py-2 rounded-xl transition-all duration-base ease-out active:scale-95 min-h-[44px]"
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
                       className={`relative w-[var(--size-18px)] h-[var(--size-18px)] transition-all duration-base ease-out ${
                         isActive ? 'text-violet-400 drop-shadow-[0_0_6px_rgba(124,58,237,.8)]' : 'text-white/60'
                       }`}
                    >
                      <path d={icon} />
                    </svg>

                    {/* Label */}
                    <span className={`relative text-2xs font-semibold tracking-wide transition-colors duration-base ease-out ${
                      isActive ? 'text-violet-400' : 'text-white/60'
                    }`}>
                      {label}
                    </span>

                    {/* Active dot indicator */}
                    {isActive && (
                      <span className="absolute -top-px left-1/2 -translate-x-1/2 w-6 h-[var(--size-2px)] rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
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
