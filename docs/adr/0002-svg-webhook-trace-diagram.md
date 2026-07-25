# ADR 0002: Webhook trace diagram as inline SVG + CSS animation

## Context

The WebhookTrace section needs to show a 7-step webhook flow with an animated path. The original requirement excluded a 3D library for this diagram.

## Decision

Use inline SVG for the path and nodes, with CSS `@keyframes wt-pulse` animating `stroke-dashoffset` on `.wt-pulse-path`.

## Alternatives Considered

- Three.js / React Three Fiber for a 3D scene.
- Canvas 2D drawing.
- A static PNG or GIF.

## Consequences

- No additional 3D runtime in the critical bundle for a 2D flow diagram.
- Nodes are real `<button>` elements with tooltips, keeping the diagram accessible.
- Animation timing is fixed by the keyframe duration; not scroll-driven or interactive beyond hover/focus.

## Verification

`src/components/WebhookTrace.tsx:49` contains `className="wt-pulse-path"`.
