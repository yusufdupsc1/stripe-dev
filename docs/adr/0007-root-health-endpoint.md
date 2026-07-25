# ADR 0007: Health widget polls `/` instead of `/api/health`

## Context

The StatusWidget needed a live latency check against the site’s own API. A dedicated `/api/health` endpoint was considered.

## Decision

Poll `/` (the homepage) as the health endpoint instead of creating a dedicated `/api/health` route.

## Alternatives Considered

- Add `api/health.ts` as a Vercel serverless function returning `{ status: "ok" }`.
- Use an external ping service.
- Poll an existing static asset like `/robots.txt`.

## Consequences

- No additional serverless function to deploy or maintain.
- Health check is coupled to homepage availability; a future homepage rewrite could change the response path.
- `StatusWidget.tsx` had to be updated from `/api/health` to `/` after the endpoint was removed.

## Verification

`src/components/StatusWidget.tsx:3` contains `const HEALTH_ENDPOINT = "/";`.
