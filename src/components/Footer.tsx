import { PROFILE } from '../data/profile';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/[0.06] py-6 sm:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#0d0d12] border border-violet-500/30 flex items-center justify-center">
            <span className="text-base font-bold text-transparent bg-clip-text bg-gradient-to-br from-violet-400 to-cyan-400" style="font-family: 'Brush Script MT', cursive;">Y</span>
          </div>
          <span className="text-white/40 text-sm">{PROFILE.name} · Backend & Payments Engineer</span>
        </div>
        <div className="flex items-center gap-5 text-white/30 text-xs">
          <a href="https://github.com/yusufdupsc1" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">GitHub</a>
          <a href="https://linkedin.com/in/yusuf-ali-backend-engineer" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">LinkedIn</a>
          <a href="https://dev.to/yusufdupsc1" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">Dev.to</a>
          <span className="text-white/15">© {year}</span>
        </div>
      </div>
    </footer>
  );
}
