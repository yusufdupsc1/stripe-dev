import React from 'react';

export interface GitHubStats {
  repos: number;
  followers: number;
  stars: number;
  contributions: number;
  cachedAt: number;
}

export function getCachedStats(): GitHubStats | null {
  try {
    const raw = localStorage.getItem('github_stats_v2');
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed.repos !== 'number') return null;
    return parsed;
  } catch {
    return null;
  }
}

export function setCachedStats(stats: GitHubStats) {
  localStorage.setItem('github_stats_v2', JSON.stringify(stats));
}

export function formatCachedAgo(stats: GitHubStats): string {
  const diffMs = Date.now() - stats.cachedAt;
  const hours = Math.floor(diffMs / 3_600_000);
  if (hours < 1) return 'just now';
  if (hours === 1) return '1h ago';
  if (hours < 48) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function useGitHubStats(username = 'yusufdupsc1') {
  const [stats, setStats] = React.useState<GitHubStats | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;

    async function load() {
      const cached = getCachedStats();

      try {
        const fresh = await fetch(`/github-stats.json`, { signal: AbortSignal.timeout(8_000) });
        if (!fresh.ok) throw new Error(`${fresh.status}`);
        const data = (await fresh.json()) as GitHubStats;
        if (!cancelled) {
          setCachedStats(data);
          setStats(data);
          setError(null);
        }
      } catch {
        if (cached) {
          setStats(cached);
        } else {
          setError('GitHub stats unavailable');
        }
      }
    }

    load();

    const interval = setInterval(load, 60_000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [username]);

  return { stats, error };
}
