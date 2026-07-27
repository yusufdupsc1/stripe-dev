import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import { loadEnv } from 'vite';

const GITHUB_USERNAME = 'yusufdupsc1';

function getGitHubToken(): string | undefined {
  const env = loadEnv('', process.cwd(), '');
  return env.GITHUB_TOKEN;
}

async function fetchGitHubStats() {
  const token = getGitHubToken();
  const headers: Record<string, string> = { Accept: 'application/vnd.github+json', 'User-Agent': 'stripe-dev-build' };
  if (token) headers.Authorization = `Bearer ${token}`;

  const [userRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers, signal: AbortSignal.timeout(12_000) }),
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed`, { headers, signal: AbortSignal.timeout(12_000) }),
  ]);

  if (!userRes.ok) {
    const body = await userRes.text();
    throw new Error(`GitHub user API error: ${userRes.status} — ${body}`);
  }
  if (!reposRes.ok) {
    const body = await reposRes.text();
    throw new Error(`GitHub repos API error: ${reposRes.status} — ${body}`);
  }

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
        if (!getGitHubToken()) {
          console.warn('[github-stats-plugin] No GITHUB_TOKEN set — requests may be rate-limited.');
        }
      } catch (err) {
        console.warn(`[github-stats-plugin] Could not fetch GitHub stats at build time: ${err}`);
      }
    },

    generateBundle(opt) {
      const outDir = opt.dir || 'dist';
      const outPath = path.join(outDir, 'github-stats.json');
      if (!stats) {
        let lastCachedAt = Date.now();
        try {
          const existing = fs.readFileSync(outPath, 'utf-8');
          const parsed = JSON.parse(existing);
          if (parsed.cachedAt) lastCachedAt = parsed.cachedAt;
        } catch {
          // no previous file available
        }
        fs.writeFileSync(outPath, JSON.stringify({ stale: true, cachedAt: lastCachedAt }, null, 2));
        return;
      }
      fs.writeFileSync(outPath, JSON.stringify(stats, null, 2));
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
