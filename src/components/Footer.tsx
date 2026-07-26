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
          <a href="https://github.com/yusufdupsc1" target="_blank" rel="noopener noreferrer" className="hover:text-white interact-link px-2 py-1 min-h-[44px] inline-flex items-center">GitHub</a>
          <a href="https://linkedin.com/in/yusuf-ali-backend-engineer" target="_blank" rel="noopener noreferrer" className="hover:text-white interact-link px-2 py-1 min-h-[44px] inline-flex items-center">LinkedIn</a>
          <a href="https://dev.to/yusufdupsc1" target="_blank" rel="noopener noreferrer" className="hover:text-white interact-link px-2 py-1 min-h-[44px] inline-flex items-center">Dev.to</a>
          <span className="text-white/65">© {year}</span>
        </div>
      </div>
    </footer>
  );
}
