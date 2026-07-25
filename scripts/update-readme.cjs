#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const USER = 'yusufdupsc1';
const MARKER_START = '<!-- SHIPPING:START -->';
const MARKER_END = '<!-- SHIPPING:END -->';
const README_PATH = path.join(__dirname, '..', 'README.md');

async function authHeaders() {
  const token = process.env.GITHUB_TOKEN || '';
  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'stripe-dev-readme-bot',
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

async function fetchRecentActivity() {
  const headers = await authHeaders();
  const url = `https://api.github.com/users/${USER}/events/public?per_page=100`;
  const res = await fetch(url, { headers });

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
  }

  const events = await res.json();
  const items = [];

  for (const event of events) {
    if (event.type === 'PushEvent' && event.payload?.ref?.startsWith('refs/heads/')) {
      const repo = event.repo?.name || USER;
      const branch = event.payload.ref.replace('refs/heads/', '');
      const head = event.payload.head;

      let message = `push to ${branch}`;
      if (head) {
        try {
          const commitUrl = `https://api.github.com/repos/${repo}/commits/${head}`;
          const commitRes = await fetch(commitUrl, { headers });
          if (commitRes.ok) {
            const commit = await commitRes.json();
            message = (commit.commit?.message || message).split('\n')[0].trim();
          }
        } catch {
          // keep branch name if commit fetch fails
        }
      }

      items.push({
        repo,
        message,
        time: event.created_at,
      });

      if (items.length >= 5) break;
    } else if (event.type === 'PullRequestEvent' && event.payload?.pull_request) {
      const repo = event.repo?.name || USER;
      const pr = event.payload.pull_request;
      const action = event.payload.action || '';
      const title = pr.title || 'PR';
      items.push({
        repo,
        message: `PR #${pr.number}: ${title} [${action}]`,
        time: event.created_at,
      });

      if (items.length >= 5) break;
    }
  }

  return items;
}

function formatMarkdown(items) {
  if (items.length === 0) {
    return '_No recent public activity found._';
  }

  return items
    .map((item) => {
      const date = new Date(item.time);
      const ts = date.toISOString().replace('T', ' ').slice(0, 19);
      return `- **${item.repo}** — ${item.message} \`${ts} UTC\``;
    })
    .join('\n');
}

function updateReadme(content) {
  let readme = fs.readFileSync(README_PATH, 'utf8');

  const start = readme.indexOf(MARKER_START);
  const end = readme.indexOf(MARKER_END);

  if (start === -1 || end === -1 || start >= end) {
    throw new Error('Markers <!-- SHIPPING:START --> / <!-- SHIPPING:END --> not found in README.md');
  }

  const before = readme.slice(0, start + MARKER_START.length);
  const after = readme.slice(end);

  const newReadme = `${before}\n${content}\n${after}`;

  if (newReadme === readme) {
    console.log('README.md unchanged — no commit needed.');
    process.exit(0);
  }

  fs.writeFileSync(README_PATH, newReadme);
  console.log('README.md updated with recent activity.');
}

async function main() {
  try {
    const items = await fetchRecentActivity();
    const markdown = formatMarkdown(items);
    updateReadme(markdown);
  } catch (err) {
    console.error('Failed to update README activity section:', err.message);
    process.exit(1);
  }
}

main();
