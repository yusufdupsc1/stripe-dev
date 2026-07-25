# ADR 0001: Bento grid responsive layout with CSS container queries

## Context

The About and Expertise sections were separate full-width sections. Merging them into a single bento-style grid required a responsive layout that reflows from 4 columns to 1 column at a breakpoint tied to the component’s own width, not the viewport.

## Decision

Use CSS `grid-template-areas` on a `.bento-grid` wrapper, with `container-type: inline-size` on `.bento-wrapper`, and reflow via `@container (max-width: 640px)`.

## Alternatives Considered

- JavaScript media-query listeners (`window.innerWidth`) inside React state.
- CSS `@media (max-width: 640px)` on the grid itself.
- A UI framework grid component.

## Consequences

- Layout logic stays in CSS; no JS breakpoint code in `AboutExpertise.tsx`.
- Reflow is scoped to the bento component’s container, not the global viewport.
- Browser support for container queries is narrower than media queries; Firefox support landed later and Safari support required a newer version.

## Verification

`src/index.css:241` and `src/index.css:262` both contain `grid-template-areas:`.
