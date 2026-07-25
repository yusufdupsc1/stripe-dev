import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';

const GITHUB_USERNAME = 'yusufdupsc1';

async function fetchGitHubStats() {
  const token = process.env.GITHUB_TOKEN;
  const headers: Record<string, string> = { Accept: 'application/vnd.github+json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  const [userRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers, signal: AbortSignal.timeout(12_000) }),
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed`, { headers, signal: AbortSignal.timeout(12_000) }),
  ]);

  if (!userRes.ok) throw new Error(`GitHub user API error: ${userRes.status}`);
  if (!reposRes.ok) throw new Error(`GitHub repos API error: ${reposRes.status}`);

  const user = await userRes.json();
  const repos = await reposRes.json();

  const stars = (Array.isArray(repos) ? repos : []).reduce<number>((sum: number, repo: { stargazers_count?: number }) => sum + (repo.stargazers_count || 0), 0);

  return {
    repos: user.public_repos || 0,
    followers: user.followers || 0,
    stars,
    contributions: user.public_repos || 0,
    cachedAt: Date.now(),
  };
}

function githubStatsPlugin(): Plugin {
  let stats: { repos: number; followers: number; stars: number; contributions: number; cachedAt: number } | null = null;

  return {
    name: 'github-stats-plugin',
    apply: 'build',

    async buildStart() {
      try {
        stats = await fetchGitHubStats();
        if (!process.env.GITHUB_TOKEN) {
          console.warn('[github-stats-plugin] No GITHUB_TOKEN set — requests may be rate-limited.');
        }
      } catch (err) {
        console.warn(`[github-stats-plugin] Could not fetch GitHub stats at build time: ${err}`);
      }
    },

    generateBundle(opt) {
      if (!stats) return;
      const outDir = opt.dir || 'dist';
      fs.writeFileSync(path.join(outDir, 'github-stats.json'), JSON.stringify(stats, null, 2));
    },

    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && new URL(req.url, 'http://localhost').pathname === '/github-stats.json') {
          const fallback = {
            repos: 0, followers: 0, stars: 0, contributions: 0, cachedAt: Date.now()
          };
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(stats || fallback));
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), githubStatsPlugin()],
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
  optimizeDeps: {},
  server: {
    port: 5173,
  },
});
