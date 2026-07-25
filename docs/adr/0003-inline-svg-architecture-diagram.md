# ADR 0003: Project case study architecture diagram as inline SVG

## Context

Each project case study needs an architecture section. The requirement explicitly forbids an `<img>` placeholder and asks for a real diagram.

## Decision

Render an inline `<svg viewBox="0 0 600 300">` with `<rect>`, `<text>`, `<line>`, and `<marker>` elements for the box diagram.

## Alternatives Considered

- An `<img src="...">` placeholder.
- Mermaid.js or another diagram-as-code library.
- CSS-only boxes with pseudo-elements.

## Consequences

- Diagram is resolution-independent and themeable via CSS variables.
- Coordinates are hard-coded; adding new box types requires updating path data manually.
- No external diagram dependency is introduced.

## Verification

`src/pages/ProjectCaseStudy.tsx:71` contains `<svg viewBox="0 0 600 300" className="w-full h-auto">`.
