import { useParams, Link, useNavigate } from "react-router-dom";
import { projects } from "../data/projects";

export default function ProjectCaseStudy() {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">404</h1>
          <p className="text-white/50 mb-6">Project not found</p>
          <Link to="/#projects" className="text-violet-400 hover:text-violet-300">
            ← Back to projects
          </Link>
        </div>
      </div>
    );
  }

  if (typeof document !== "undefined") {
    document.title = `${project.title} | Project Case Study`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", project.problem);
    }
  }

  const handleBackClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const to = "/#projects";
    if (typeof document !== "undefined" && typeof document.startViewTransition === "function") {
      e.preventDefault();
      document.startViewTransition(() => {
        navigate(to);
      });
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <Link to="/#projects" onClick={handleBackClick} className="text-white/40 hover:text-white text-sm mb-8 inline-block">
          ← Back to projects
        </Link>

        <div className="mb-12">
          <span className="text-violet-400 font-mono text-sm uppercase tracking-widest">Case Study</span>
           <h1 className="text-4xl font-bold text-white mt-2 mb-4">{project.title}</h1>
            <p className="text-white/50 text-lg max-w-measure">{project.tagline}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {project.tags.map((t) => (
              <span key={t} className="px-2.5 py-1 rounded-md text-xs font-mono border border-white/10 text-white/60">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-16">
          <section className="border-l-2 border-violet-500/30 pl-6">
            <h2 className="text-3xl font-bold text-white mb-4">Problem</h2>
            <p className="text-white/60 text-lg leading-relaxed max-w-measure">{project.problem}</p>
          </section>

          <section className="border-l-2 border-cyan-500/30 pl-6">
            <h2 className="text-3xl font-bold text-white mb-4">Architecture</h2>
            <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-measure">{project.architecture}</p>
            <div className="bg-[var(--c-neutral-900)] rounded-xl p-6 border border-white/5">
              <svg viewBox="0 0 600 300" className="w-full h-auto">
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="var(--c-violet-400)" />
                  </marker>
                </defs>

                <rect x="200" y="20" width="200" height="50" rx="8" fill="#1e1e2e" stroke="var(--c-violet-400)" strokeWidth="2" />
                <text x="300" y="50" textAnchor="middle" fill="var(--c-text)" style={{ fontSize: 'var(--text-sm)' }} fontWeight="600">Client</text>

                <rect x="200" y="120" width="200" height="50" rx="8" fill="#1e1e2e" stroke="var(--c-cyan-400)" strokeWidth="2" />
                <text x="300" y="150" textAnchor="middle" fill="var(--c-text)" style={{ fontSize: 'var(--text-sm)' }} fontWeight="600">API Layer</text>

                <rect x="200" y="220" width="200" height="50" rx="8" fill="#1e1e2e" stroke="#34d399" strokeWidth="2" />
                <text x="300" y="250" textAnchor="middle" fill="var(--c-text)" style={{ fontSize: 'var(--text-sm)' }} fontWeight="600">Database</text>

                <line x1="250" y1="70" x2="250" y2="120" stroke="var(--c-violet-400)" strokeWidth="2" markerEnd="url(#arrowhead)" />
                <line x1="350" y1="70" x2="350" y2="120" stroke="var(--c-violet-400)" strokeWidth="2" markerEnd="url(#arrowhead)" />
                <line x1="250" y1="170" x2="250" y2="220" stroke="var(--c-cyan-400)" strokeWidth="2" markerEnd="url(#arrowhead)" />
                <line x1="350" y1="170" x2="350" y2="220" stroke="var(--c-cyan-400)" strokeWidth="2" markerEnd="url(#arrowhead)" />

                <rect x="20" y="135" width="100" height="34" rx="6" fill="#1e1e2e" stroke="#fbbf24" strokeWidth="1.5" />
                <text x="70" y="157" textAnchor="middle" fill="var(--c-text)" style={{ fontSize: 'var(--text-2xs)' }}>Auth</text>
                <line x1="120" y1="152" x2="200" y2="152" stroke="#fbbf24" strokeWidth="1.5" markerEnd="url(#arrowhead)" />

                <rect x="480" y="135" width="100" height="34" rx="6" fill="#1e1e2e" stroke="#f472b6" strokeWidth="1.5" />
                <text x="530" y="157" textAnchor="middle" fill="var(--c-text)" style={{ fontSize: 'var(--text-2xs)' }}>Cache</text>
                <line x1="400" y1="152" x2="480" y2="152" stroke="#f472b6" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
              </svg>
            </div>
          </section>

          <section className="border-l-2 border-emerald-500/30 pl-6">
            <h2 className="text-3xl font-bold text-white mb-4">Decisions</h2>
            <ul className="space-y-3 max-w-measure">
              {project.decisions.map((d, i) => (
                <li key={i} className="flex gap-3 text-white/60">
                  <span className="text-emerald-400 mt-1.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span className="text-base leading-relaxed">{d}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="border-l-2 border-amber-500/30 pl-6">
            <h2 className="text-3xl font-bold text-white mb-4">Result</h2>
            <p className="text-white/60 text-lg leading-relaxed max-w-measure">{project.result}</p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex gap-4">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 rounded-lg bg-violet-600/20 border border-violet-500/30 hover:bg-violet-600/30 text-violet-400 text-sm font-medium text-center interact-card"
            >
              Live ↗
            </a>
          )}
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 rounded-lg border border-white/[0.08] hover:border-white/20 text-white/50 hover:text-white text-sm font-medium text-center interact-card"
          >
            View Code →
          </a>
        </div>
      </div>
    </div>
  );
}
