import { PROFILE } from '../data/profile';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/[0.06] py-6 sm:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[var(--c-neutral-900)] border border-violet-500/30 flex items-center justify-center">
            <span className="text-base font-bold text-transparent bg-clip-text bg-gradient-to-br from-violet-400 to-cyan-400" style={{ fontFamily: "'Brush Script MT', cursive" }}>Y</span>
          </div>
          <span className="text-white/65 text-sm">{PROFILE.name} · Backend & Payments Engineer</span>
        </div>
        <div className="flex items-center gap-5 text-white/55 text-xs">
          <a href="https://github.com/yusufdupsc1" target="_blank" rel="noopener noreferrer" className="hover:text-white interact-link px-2 py-1 min-h-[44px] inline-flex items-center gap-1.5" aria-label="GitHub">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
            GitHub
          </a>
          <a href="https://linkedin.com/in/yusuf-ali-backend-engineer" target="_blank" rel="noopener noreferrer" className="hover:text-white interact-link px-2 py-1 min-h-[44px] inline-flex items-center gap-1.5" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LinkedIn
          </a>
          <a href="https://dev.to/yusufdupsc1" target="_blank" rel="noopener noreferrer" className="hover:text-white interact-link px-2 py-1 min-h-[44px] inline-flex items-center gap-1.5" aria-label="Dev.to">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor" aria-hidden="true"><path d="M4 3H5.5L5.4 19H4v-5.5l1-1V18h.99v-3.19l1.01-1V10H4V3Zm9.5 0h1.5l.1 16h-1.6V3Zm3 0h1.5v5.25l1 1V19h-1.6l-.1-3.1-.1 3.1H14.5V9.75l-1-1V3h1.6l.1 5.75.1-5.75Z"/></svg>
            Dev.to
          </a>
          <span className="text-white/65">© {year}</span>
        </div>
      </div>
    </footer>
  );
}
