# ADR 0005: Light/dark theme via CSS custom properties and `data-theme`

## Context

The site needed a light/dark toggle that does not flash the wrong theme on load, persists across sessions, and keeps all colors in one place.

## Decision

Define all design tokens as CSS custom properties on `:root` (dark) and `[data-theme="light"]` (light). Set the attribute before first paint with an inline `<script>` in `index.html` reading `localStorage`.

## Alternatives Considered

- CSS `@media (prefers-color-scheme)` only.
- Class-based toggling (`.dark` / `.light`) on `<html>`.
- CSS-in-JS theming (e.g., styled-components ThemeProvider).

## Consequences

- Tokens are centralized in `src/index.css` and easy to audit.
- The inline pre-paint script removes the flash-of-wrong-theme without waiting for React hydration.
- Every new token must be added in two places (`:root` and `[data-theme="light"]`).

## Verification

`src/index.css:19` contains `[data-theme="light"] {` and `index.html:15` contains `document.documentElement.setAttribute('data-theme', t);`.
