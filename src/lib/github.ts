import React from 'react';

export interface GitHubStats {
  repos: number;
  followers: number;
  stars: number;
  contributions: number;
  cachedAt: number;
}

function getHeaders(token?: string): Record<string, string> {
  const headers: Record<string, string> = { Accept: 'application/vnd.github+json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

async function fetchUser(username: string, headers: Record<string, string>) {
  const res = await fetch(`https://api.github.com/users/${username}`, { headers, signal: AbortSignal.timeout(12_000) });
  if (!res.ok) throw new Error(`GitHub user API error: ${res.status}`);
  return res.json();
}

async function fetchRepos(username: string, headers: Record<string, string>) {
  const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`, { headers, signal: AbortSignal.timeout(12_000) });
  if (!res.ok) throw new Error(`GitHub repos API error: ${res.status}`);
  return res.json();
}

export async function fetchGitHubStats(username: string): Promise<GitHubStats> {
  const token = typeof process !== 'undefined'
    ? process.env.GITHUB_TOKEN
    : undefined;
  const headers = getHeaders(token);

  try {
    const [user, repos] = await Promise.all([
      fetchUser(username, headers),
      fetchRepos(username, headers),
    ]);

    const stars = (Array.isArray(repos) ? repos : []).reduce<number>(
      (sum, repo: { stargazers_count?: number }) => sum + (repo.stargazers_count || 0),
      0
    );

    const result: GitHubStats = {
      repos: user.public_repos || 0,
      followers: user.followers || 0,
      stars,
      contributions: user.public_repos || 0,
      cachedAt: Date.now(),
    };

    setCachedStats(result);
    return result;
  } catch {
    const cached = getCachedStats();
    if (cached) return cached;
    return {
      repos: 0,
      followers: 0,
      stars: 0,
      contributions: 0,
      cachedAt: Date.now(),
    };
  }
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

    const interval = setInterval(load, 1_000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [username]);

  return { stats, error };
}

export default fetchGitHubStats;
