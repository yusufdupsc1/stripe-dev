import { useInView } from '../hooks/useInView';

export default function About() {
  const { ref, visible } = useInView();
  return (
    <section
      id="about"
      ref={ref}
      className={`py-6 sm:py-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className="max-w-6xl mx-auto px-2 sm:px-6 lg:px-8">
        
        {/* Business Card Style */}
        <div className="max-w-2xl mx-auto">
          <div className="rounded-2xl bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] border border-violet-500/30 p-4 sm:p-8 lg:p-10">
            
            {/* Name & Title */}
            <div className="text-center mb-4 sm:mb-6">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-1 sm:mb-2">
                YUSUF ALI
              </h2>
              <p className="text-violet-400 text-base sm:text-xl font-medium">Payments Engineer</p>
              <p className="text-white/70 text-xs sm:text-sm mt-1">Rajshahi, Bangladesh</p>
            </div>

            {/* Workflow Flow - Compact on mobile */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-3 lg:gap-4 flex-wrap mb-4 sm:mb-6">
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#635bff]/20 border border-[#635bff]/40">
                <span className="text-[#635bff] text-xs sm:text-sm">◯</span>
                <span className="text-[#635bff] text-[10px] sm:text-xs">Stripe</span>
              </div>
              <span className="text-white/30 text-xs">→</span>
              <div className="px-2 py-1 rounded-lg bg-orange-500/20 border border-orange-500/40">
                <span className="text-orange-400 text-[10px] sm:text-xs">3DS</span>
              </div>
              <span className="text-white/30 text-xs">→</span>
              <div className="px-2 py-1 rounded-lg bg-green-500/20 border border-green-500/40">
                <span className="text-green-400 text-[10px] sm:text-xs">Webhook</span>
              </div>
              <span className="text-white/30 text-xs">→</span>
              <div className="px-2 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40">
                <span className="text-emerald-400 text-[10px] sm:text-xs">✓ Paid</span>
              </div>
            </div>

            {/* What I Build - 2x2 grid */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-lg bg-white/[0.04] border border-white/[0.06] min-h-[70px] sm:min-h-[80px]">
                <span className="text-lg sm:text-xl mb-1">💳</span>
                <p className="text-white/80 text-[11px] sm:text-sm text-center leading-tight">Payment Pipelines</p>
              </div>
              <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-lg bg-white/[0.04] border border-white/[0.06] min-h-[70px] sm:min-h-[80px]">
                <span className="text-lg sm:text-xl mb-1">🔒</span>
                <p className="text-white/80 text-[11px] sm:text-sm text-center leading-tight">Idempotency</p>
              </div>
              <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-lg bg-white/[0.04] border border-white/[0.06] min-h-[70px] sm:min-h-[80px]">
                <span className="text-lg sm:text-xl mb-1">⚡</span>
                <p className="text-white/80 text-[11px] sm:text-sm text-center leading-tight">Retry Logic</p>
              </div>
              <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-lg bg-white/[0.04] border border-white/[0.06] min-h-[70px] sm:min-h-[80px]">
                <span className="text-lg sm:text-xl mb-1">🔌</span>
                <p className="text-white/80 text-[11px] sm:text-sm text-center leading-tight">REST APIs</p>
              </div>
            </div>

            {/* Slogan */}
            <div className="text-center p-3 sm:p-4 rounded-lg bg-gradient-to-r from-violet-500/10 to-cyan-500/10 border border-white/10 mb-3 sm:mb-4">
              <p className="text-white/90 text-xs sm:text-sm lg:text-base font-medium">Processing Real Money. Deploying to the Cloud.</p>
            </div>

            {/* GitHub */}
            <a 
              href="https://github.com/yusufdupsc1"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 sm:mt-4 flex items-center justify-center gap-2 p-2.5 sm:p-3 rounded-lg bg-white/[0.05] border border-white/[0.1] hover:bg-white/[0.08] transition-colors"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white/70 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.476.003.952.05 1.412.085 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              <span className="text-white/80 text-xs sm:text-sm">github.com/yusufdupsc1</span>
            </a>

          </div>
        </div>

      </div>
    </section>
  );
}
