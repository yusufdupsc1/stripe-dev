# ADR 0006: View Transitions API for project navigation

## Context

Navigation from the project list to a case study page should feel immediate. A crossfade transition was desired without adding a routing-specific animation library.

## Decision

Use the browser-native `document.startViewTransition` API when available, feature-detected with `typeof document.startViewTransition === "function"`. If unavailable, navigation proceeds normally.

## Alternatives Considered

- Framer Motion `AnimatePresence` on route changes.
- CSS view-transition-name polyfill.
- No transition; instant route swap.

## Consequences

- Zero extra JS for Chromium browsers; transition is handled by the browser compositor.
- Safari and Firefox fall back to instant navigation with no visual regression.
- `startViewTransition` is still experimental; future browser changes could alter behavior.

## Verification

`src/components/Projects.tsx:4` contains `typeof document.startViewTransition === "function"` and `src/pages/ProjectCaseStudy.tsx:33` contains `document.startViewTransition(() => {`.
